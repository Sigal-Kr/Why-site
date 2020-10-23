from flask import Flask, request, jsonify
import whysqlite as ws
import govapi

app = Flask(__name__)

@app.route('/submit' ,methods = ['POST'])
def submit_complaint():
    with ws.open_connection("why.db") as conn:
      data = request.json
      print(data)
      complaint_id = ws.insert_data(conn, data)
      return jsonify(complaint_id)

@app.route('/pull', methods = ['POST'])
def get_complaint():
    with ws.open_connection("why.db") as conn:
        requested_id = request.json
        data = ws.pull_data(conn, requested_id)
        print("pulling", data)
        return jsonify(data)
        
@app.route('/suggest', methods = ['GET'])
def suggest():
    return jsonify(govapi.gov_api())

@app.route('/company-stats/<companyName>', methods = ['GET'])
def statistics(companyName):
    return jsonify({'companyName' : companyName ,'companyData': 'No data'})

if __name__ == "__main__":
    conn = ws.create_why_db()
    app.run(debug=True)
      


