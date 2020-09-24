import time , sqlite3, random
from flask import Flask, request, jsonify

app = Flask(__name__)

complaints = {}


def create_db():
    conn = sqlite3.connect('why.db')
    print ("Why.db was created.")
    conn.execute("create table clients (name, email, phone, birthyear);") #no client id...
    print ("CLIENTS table was created.")
    conn.execute("create table complaints (complaint_id, text, client_id, company_id);")
    print ("COMPLAINTS table was created.")
    conn.execute("create table companies (company_id, company_name);")
    print ("COMPANIES table was created.")
    conn.close()

def print_table(table_name):
    con = sqlite3.connect('why.db')
    sql_string = "SELECT name, email, phone, birthyear from " + table_name + ""
    a_table = con.execute(sql_string)
    print("The content of",table_name.upper(),"table is:")
    row_number = 0
    for row in a_table:
        print(row_number)
        print ("name = ", row[0])
        print ("email = ", row[1])
        print ("phone = ", row[2])
        print ("birthyear = ", row[3], "\n")
        row_number+=1
    print("~~~~~~~ End of ",table_name.upper(), " ~~~~~~~")
    con.close()


def insert_clients(content):
    con = sqlite3.connect('why.db')
    val = content
    sql_string = "insert into clients values (?,?,?,?)"
    con.execute(sql_string, val);
    con.commit()
    con.close()
    print_table("clients")

def insert_complaint():
    # insert_clients(x,y,z)
    # insert_table("complaints",t,s,z)
    # insert_table("companies",t,c)
    return True

def pull_db_complaint():
    return

def pull_db_stats():
    return



@app.route('/submit' ,methods = ['POST'])
def submit_complaint():
    # global complaints
    new_complaint = request.json
    new_key = round(random.random() *10000)
    complaints[new_key] = new_complaint
    print("my dict after update is :", complaints)
    print("submit returned:", new_key )
    return jsonify(new_key)

@app.route('/pull', methods = ['POST'])
def pull_complaint():
    requested_key = request.json
    data = complaints [requested_key]
    print("pulling", data)
    return jsonify(data)

@app.route('/company-stats/<companyName>')
def statistics(companyName):
    return {'companyName' : companyName ,'companyData': 'No data'}

if __name__ == "__main__":
    app.run(debug=True)