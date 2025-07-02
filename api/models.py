from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client['typingtestdb']

users_collection = db['users']
scores_collection = db['scores']