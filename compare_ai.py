# Import necessary libraries
from flask import Flask, render_template, request, jsonify, Response, abort
from pymongo import MongoClient
from bson import ObjectId
from google.cloud import vision

app = Flask(__name__)

# Connect to MongoDB
mongo_client = MongoClient('mongodb://localhost:27017')
db = mongo_client['my_database']
images_collection = db['images']

# Initialize vision API client
vision_client = vision.ImageAnnotatorClient()


# Define route to serve the main HTML page
@app.route('/')
def index():
    return render_template('index.html')


# Define function to extract pet features using Google Cloud Vision API
def get_pet_features(image_bytes):
    image = vision.Image(content=image_bytes)
    response = vision_client.label_detection(image=image)
    pet_features = {}
    # Simplify example - you'd map and extract meaningful labels
    for label in response.label_annotations:
        pet_features[label.description] = label.score
    return pet_features


# Define route to handle image upload and feature extraction
@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' in request.files:
        image_file = request.files['image']
        image_bytes = image_file.read()
        image_features = get_pet_features(image_bytes)
        # Save the uploaded image and its features to MongoDB
        image_id = images_collection.insert_one({'image': image_bytes, 'features': image_features}).inserted_id
        return jsonify({'image_id': str(image_id)})
    else:
        return 'No image file provided', 400


# Define route to handle image feature comparison
@app.route('/find_similar_pets', methods=['POST'])
def find_similar_pets_route():
    data = request.get_json()
    image_id = data.get('image_id')
    uploaded_image_data = images_collection.find_one({'_id': ObjectId(image_id)})
    if not uploaded_image_data:
        return jsonify({'error': 'Image not found'}), 404
    
    uploaded_image_features = uploaded_image_data['features']
    all_stored_pet_features = get_all_stored_pet_features()
    sorted_pets = find_and_sort_similar_pets(uploaded_image_features, all_stored_pet_features)
    return jsonify(sorted_pets)


# Define function to retrieve all stored pet features
def get_all_stored_pet_features():
    stored_pet_features = {}
    for pet in images_collection.find():
        if 'features' in pet:
            stored_pet_features[pet['_id']] = pet['features']
    return stored_pet_features


# Calculate similarity score between pet features
def calculate_similarity(uploaded_pet_features, stored_pet_features):
    # Example: simple matching score based on matching features
    score = 0
    for feature, value in uploaded_pet_features.items():
        if feature in stored_pet_features and value == stored_pet_features[feature]:
            score += 1
    return score


# Find and sort similar pets based on similarity score
def find_and_sort_similar_pets(uploaded_image_features, all_stored_pet_features):
    similarity_scores = []
    for pet_id, features in all_stored_pet_features.items():
        score = calculate_similarity(uploaded_image_features, features)
        similarity_scores.append({'id': str(pet_id), 'score': score})
    
    return sorted(similarity_scores, key=lambda x: x['score'], reverse=True)


# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)