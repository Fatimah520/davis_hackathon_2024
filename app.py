from flask import Flask, request

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload_file():
    uploaded_file = request.files['file']
    uploaded_file.save(uploaded_file.filename)  # Save the file to disk
    return 'File uploaded successfully'

if __name__ == '__main__':
    app.run(debug=True)
