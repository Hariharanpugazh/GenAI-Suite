import jwt
import json
from datetime import datetime, timedelta
from django.http import JsonResponse
from pymongo import MongoClient
from django.contrib.auth.hashers import make_password, check_password
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from bson import ObjectId

# JWT Configuration
JWT_SECRET = "secret"
JWT_ALGORITHM = "HS256"

# MongoDB connection
client = MongoClient("mongodb+srv://ihub:ihub@cce.ksniz.mongodb.net/")
db = client["GENAI"]
user_collection = db["users"]
admin_collection = db["admin"]
superadmin_collection = db["superadmin"]

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