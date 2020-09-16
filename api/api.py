import time
from flask import Flask, request

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/submit' ,methods = ['POST'])
def submitComplaint():
    print(request)
    print(request.json)
    return 'submitted! here is your ID'

@app.route('/pull/<id>')
def pullComplaint(id):
    return {"clientName": 'sigalooshhhhh'}

@app.route('/companyStats/<companyName>')
def statistics(companyName):
    return {'companyName' : companyName ,'companyData': 'No data'}

if __name__ == "__main__":
    app.run(debug=True)