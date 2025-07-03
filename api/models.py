from pymongo import MongoClient

#client = MongoClient("mongodb://localhost:27017/")
client = MongoClient("mongodb+srv://aneeshmphatak:malayamarutham@cluster0.lzwebsp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client['typingtestdb']

users_collection = db['users']
scores_collection = db['scores']