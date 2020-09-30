from flask import Flask, request, jsonify
import whysqlite as ws

app = Flask(__name__)

@app.route('/submit' ,methods = ['POST'])
def submit_complaint():
    with ws.open_connection("why.db") as conn:
      data = request.json
      complaint_id = ws.insert_data(conn, data)
      return jsonify(complaint_id)

@app.route('/pull', methods = ['POST'])
def get_complaint():
    with ws.open_connection("why.db") as conn:
        requested_id = request.json
        data = ws.pull_data(conn, requested_id)
        print("pulling", data)
        return jsonify(data)

# @app.route('/company-stats/<companyName>')
# def statistics(companyName):
#     return jsonify({'companyName' : companyName ,'companyData': 'No data'})

if __name__ == "__main__":
    conn = ws.create_why_db()
    conn.close()
    app.run(debug=True)
      


