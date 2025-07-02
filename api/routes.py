from api.models import users_collection, scores_collection
from api import app
from flask import request, jsonify, session
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
from datetime import datetime

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
            "maxscore": {},
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
    maxscore = record.get("maxscore")
    scores = record.get("scores")
    return jsonify({"maxscore": maxscore, "scores": scores})



@app.route('/api/leaderboard', methods=['GET'])
def leaderboard():
    pipeline = [
        {"$unwind": "$scores"},#Flatten scores array
        {"$project": {
            "username": 1,
            "score": "$scores.score",
            "accuracy": "$scores.accuracy",
            "timestamp": "$scores.timestamp"
        }},
        {"$sort": {"score": -1}},#Scores from max to min
        {"$limit": 10}
    ]

    top_scores = list(scores_collection.aggregate(pipeline))
    
    leaderboard_data = [
        {
            "username": entry["username"],
            "score": entry["score"],
            "accuracy": entry["accuracy"],
            "timestamp": entry["timestamp"]
        }
        for entry in top_scores
    ]

    return jsonify({"leaderboard_data": leaderboard_data}), 200



@app.route('/api/savescore', methods=['POST'])
def savescore():
    if "username" not in session:
        return jsonify({"message": "Unauthorized"}), 401

    data = request.json
    score = float(data.get("score"))
    accuracy = float(data.get("accuracy"))

    if score is None:
        return jsonify({"message": "Score is required"}), 400

    username = session["username"]
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    new_score = {
        "score": score,
        "accuracy": accuracy,
        "timestamp": timestamp
    }

    # Fetch existing record
    record = scores_collection.find_one({"username": username})
    current_max = record.get("maxscore", {}).get("score", 0) if record and isinstance(record.get("maxscore"), dict) else 0
    update_fields = {
        "$push": {"scores": new_score}
    }
    if score > current_max:
        update_fields["$set"] = {"maxscore": new_score}
    scores_collection.update_one(
        {"username": username},
        update_fields,
        upsert=True
    )
    return jsonify({"message": "Score saved successfully"}), 200