"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)


# @api.route('/hello', methods=['POST', 'GET'])
# def handle_hello():

#     response_body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#     }

#     return jsonify(response_body), 200

@api.route("/token", methods=['POST'])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if email is None or password is None:
        return jsonify({"Message":"Bad username or password"}), 401
    
    user = User.query.filter_by(email=email, password=password).first()
    if user is None :
        return jsonify({"Message":"Bad username or password"}), 401
    
    access_token = create_access_token(identity = user.id)
    return jsonify(access_token = access_token), 200

@api.route('/user', methods=['GET'])
def get_users():

    if request.method == "GET" :
        all_users = User.query.all()
        user_dictionary = []
        for user in all_users:
            user_dictionary.append(user.serialize())
        print(user_dictionary)

    return jsonify(user_dictionary), 200

@api.route('/user', methods=['POST'])
def register_user():
    if request.method == "POST":
        body = request.json
        email = body.get("email", None)
        password = body.get("password", None)
        
        try:
            if email is None or password is None:
                raise Exception("No ingresaste todos los datos", 400)
            user = User(email=email, password=password)
            db.session.add(user)
            db.session.commit()
            return jsonify("Message" "User Created!")
        except Exception as error:
            return jsonify(error.args[0])

@api.route('/login', methods=['POST'])
def login():
    if request.method == "POST":
        body = request.json
        email = body.get("email", None)
        password = body.get("password", None)

        try:
            if email is None or password is None:
                raise Exception("El email y password son requeridos", 400)
            else:
                user = User.query.filter_by(email=email, password=password).first()
                if user is None:
                    return jsonify({"Message" : "Credenciales Invalidas"}), 400
                else:
                    token = create_access_token( identity= user.id )
                    return jsonify({"token" : token}), 200
        except Exception as error:
            return jsonify(error.args[0]), error.args[1] if len(error.args) > 1 else 500

@api.route("/private", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200