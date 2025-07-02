from flask import Flask, request
from flask_cors import CORS
from pymongo import MongoClient
from api.config import Config
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash


app = Flask(__name__)
app.config.from_object(Config)#Load all the attributes from the Config class into the Flask app’s configuration dictionary
CORS(app, supports_credentials=True)

from api import routes #to avoid circular import