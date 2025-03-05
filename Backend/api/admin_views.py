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
import requests
import base64
from moviepy import VideoFileClip
import tempfile
import os , subprocess
import traceback , gridfs
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
products_collection1 = db["products1"]

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

#===================================================P  R   O   D   U   C   T   S=====================================================================

fs = gridfs.GridFS(db)

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

            # Compress video if provided
            def compress_video(file):
                with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as temp_input, \
                     tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as temp_output:
                    input_path = temp_input.name
                    output_path = temp_output.name

                    # Save the uploaded file to a temporary location
                    with open(input_path, 'wb') as f:
                        f.write(file.read())

                    # Run the ffmpeg command to compress the video
                    subprocess.run([
                        'ffmpeg', '-i', input_path, '-vf', 'scale=360:144', output_path
                    ], check=True)

                    return output_path

            compressed_video_path = compress_video(demo_video) if demo_video else None

            # Store files using GridFS
            def store_file_in_gridfs(file_path):
                with open(file_path, "rb") as f:
                    file_id = fs.put(f)
                return file_id

            video_file_id = store_file_in_gridfs(compressed_video_path) if compressed_video_path else None
            screenshot_file_id = store_file_in_gridfs(screenshot.temporary_file_path()) if screenshot else None
            thumbnail_file_id = store_file_in_gridfs(thumbnail.temporary_file_path()) if thumbnail else None

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
                "demo_video": video_file_id,
                "screenshot": screenshot_file_id,
                "thumbnail": thumbnail_file_id,
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

            # Clean up temporary files
            if compressed_video_path and os.path.exists(compressed_video_path):
                os.remove(compressed_video_path)

            return JsonResponse({"message": "Product created successfully, awaiting approval."}, status=200)

        except Exception as e:
            # Log the full traceback for better debugging
            traceback.print_exc()
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method. Only POST is allowed."}, status=405)



API_TOKEN = "I9bJJd3bM0RKonahK6wSM7IHhQjSMgo7" #sns innovation hub id acc
HEADERS = {"Authorization": f"Bearer {API_TOKEN}"}
ROOT_FOLDER_ID = "e07b72ba-8b87-4788-968c-0635188eb472"  # Correct root folder ID / sns ihub link / need to change dynamically in deployment

def get_upload_server():
    """Fetch the best GoFile server for uploading."""
    url = "https://api.gofile.io/servers"
    response = requests.get(url, headers=HEADERS)
    data = response.json()

    if data.get("status") == "ok" and "servers" in data["data"]:
        return data["data"]["servers"][0]["name"]  # Get the first available server
    else:
        raise Exception("Failed to get an upload server:", data)

def create_folder(folder_name):
    """Create a folder on GoFile."""
    url = "https://api.gofile.io/contents/createFolder"
    data = {"folderName": folder_name, "parentFolderId": ROOT_FOLDER_ID}
    response = requests.post(url, headers=HEADERS, json=data)
    data = response.json()

    # Debugging: Print the entire response to understand its structure
    print("API Response:", data)

    if data.get("status") == "ok":
        folder_id = data["data"].get("id")
        if folder_id:
            print(f"Folder created successfully: {folder_id}")
            return folder_id
        else:
            print("Folder creation response does not contain 'folderId'.")
            return None
    else:
        print("Failed to create folder:", data)
        return None

def upload_file(file_path, folder_id):
    """Upload a file to GoFile in a specific folder."""
    try:
        # Get upload server
        server_name = get_upload_server()
        upload_url = f"https://{server_name}.gofile.io/contents/uploadfile"

        # File data
        files = {"file": open(file_path, "rb")}
        data = {"folderId": folder_id}

        # Upload request
        response = requests.post(upload_url, headers=HEADERS, files=files, data=data)
        data = response.json()

        if data.get("status") == "ok":
            file_info = data["data"]

            # Try getting the correct file link
            file_link = file_info.get("directLink") or file_info.get("downloadPage")

            if file_link:
                print(f"File uploaded successfully: {file_link}")
                return file_link
            else:
                print("Upload succeeded, but no direct link found.")
                return None
        else:
            print("Upload failed:", data)
            return None

    except Exception as e:
        print("Error:", str(e))
        return None

@csrf_exempt
def post_products(request):
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

            # Create a folder for the upload
            folder_name = f"Product_{data['product_name']}_{datetime.now().strftime('%Y%m%d%H%M%S')}"
            folder_id = create_folder(folder_name)

            # Upload files to GoFile in the created folder and get URLs
            video_url = upload_file(demo_video.temporary_file_path(), folder_id) if demo_video else None
            screenshot_url = upload_file(screenshot.temporary_file_path(), folder_id) if screenshot else None
            thumbnail_url = upload_file(thumbnail.temporary_file_path(), folder_id) if thumbnail else None

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
                "demo_video": video_url,
                "screenshot": screenshot_url,
                "thumbnail": thumbnail_url,
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
            products_collection1.insert_one(product_entry)

            return JsonResponse({"message": "Product created successfully, awaiting approval."}, status=200)

        except Exception as e:
            # Log the full traceback for better debugging
            traceback.print_exc()
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method. Only POST is allowed."}, status=405)

@api_view(["GET"])
@permission_classes([AllowAny])
def get_all_products(request):
    try:
        # Fetch only products that are published (is_publish=True)
        products_collection = db["products"]
        products = list(products_collection.find({}, {"_id": 1, "user_id": 1, "product_data": 1, "is_publish": 1, "created_at": 1}))

        # Convert `_id` to string
        for product in products:
            product["_id"] = str(product["_id"])

        return Response({"products": products}, status=200)

    except Exception as e:
        return Response({"error": str(e)}, status=500)
    
@csrf_exempt
@api_view(["POST"])
def review_product(request, product_id):
    try:
        # Extract JWT token from request headers
        token = request.headers.get("Authorization", "").split("Bearer ")[-1]
        if not token:
            return Response({"error": "Authorization token required"}, status=401)

        # Decode JWT token
        try:
            decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
            user_role = decoded_token.get("role")
        except jwt.ExpiredSignatureError:
            return Response({"error": "Token has expired"}, status=401)
        except jwt.InvalidTokenError:
            return Response({"error": "Invalid token"}, status=401)

        # Ensure the user is a Superadmin
        if user_role != "superadmin":
            return Response({"error": "Unauthorized"}, status=403)

        # Get the action (approve/reject) from request body
        data = json.loads(request.body)
        action = data.get("action")
        if action not in ["approve", "reject"]:
            return Response({"error": "Invalid action"}, status=400)

        # Check if the product exists
        product = products_collection.find_one({"_id": ObjectId(product_id)})
        if not product:
            return Response({"error": "Product not found"}, status=404)

        # Approve or Reject Product
        if action == "approve":
            products_collection.update_one(
                {"_id": ObjectId(product_id)},
                {"$set": {"is_publish": True, "updated_at": datetime.utcnow()}}
            )
            return Response({"message": "Product approved and published successfully"}, status=200)

        elif action == "reject":
            products_collection.update_one(
                {"_id": ObjectId(product_id)},
                {"$set": {"is_publish": False, "updated_at": datetime.utcnow()}}
            )
            return Response({"message": "Product rejected successfully"}, status=200)

    except Exception as e:
        return Response({"error": str(e)}, status=500)

@csrf_exempt
@api_view(["GET"])
def get_admin_products(request):
    try:
        # Extract JWT token from request headers
        token = request.headers.get("Authorization", "").split("Bearer ")[-1]
        if not token:
            return Response({"error": "Authorization token required"}, status=401)

        # Decode JWT token
        try:
            decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
            admin_id = decoded_token.get("id")
            role = decoded_token.get("role")
        except jwt.ExpiredSignatureError:
            return Response({"error": "Token has expired"}, status=401)
        except jwt.InvalidTokenError:
            return Response({"error": "Invalid token"}, status=401)

        # Ensure the user is an admin
        if role != "admin":
            return Response({"error": "Unauthorized"}, status=403)

        # Fetch products created by this admin
        products = list(products_collection.find({"user_id": admin_id}, {"_id": 0}))

        if not products:
            return Response({"message": "No products found"}, status=200)

        return Response({"products": products}, status=200)

    except Exception as e:
        return Response({"error": str(e)}, status=500)