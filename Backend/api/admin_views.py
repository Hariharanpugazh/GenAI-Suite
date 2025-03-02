import jwt
import json
from datetime import datetime, timedelta, timezone
from django.http import JsonResponse
from pymongo import MongoClient
from django.contrib.auth.hashers import make_password, check_password
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from bson import ObjectId
import base64

# JWT Configuration
JWT_SECRET = "secret"
JWT_ALGORITHM = "HS256"

# MongoDB connection
client = MongoClient("mongodb+srv://ihub:ihub@cce.ksniz.mongodb.net/")
db = client["GENAI"]
user_collection = db["users"]
admin_collection = db["admin"]
superadmin_collection = db["superadmin"]
products_collection = db["products"]

# Generate JWT Token
def generate_tokens(user_id, name, role):
    access_payload = {
        "id": str(user_id),
        "name": name,
        "role": role,  # Store role in JWT
        "exp": (datetime.utcnow() + timedelta(hours=10)).timestamp(),
        "iat": datetime.utcnow().timestamp(),
    }
    token = jwt.encode(access_payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return {"jwt": token}

#================================================================ADMIN=====================================================================

@csrf_exempt
def admin_signup(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            first_name = data.get("first_name")
            last_name = data.get("last_name")
            email = data.get("email")
            phone = data.get("phone_number")
            password = data.get("password")
            confirm_password = data.get("confirm_password")

            if password != confirm_password:
                return JsonResponse({"error": "Passwords do not match"}, status=400)

            if admin_collection.find_one({"email": email}):
                return JsonResponse({"error": "Admin with this email already exists"}, status=400)

            hashed_password = make_password(password)

            admin_data = {
                "first_name": first_name,
                "last_name": last_name,
                "email": email,
                "phone_number": phone,
                "password": hashed_password,
                "role": "admin",
                "created_at": datetime.utcnow(),
                "last_login": None,
            }

            admin_collection.insert_one(admin_data)
            return JsonResponse({"message": "Admin registered successfully"}, status=201)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

@csrf_exempt
def admin_login(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")

            admin = admin_collection.find_one({"email": email})
            if not admin:
                return JsonResponse({"error": "Email not found"}, status=404)

            if check_password(password, admin["password"]):
                admin_collection.update_one({"email": email}, {"$set": {"last_login": datetime.utcnow()}})
                tokens = generate_tokens(admin["_id"], admin["first_name"], "admin")
                return JsonResponse({"message": "Login successful", "token": tokens}, status=200)
            else:
                return JsonResponse({"error": "Invalid password"}, status=401)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

#================================================================ADMIN=====================================================================

@csrf_exempt
def superadmin_signup(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            first_name = data.get("first_name")
            last_name = data.get("last_name")
            email = data.get("email")
            phone = data.get("phone_number")
            password = data.get("password")
            confirm_password = data.get("confirm_password")

            if password != confirm_password:
                return JsonResponse({"error": "Passwords do not match"}, status=400)

            if superadmin_collection.find_one({"email": email}):
                return JsonResponse({"error": "Superadmin with this email already exists"}, status=400)

            hashed_password = make_password(password)

            superadmin_data = {
                "first_name": first_name,
                "last_name": last_name,
                "email": email,
                "phone_number": phone,
                "password": hashed_password,
                "role": "superadmin",
                "created_at": datetime.utcnow(),
                "last_login": None,
            }

            superadmin_collection.insert_one(superadmin_data)
            return JsonResponse({"message": "Superadmin registered successfully"}, status=201)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

@csrf_exempt
def superadmin_login(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")

            superadmin = superadmin_collection.find_one({"email": email})
            if not superadmin:
                return JsonResponse({"error": "Email not found"}, status=404)

            if check_password(password, superadmin["password"]):
                superadmin_collection.update_one({"email": email}, {"$set": {"last_login": datetime.utcnow()}})
                tokens = generate_tokens(superadmin["_id"], superadmin["first_name"], "superadmin")
                return JsonResponse({"message": "Login successful", "token": tokens}, status=200)
            else:
                return JsonResponse({"error": "Invalid password"}, status=401)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
        
#===================================================P  R   O   D   U   C   T   S=====================================================================@csrf_exempt
@csrf_exempt
def post_product(request):
    if request.method == "POST":
        try:
            data = json.loads(request.POST.get("data", "{}"))  # Extract JSON data
            demo_video = request.FILES.get("demo_video")
            screenshot = request.FILES.get("screenshot")
            thumbnail = request.FILES.get("thumbnail")

            role = data.get("role")
            userid = data.get("userId")

            # Auto-approval logic for admin
            auto_approval_setting = superadmin_collection.find_one({"key": "auto_approval"})
            is_auto_approval = auto_approval_setting.get("value", False) if auto_approval_setting else False

            # Determine if product is published
            is_publish = True if role == "superadmin" or (role == "admin" and is_auto_approval) else None

            # Validate required fields
            required_fields = ["product_name", "product_description", "category"]
            for field in required_fields:
                if field not in data or not data[field].strip():
                    return JsonResponse({"error": f"Missing required field: {field}"}, status=400)

            # Convert uploaded files to Base64
            def encode_file(file):
                return base64.b64encode(file.read()).decode("utf-8") if file else None

            # Extract user journey (up to 6) and product features (up to 8)
            user_journey = []
            for i in range(1, 7):  # Supports up to 6 journeys
                journey_name = data.get(f"user_journey_{i}", "").strip()
                journey_desc = data.get(f"user_journey_description_{i}", "").strip()
                if journey_name and journey_desc:
                    user_journey.append({"journey_name": journey_name, "journey_description": journey_desc})

            product_features = []
            for i in range(1, 9):  # Supports up to 8 product features
                feature_name = data.get(f"product_feature_{i}", "").strip()
                feature_desc = data.get(f"product_feature_description_{i}", "").strip()
                if feature_name and feature_desc:
                    product_features.append({"feature_name": feature_name, "feature_description": feature_desc})

            product_data = {
                "product_name": data["product_name"],
                "product_description": data["product_description"],
                "category": data["category"],
                "demo_video": encode_file(demo_video),
                "screenshot": encode_file(screenshot),
                "thumbnail": encode_file(thumbnail),
            }

            product_entry = {
                "user_id": userid,
                "product_data": product_data,
                "user_journey": user_journey,
                "product_features": product_features,
                "created_by": "admin_id" if role == "admin" else "superadmin_id",
                "is_publish": is_publish,
                "created_at": datetime.now(timezone.utc),
                "updated_at": datetime.now(timezone.utc),
            }

            # Insert into MongoDB
            products_collection.insert_one(product_entry)

            return JsonResponse({"message": "Product created successfully, awaiting approval."}, status=200)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method. Only POST is allowed."}, status=405)