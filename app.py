from flask import Flask, render_template
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)

# Configuration for the upload folder
app.config['UPLOAD_FOLDER'] = 'uploads'

# Optional: List to store uploaded post data
posts = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    # Check if the POST request has the file part
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    uploaded_file = request.files['image']

    # If the user does not select a file, the browser submits an empty file without a filename
    if uploaded_file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Save the file to disk
    filename = secure_filename(uploaded_file.filename)
    uploaded_file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    # Prepare the response data
    data = {
        'imageUrl': f'/uploads/{filename}',  # Adjust the path as needed
        'description': request.form.get('description', ''),
        'location': request.form.get('location', ''),
        'breed': request.form.get('breed', '')
    }

    # Handle the file upload and form data here
    # Add the uploaded data to the list of posts (or your database)
    # Return a response indicating success or failure
    # You can return a JSON response with the new post data
    # Example:
    # posts.append(data)

    return jsonify(data), 200

if __name__ == '__main__':
    app.run(debug=True)
