from flask import Flask, request, jsonify
import sqlite3
from flask import Flask, request, jsonify, render_template
import base64
from flask import Flask, request, jsonify, redirect, url_for
import os

app = Flask(__name__)

# Define the directory to store uploaded files
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def index():
    return render_template('testtttt.html')

@app.route('/submit', methods=['POST'])
def submit_form():
    if 'file' not in request.files:
        return jsonify({'success': False, 'message': 'No file part'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'success': False, 'message': 'No selected file'})

    # Save the uploaded file to the UPLOAD_FOLDER
    filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(filename)

    # Generate the URL for accessing the uploaded file
    file_url = url_for('uploaded_file', filename=file.filename)

    # Redirect to home.html with the file URL as a query parameter
    return redirect(url_for('home', file_url=file_url))

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True)







app = Flask(__name__)
@app.route('/')
def index():
    image_url = request.args.get('image')

    if image_url:
        with open(image_url, "rb") as img_file:
            image_data = base64.b64encode(img_file.read()).decode('utf-8')
            print("Encoded Image Data:", image_data)  
    else:
        image_data = None

    return render_template('home.html', image_data=image_data)


conn = sqlite3.connect('pets.db')
c = conn.cursor()
c.execute('''CREATE TABLE IF NOT EXISTS pets
             (id INTEGER PRIMARY KEY, gender TEXT, size TEXT, color TEXT)''')
conn.commit()

# Route to handle form submission
@app.route('/submit', methods=['POST'])
def submit_form():
    try:
        # Extract form data
        gender = request.form['gender']
        size = request.form['size']
        color = request.form['color']

        c.execute("INSERT INTO pets (gender, size, color) VALUES (?, ?, ?)", (gender, size, color))
        conn.commit()

        return jsonify({'success': True}), 200
    except Exception as e:
        print(e)
        return jsonify({'success': False}), 500

if __name__ == '__main__':
    app.run(debug=True)
