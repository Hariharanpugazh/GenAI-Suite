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

# Generate JWT Token
def generate_tokens(user_id, name, role):
    access_payload = {
        "id": str(user_id),
        "name": name,
        "role": role,  # Store role in JWT
        "exp": (datetime.now() + timedelta(hours=10)).timestamp(),
        "iat": datetime.now().timestamp(),
    }
    token = jwt.encode(access_payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return {"jwt": token}


@csrf_exempt
def user_signup(request):
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

            if user_collection.find_one({"email": email}):
                return JsonResponse({"error": "User with this email already exists"}, status=400)

            hashed_password = make_password(password)

            user_data = {
                "first_name": first_name,
                "last_name": last_name,
                "email": email,
                "phone_number": phone,
                "password": hashed_password,
                "created_at": datetime.now(),
                "last_login": None,
            }

            user_collection.insert_one(user_data)
            return JsonResponse({"message": "User registered successfully"}, status=201)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

@csrf_exempt
def user_login(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")

            user = user_collection.find_one({"email": email})
            if not user:
                return JsonResponse({"error": "Email not found"}, status=404)

            if check_password(password, user["password"]):
                user_collection.update_one({"email": email}, {"$set": {"last_login": datetime.now()}})
                tokens = generate_tokens(user["_id"], user["first_name"], "user")
                return JsonResponse({"message": "Login successful", "token": tokens}, status=200)
            else:
                return JsonResponse({"error": "Invalid password"}, status=401)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
        
@api_view(["POST"])
@permission_classes([AllowAny])
def forgot_password(request):
    try:
        email = request.data.get('email')
        user = user_collection.find_one({"email": email})

        if not user:
            return Response({"error": "Email not found"}, status=400)

        reset_token = str(ObjectId())[:6]  # Generate a random reset token
        expiration_time = datetime.now() + timedelta(hours=1)

        user_collection.update_one(
            {"email": email},
            {"$set": {"password_reset_token": reset_token, "password_reset_expires": expiration_time}}
        )

        return Response({"message": f"Use this token to reset your password: {reset_token}"}, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@csrf_exempt
@api_view(["POST"])
def verify_reset_token(request):
    try:
        data = json.loads(request.body)
        email = data.get("email")
        token = data.get("token")

        user = user_collection.find_one({"email": email})
        if not user:
            return JsonResponse({"error": "User not found"}, status=404)

        stored_token = user.get("password_reset_token")
        expiration_time = user.get("password_reset_expires")

        if not stored_token or stored_token != token:
            return JsonResponse({"error": "Invalid verification code"}, status=403)

        if expiration_time and datetime.now() > expiration_time:
            return JsonResponse({"error": "Verification code expired"}, status=403)

        return JsonResponse({"message": "Verification successful"}, status=200)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)
    
@csrf_exempt
def reset_password(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            token = data.get("token")
            new_password = data.get("new_password")

            user = user_collection.find_one({"email": email})

            if not user:
                return JsonResponse({"error": "User not found"}, status=404)

            if user.get("password_reset_token") != token:
                return JsonResponse({"error": "Invalid reset token"}, status=403)

            hashed_password = make_password(new_password)

            user_collection.update_one(
                {"email": email},
                {"$set": {
                    "password": hashed_password,
                    "password_reset_token": None,
                    "password_reset_expires": None
                }}
            )

            return JsonResponse({"message": "Password reset successfully"}, status=200)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=400)

#==================================================================PRODUCTS===================================================================

@api_view(["GET"])
@permission_classes([AllowAny])
def get_all_products(request):
    try:
        # Connect to the "products" collection
        products_collection = db["products"]
        
        # Fetch only published products (is_publish=True)
        products = list(products_collection.find({"is_publish": True}, {"_id": 0}))  # Exclude MongoDB ObjectId
        
        if not products:
            return Response({"message": "No published products found"}, status=200)
        
        return Response({"products": products}, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

