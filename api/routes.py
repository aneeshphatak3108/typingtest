from api.models import users_collection, scores_collection
from api import app
from flask import request, jsonify, session
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    username = data["username"]
    password = data["password"]
    hashed_password = generate_password_hash(password)
    if (users_collection.find_one({"username":username})):
        return jsonify({"message": "username already exists"}), 400
    users_collection.insert_one(
        {
            "username": username,
            "password": hashed_password
        }
    )
    scores_collection.insert_one(
        {
            "username": username,
            "maxscore": 0,
            "scores": []
        }
    )
    return jsonify({"message":"User created successfully"}), 200


@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data["username"]
    password = data["password"]
    record = users_collection.find_one({"username":username})
    if not record:
        return jsonify({"message":"No such user exists"}), 404
    stored_pw = record["password"]
    if not check_password_hash(stored_pw, password):
        return jsonify({"message": "Incorrect password"}), 404
    session["username"] = username
    return jsonify({"message": "Login Successful"}), 200


@app.route('/api/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({"message":"logged out successfully"})


@app.route('/api/selfanalysis', methods=['GET'])
def selfanalysis():
    if "username" not in session:
        return jsonify({"message" :"Unauthorized"}), 401
    username = session["username"]
    record = scores_collection.find_one({"username":username})
    if not record:
        return jsonify({"message":"Could not find record"})
    maxscore = record["maxscore"]
    scores = record["scores"]
    return jsonify({"maxscore": maxscore, "score": scores})

@app.route('/api/leaderboard', methods=['GET'])
def leaderboard():
    top_users = scores_collection.find().sort("maxscore", -1).limit(10)
    leaderboard_data = []
    for user in top_users:
        leaderboard_data.append(
            {
                "username":user.get("username", "Unknown"),
                "maxscore":user.get("maxscore", 0)
            }
        )
    return jsonify({"leaderboard_data":leaderboard_data}), 200