from flask import Flask, request, jsonify
import psycopg2
from google.cloud import vision

app = Flask(__name__)
vision_client = vision.ImageAnnotatorClient()

# Connect to your PostgreSQL database
conn = psycopg2.connect(
    dbname="lost_animal_images",
    user="your_username",
    password="your_password",
    host="localhost"
)
cur = conn.cursor()

@app.route('/recognize', methods=['POST'])
def recognize_and_compare():
    # Perform image recognition on the uploaded image
    image = request.files['image'].read()
    image = vision.Image(content=image)
    response = vision_client.label_detection(image=image)
    labels = [label.description for label in response.label_annotations]

    # Compare the detected labels with pets in the database
    cur.execute("SELECT name, breed, gender, age FROM pets")
    pets = cur.fetchall()

    for pet in pets:
        pet_name, pet_breed, pet_gender, pet_age = pet
        # Perform image recognition on the pet image from the database
        pet_image_path = f'path/to/{pet_name}_image.jpg'  # Replace with the actual path
        pet_labels = perform_image_recognition(pet_image_path)
        # Compare the labels of the uploaded image with the pet image
        similarity_score = calculate_similarity(labels, pet_labels)
        if similarity_score > 0.8:  # Adjust the threshold as needed
            # If similarity is high enough, return the details of the matching pet
            return jsonify({
                'found': True,
                'pet_name': pet_name,
                'pet_breed': pet_breed,
                'pet_gender': pet_gender,
                'pet_age': pet_age
            })

    # If no matching pet is found, return 0 searches
    return jsonify({
        'found': False,
        'pet_name': None,
        'pet_breed': None,
        'pet_gender': None,
        'pet_age': None
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
