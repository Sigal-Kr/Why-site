import time , sqlite3
from flask import Flask, request, jsonify

app = Flask(__name__)

my_value = ""

@app.route('/submit' ,methods = ['POST'])
def submit_complaint():
    global my_value
    new_complaint = request.json
    my_value = new_complaint 
    print("submit", my_value)
    return jsonify(9)

@app.route('/pull', methods = ['GET'])
def pull_complaint():
    print("pulling", my_value)
    return jsonify(my_value)

@app.route('/company-stats/<companyName>')
def statistics(companyName):
    return {'companyName' : companyName ,'companyData': 'No data'}

if __name__ == "__main__":
    app.run(debug=True)