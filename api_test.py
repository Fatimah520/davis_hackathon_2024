import os
from clarifai.rest import ClarifaiApp
from flask import Flask, request, render_template

myAI = ClarifaiApp('280dc05fc8a24517ae1abd9461bbe49f')
app = Flask(__name__)

@app.route('/')
def index():
    
