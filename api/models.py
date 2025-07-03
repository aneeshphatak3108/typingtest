from pymongo import MongoClient
import os

#client = MongoClient("mongodb://localhost:27017/")
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)

db = client['typingtestdb']
users_collection = db['users']
scores_collection = db['scores']