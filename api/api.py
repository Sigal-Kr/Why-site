import time
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/submit' ,methods = ['POST'])
def submitComplaint():
    newComplaint = request.json
    # generate ID  
    return jsonify(9)

@app.route('/pull/<id>', methods = ['GET'])
def pullComplaint(id):
    return "clientId is %s"  % id

@app.route('/companyStats/<companyName>')
def statistics(companyName):
    return {'companyName' : companyName ,'companyData': 'No data'}

if __name__ == "__main__":
    app.run(debug=True)