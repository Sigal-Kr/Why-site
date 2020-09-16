# import mysql.connector

# mydb = mysql.connector.connect(
#     host = "localhost",
#     user = "yourusername",
#     password = "yourpassword"

# )

# print(mydb)

from flask import Flask, json

companies = [{"id": 1, "name": "Company One"}, {"id": 2, "name": "Company Two"}]

api = Flask(__name__)

@api.route('/companies', methods=['GET'])
def get_companies():
  return json.dumps(companies)

@api.route('/companies', methods=['POST'])
def post_companies():
    return json.dumps({"success": True}), 201

if __name__ == '__main__':
    api.run()


# from flask import Flask, jsonify

# app = Flask('WhyApp')

# @app.route('/')
# def home_page():
#     return jsonify('My React app?')

# if (__name__ == "__main__"):
#     app.run()
