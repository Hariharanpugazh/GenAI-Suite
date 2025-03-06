import os
import json
import numpy as np
import threading
from pymongo import MongoClient
from django.http import JsonResponse
from rest_framework.decorators import api_view
from sentence_transformers import SentenceTransformer 
import google.generativeai as genai
import hashlib
import re
import spacy
from datetime import datetime
import requests
from django.views.decorators.csrf import csrf_exempt
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import pytz


os.environ["GOOGLE_API_KEY"] = "AIzaSyC6-Y0KjdZwB9E0-BLWdhUcAaf92sHJYrM"  # Replace with your actual key
genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

# 🔹 Create Generative Models (Using the Same API Key)
gemini_model = genai.GenerativeModel("gemini-1.5-flash-8b")
scheduling_model = genai.GenerativeModel("gemini-1.5-flash-8b")  


client = MongoClient("mongodb+srv://ihub:ihub@cce.ksniz.mongodb.net/")
db = client["GENAI"]
collection = db["Chatbot_Knowledgebase"]

# 🔹 Path to JSON Knowledge Base
JSON_FOLDER = r"E:\\Rahul\\5-3-2025\\GenAI-Suite\\Knowledge_base"

embedding_model = SentenceTransformer('jinaai/jina-embeddings-v2-base-en')
print("Embedding dimension:", embedding_model.get_sentence_embedding_dimension())

data_loaded = threading.Event()

chat_history = []

nlp = spacy.load("en_core_web_sm")

def compute_hash(content):
    return hashlib.sha256(content.encode()).hexdigest()

def store_embeddings_in_mongo(json_folder):
    knowledge_base, file_data = load_json_files(json_folder)

    for file_name, content in file_data:
        content_hash = compute_hash(content)  # Generate hash

        # Check if the file already exists and if the content has changed
        existing_doc = collection.find_one({"file_name": file_name}, {"content_hash": 1})

        if existing_doc and existing_doc.get("content_hash") == content_hash:
            print(f"🔹 Skipping {file_name} (Already exists and unchanged)")
            continue  # Skip processing if content is the same

        # Generate and store embeddings only if new or changed
        embedding = embedding_model.encode(content).tolist()  # Convert NumPy array to list

        try:
            collection.update_one(
                {"file_name": file_name},  # Search condition
                {"$set": {"content": content, "embedding": embedding, "content_hash": content_hash}},  # Update values
                upsert=True,  # Insert if not exists
            )
            print(f"✅ Stored/Updated {file_name} in MongoDB")
        except Exception as e:
            print(f"❌ Error storing {file_name} in MongoDB: {e}")

    print("✅ Knowledge base processed successfully!")
    data_loaded.set()

# ✅ **2. Load JSON Data**
def load_json_files(json_folder):
    knowledge_base, file_data = [], []
    for file_name in os.listdir(json_folder):
        if file_name.endswith(".json"):
            try:
                with open(os.path.join(json_folder, file_name), "r", encoding="utf-8") as file:
                    data = json.load(file)
                    content = json.dumps(data)
                    knowledge_base.append(content)
                    file_data.append((file_name, content))
            except json.JSONDecodeError as e:
                print(f"❌ Error decoding JSON in file {file_name}: {e}")
    return knowledge_base, file_data

# ✅ **3. Search MongoDB for Relevant Knowledge**
def search_mongo_vector(query, top_k=3):
    query_embedding = embedding_model.encode([query]).tolist()[0]  # Convert to list

    try:
        pipeline = [
            {
                "$vectorSearch": {
                    "index": "updated_vector",  # Ensure vector index exists
                    "path": "embedding",
                    "queryVector": query_embedding,
                    "numCandidates": 2,
                    "limit": top_k,
                    "similarity": "cosine"
                }
            }
        ]
        results = collection.aggregate(pipeline)  # Run vector search query
        
        # Extract unique contents while preserving order
        unique_contents = []
        seen_contents = set()

        for doc in results:
            content = doc["content"].strip()  # Remove unnecessary whitespace
            if content and content not in seen_contents:  # Ensure uniqueness
                unique_contents.append(content)
                seen_contents.add(content)

        return unique_contents

    except Exception as e:
        print(f"❌ Vector search error: {e}")
        return []

def check_scheduling_intent(query, chat_history):
    history_text = "\n".join([f"{msg['role']}: {msg['content']}" for msg in chat_history])

    prompt = f"""
    You are an expert at understanding user intent for scheduling meetings. you are provided with the conversation history
    Analyze the conversation and determine if the user wants to schedule a demo or meeting. or shown any interest to schedule a meeting
    Return ONLY "yes" or "no".

    Consider direct requests (e.g., "Can we schedule a meeting?") and indirect cues
    (e.g., "I think I need a demo," "When are you available?").
    

    Conversation:
    {history_text}

    User Query: {query}

    Intent to Schedule Meeting (yes/no):
    """

    try:
        response = scheduling_model.generate_content(prompt)
        intent = response.text.strip().lower()
        print(f"Scheduling Intent Detection: {intent}")
        if "yes" in intent:
            return "yes"
        else:
            return "no"
    except Exception as e:
        print(f"❌ Scheduling Intent API Error: {e}")
        return "no"

# ✅ **4. Generate Answer with Gemini**
def generate_answer_with_rag(query, closest_knowledge_list, chat_history):
    

        combined_knowledge = "\n\n".join(closest_knowledge_list)
        
        # Truncate knowledge if it exceeds the character limit
        max_knowledge_length = 28000
        if len(combined_knowledge) > max_knowledge_length:
            combined_knowledge = combined_knowledge[:max_knowledge_length]
            
            print(len(combined_knowledge))


        # Incorporate chat history into the prompt
        history_text = "\n".join([f"{msg['role']}: {msg['content']}" for msg in chat_history[:-3]])
        print(history_text)

        prompt = f"""
        You are a professional AI assistant for SNS iHub, focused on engaging users and promoting SNS products.
        Your goal is to:
        - Understand the user's interest and provide relevant information. Answer only the question without additional context.
        - Provide concise, well-structured, and engaging responses.
        - Offer relevant information while subtly encouraging user interaction.
        - Suggest scheduling a demo when strong interest is detected. the interest detection can be found by whether the user asks two questions about specific products or topic then he is interested
        (for example : the user ask "tell me about assesment platform , the model provides the response , after the user ask about its benefit , then he is interested about assesment platform , then you suggest scheduling a demo along with the model response else , provide only response , dont ask for schduling
        - Make the response brief and clear, without long answers.

        Analyze the previous conversation and find the interest of the user and in the conversation if the user shows the intent for scheduling the demo or meeting then return "yes", else "no"
        (for example :models response :The Assessment Platform streamlines assessments, improving efficiency for staff and providing detailed performance reports for students. This leads to better understanding of student progress and more effective learning. Interested in seeing a demo? and
        user response , "yes" , then he interested in scheduling meet, the user can show the scheduling intent in direct or indirect for example , can you schedule meet? or i think i need a meet) analyze it properly

        Knowledge: {combined_knowledge}

        Previous Conversation:
        {history_text}

        Question: {query}

        The answer should be formatted and not just copied from the knowledge base. Reframe it and provide a concise response, considering the previous conversation.
        """

        # Print all content passed to the model
        print("\n🔹 Full Content Sent to Model:\n")
        print(prompt)

        # Calculate and print the total length of the content
        total_length = len(prompt)
        print(f"\n🔹 Total Length of Content Sent: {total_length} characters\n")

        try:
            response = gemini_model.generate_content(prompt)
            return response.text.strip()
        except Exception as e:
            print(f"❌ Gemini API Error: {e}")
            return "Sry , Currently we seem a overloading , try again later !!"

# ✅ **5. New Function to Handle Scheduling**
def schedule_demo(chat_history):
    """Handles the scheduling of a demo with natural language understanding."""
    history_text = "\n".join([f"{msg['role']}: {msg['content']}" for msg in chat_history])

    # Initialize scheduling data with default year
    scheduling_data = {
        "date": None,
        "time": None,
        "email": None,
        "current_step": "initial"
    }

    # Update with any existing data from history
    for msg in chat_history:
        if "scheduling_data" in msg:
            existing_data = msg["scheduling_data"]
            scheduling_data.update(existing_data)  # Update all fields including current_step

    def parse_datetime_with_gemini(text):
        """Use Gemini to parse natural language date and time."""
        current_date = datetime.now()
        
        prompt = f"""
        Current date and time: {current_date.strftime('%Y-%m-%d %H:%M')} IST
        User input: "{text}"

        Convert the user's date and time input to standard format.
        If input is unclear or invalid, return "invalid".

        Consider:
        - Tomorrow means next day
        - Morning times (6 AM - 11:59 AM)
        - Afternoon times (12 PM - 4:59 PM)
        - Evening times (5 PM - 11:59 PM)
        - Business hours are 9 AM to 6 PM IST
        - Convert all times to 24-hour format
        - Set date to current date if only time is mentioned

        Return exactly in this format (nothing else):
        YYYY-MM-DD|HH:MM
        """

        try:
            response = scheduling_model.generate_content(prompt)
            parsed = response.text.strip()
            
            if parsed == "invalid":
                return False
                
            date_str, time_str = parsed.split("|")
            
            # Validate the parsed datetime
            parsed_dt = datetime.strptime(f"{date_str} {time_str}", "%Y-%m-%d %H:%M")
            current_dt = datetime.now()
            
            # Check if time is in the past
            if parsed_dt < current_dt:
                return False
                
            # Check business hours (9 AM to 6 PM)
            hour = parsed_dt.hour
            if hour < 9 or hour >= 18:
                return False
                
            scheduling_data["date"] = date_str
            scheduling_data["time"] = time_str
            return True
            
        except Exception as e:
            print(f"Error parsing datetime: {e}")
            return False

    def extract_email(text):
        """Extract email address from text."""
        email_match = re.search(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}", text)
        if email_match:
            email = email_match.group(0)
            scheduling_data["email"] = email
            return True
        return False

    def get_next_response():
        """Get the next appropriate response based on current state."""
        
        # Initial state or datetime needed
        if scheduling_data["date"] is None or scheduling_data["time"] is None:
            scheduling_data["current_step"] = "datetime"
            return (
                "Could you please specify when you'd like to schedule the demo? "
                "You can say something like 'tomorrow at 11 AM' or 'next Monday at 2 PM'. "
                "(Our demo slots are available between 9 AM and 6 PM IST)"
            )
        
        # Need email
        if scheduling_data["email"] is None:
            scheduling_data["current_step"] = "email"
            return "Great! Could you please share your email address?"
        
        # All information collected - show confirmation
        scheduling_data["current_step"] = "confirmation"
        return (
            f"Perfect! Here are your demo details:\n"
            f"📅 Date: {scheduling_data['date']}\n"
            f"⏰ Time: {scheduling_data['time']} IST\n"
            f"📧 Email: {scheduling_data['email']}\n"
            f"Please confirm if these details are correct (yes/no)?"
        )

    # Process the latest user message
    latest_msg = chat_history[-1]["content"].lower()
    
    # Handle confirmation state
    if scheduling_data["current_step"] == "confirmation":
        if "yes" in latest_msg or "confirm" in latest_msg:
            try:
                # Save to MongoDB
                db.scheduled_demos.insert_one({
                    "date": scheduling_data["date"],
                    "time": scheduling_data["time"],
                    "email": scheduling_data["email"],
                    "scheduled_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                    "status": "confirmed"
                })
                scheduling_data["current_step"] = "completed"
                return "✅ Your demo has been successfully scheduled! You'll receive a confirmation email shortly.", scheduling_data
            except Exception as e:
                print(f"Error saving to database: {e}")
                return "❌ There was an error scheduling your demo. Please try again.", scheduling_data
        elif "no" in latest_msg:
            # Reset scheduling data but keep email if we have it
            email = scheduling_data.get("email")
            scheduling_data = {
                "date": None,
                "time": None,
                "email": email,
                "current_step": "datetime"
            }
            return "Let's try again. When would you like to schedule the demo?", scheduling_data
    
    # Handle current step
    if scheduling_data["current_step"] == "datetime":
        if parse_datetime_with_gemini(latest_msg):
            # Successfully parsed date/time, move to next step
            return get_next_response(), scheduling_data
        else:
            return (
                "I couldn't understand that time format or it's outside our demo hours (9 AM - 6 PM IST). "
                "Please try again with something like 'tomorrow at 11 AM' or 'next Monday at 2 PM'."
            ), scheduling_data
            
    elif scheduling_data["current_step"] == "email":
        if extract_email(latest_msg):
            # Successfully got email, move to next step
            return get_next_response(), scheduling_data
        else:
            return "I couldn't find a valid email address. Could you please provide your email?", scheduling_data
    
    # Get next response for current state
    return get_next_response(), scheduling_data
            
# ✅ **6. API Endpoint for Chatbot**
@api_view(["POST"])
def chatbot_view(request):
    global chat_history
    data_loaded.wait()
    query = request.data.get("query")

    if not query:
        return JsonResponse({"error": "No query provided"}, status=400)

    try:
        chat_history.append({"role": "user", "content": query})

        # ✅ Check for ongoing scheduling process
        scheduling_data = None
        for msg in reversed(chat_history):
            if "scheduling_data" in msg:
                scheduling_data = msg["scheduling_data"]
                break  # Get the latest scheduling data

        # ✅ Handle scheduling step-by-step
        if scheduling_data:
            schedule_result, scheduling_data = schedule_demo(chat_history[-20:])  # Last 20 messages
            chat_history.append({"role": "assistant", "content": schedule_result, "scheduling_data": scheduling_data})

            # 🔹 If all details are collected, confirm scheduling
            if "Is this correct?" in schedule_result:
                if "yes" in query.lower():  # ✅ User confirms scheduling
                    confirmation_message = "✅ Successfully Scheduled! Thank you for agreeing."
                    chat_history.append({"role": "assistant", "content": confirmation_message})
                    return JsonResponse({"answer": confirmation_message})
                else:  # ❌ User says "no" → Restart scheduling, but keep history
                    # reset_message = "Okay, let's start over. What date works best for you? (YYYY-MM-DD)"
                    # chat_history.append({"role": "assistant", "content": reset_message})
                    # return JsonResponse({"answer": reset_message})
                    generate_answer_with_rag(query, closest_knowledge_list, chat_history[-3:])  

            else:
                return JsonResponse({"answer": schedule_result})

        else:
            # 🔹 No scheduling in progress → Check intent
            scheduling_intent = check_scheduling_intent(query, chat_history[-20:])

            if scheduling_intent == "yes":
                schedule_question, schedule_data = schedule_demo(chat_history[-20:])
                chat_history.append({"role": "assistant", "content": schedule_question, "scheduling_data": schedule_data})
                return JsonResponse({"answer": schedule_question})

            else:
                # 🔹 No scheduling intent detected → Use RAG-based response
                closest_knowledge_list = search_mongo_vector(query)
                answer = generate_answer_with_rag(query, closest_knowledge_list, chat_history[-3:])
                chat_history.append({"role": "assistant", "content": answer})
                chat_history = chat_history[-3:]  # Keep only last 3 messages
                return JsonResponse({"answer": answer})

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    




# MongoDB connection
scheduled_demos_collection = db["scheduled_demos"]
meeting_data_collection = db["Meeting_Data"]

# Email Configuration
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 587
EMAIL_HOST_USER = "rahulsnsihub@gmail.com"  # Replace with your email
EMAIL_HOST_PASSWORD = "gspmoernuumgcerc"  # Replace with your app password
EMAIL_USE_TLS = True

# The URL for the Google Apps Script Web App (change this to your published Apps Script URL)
GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxodhdLkjoMouXiJECStbG0eIM4hg4GhETvdBO_MKJLAXAF47TIIl_9w-xafCSbwf_m2A/exec"

@csrf_exempt
def create_google_calendar_event(request):
    # Fetch data from the scheduled_demos collection
    demo_data = scheduled_demos_collection.find_one(sort=[('_id', -1)])  # Get the latest demo data
    
    if not demo_data:
        return JsonResponse({"error": "No demo data found in MongoDB"}, status=400)

    # Prepare data to be copied to Meeting_Data collection
    meeting_data = {
        "date": demo_data.get("date"),
        "time": demo_data.get("time"),
        "email": demo_data.get("email"),
        "scheduled_at": demo_data.get("scheduled_at"),
        "status": demo_data.get("status"),
        "name": demo_data.get("name", "Demo User"),  # Use actual name or default
        "title": "Scheduled Demo",  # Set default or adjust as necessary
        "purpose": "Product Demo",  # Set default or adjust as necessary
    }

    # Insert the demo data into the Meeting_Data collection
    try:
        meeting_data_collection.insert_one(meeting_data)
    except Exception as e:
        return JsonResponse({"error": f"Failed to insert data into Meeting_Data: {str(e)}"}, status=500)

    # Now, proceed with the Google Calendar creation logic
    date_str = meeting_data.get("date") 
    time_str = meeting_data.get("time") 

    if not date_str or not time_str:
        return JsonResponse({"error": "Missing date or time data"}, status=400)
    
    # Combine date and time into a single string and convert it to ISO format
    try:
        # Combine date and time into a single string
        datetime_str = f"{date_str} {time_str}"
        
        # Define the time zone (IST in this case)
        timezone = pytz.timezone('Asia/Kolkata')

        # Convert the time string to a naive datetime object first
        naive_datetime = datetime.strptime(datetime_str, "%Y-%m-%d %H:%M")
        
        # Localize the naive datetime to IST
        localized_datetime = timezone.localize(naive_datetime)

        # Convert the localized datetime to ISO format (with timezone offset)
        iso_datetime = localized_datetime.isoformat()
    except ValueError:
        return JsonResponse({"error": "Invalid date or time format"}, status=400)

    # Prepare data for Google Apps Script
    data = {
        "name": meeting_data["name"],
        "email": meeting_data["email"],
        "title": meeting_data["title"],
        "purpose": meeting_data["purpose"],
        "date": date_str,
        "time": time_str,
        "iso_datetime": iso_datetime  # Ensure this is correctly populated
    }

    # Send the data to Google Apps Script via HTTP POST
    try:
        response = requests.post(GOOGLE_SCRIPT_URL, json=data)

        # Log the response for debugging
        print(f"Google Script Response Status: {response.status_code}")
        print(f"Response Body: {response.text}")

        if response.status_code == 200:
            # If the event was successfully created, send an email notification to the user
            send_email_notification(meeting_data["email"], meeting_data["name"], meeting_data["date"], meeting_data["time"])

            # Update the status in the Meeting_Data collection to "Meeting Scheduled"
            meeting_data_collection.update_one(
                {"email": meeting_data["email"], "scheduled_at": meeting_data["scheduled_at"]},  # Identify the correct document
                {"$set": {"status": "Meeting Scheduled"}}
            )

            return JsonResponse({"success": "Event successfully created in Google Calendar and status updated"})
        else:
            return JsonResponse({"error": "Failed to create event in Google Calendar", "details": response.text}, status=500)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

def send_email_notification(user_email, user_name, date, time):
    try:
        # Send an email notification to the user about the scheduled meeting
        subject = f"Virtual Meeting Scheduled for {user_name}"
        message = f"Dear {user_name},\n\nYou have been scheduled for a virtual meeting on {date} at {time}.\n\nBest Regards,\nSNS Team"
        from_email = EMAIL_HOST_USER

        # Set up the MIME
        msg = MIMEMultipart()
        msg['From'] = from_email
        msg['To'] = user_email
        msg['Subject'] = subject
        
        # Attach the message body
        msg.attach(MIMEText(message, 'plain'))

        # Establish a connection to the SMTP server
        server = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT)
        server.starttls()  # Secure the connection
        
        # Login to the email account
        server.login(EMAIL_HOST_USER, EMAIL_HOST_PASSWORD)
        
        # Send the email
        text = msg.as_string()
        server.sendmail(from_email, user_email, text)
        server.quit()  # Close the connection

        print(f"Email sent to {user_email}")
    except Exception as e:
        print(f"Failed to send email: {e}")

    
# ✅ **7. Load Data on Startup (Runs in Background)**
loading_thread = threading.Thread(target=store_embeddings_in_mongo, args=(JSON_FOLDER,), daemon=True)
loading_thread.start()

