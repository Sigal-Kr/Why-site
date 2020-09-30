import sqlite3
from sqlite3 import Error

def create_why_db():
    database = "why.db"
    sql_create_clients_table = """ CREATE TABLE IF NOT EXISTS clients (
                                        email text PRIMARY KEY,
                                        name text,
                                        phone text,
                                        birth_year int
                                    ); """

    sql_create_complaints_table = """CREATE TABLE IF NOT EXISTS complaints (
                                    client_email text,
                                    company_name text,
                                    content text,
                                    FOREIGN KEY (client_email) REFERENCES clients (email)
                                );"""

    # create a database connection
    conn = open_connection(database)
    print("DB created")
    if conn is not None:
        # create tables
        create_table(conn, sql_create_clients_table)
        create_table(conn, sql_create_complaints_table)
        print("Tables created")
    else:
        print("Error! cannot create the database connection.")
    conn.close()
    return True

def open_connection(db):
    #create a database connection to a SQLite database
    conn = None
    try:
        conn = sqlite3.connect(db)
        print(sqlite3.version)
    except Error as e:
        print(e)
    
    return conn


def create_table(conn, create_table_sql):
    #create a table from the create_table_sql statement
    try:
        c = conn.cursor()
        c.execute(create_table_sql)
    except Error as e:
        print(e)

def create_client(conn, client):
    email = client[0]
    if (pull_client(conn, email)==None) :
        sql = ''' INSERT INTO clients (email, name, phone, birth_year)
                VALUES(?,?,?,?) '''
        cur = conn.cursor()
        cur.execute(sql, client)
        conn.commit()
        return True
    return False

def create_complaint(conn, complaint):
    #Create a new row in the complaints table. returns a row id
    try:
        sql = ''' INSERT INTO complaints (client_email, company_name, content)
                  VALUES(?,?,?) '''
        cur = conn.cursor()
        cur.execute(sql, complaint)
        conn.commit()
        return cur.lastrowid
    except Error as e:
        print(e)   
    return False    

def insert_data(conn, data):
    print("data recived by insert_data is:" , data)
    email = data['clientEmail']
    name = data['clientName']
    phone = data['clientPhone']
    birth_year = data['clientYearOfBirth']
    company_name = data['companyName']
    content = data['complaintContent']
    client = (email, name, phone, birth_year)
    print("insert data client sent to create_client is:  ", client)
    complaint = (email, company_name, content)
    print("insert data complaint sent to create_complaint is:  " ,complaint)
    a = create_client(conn, client)
    print("create_client function returned:  ", a)
    cid = create_complaint(conn, complaint)
    print('insert_data returned cid is:  ' , cid)
    return cid
    
def print_table(conn, table_name):
    cur = conn.cursor()
    sql = "SELECT * FROM " + table_name
    cur.execute(sql)
    rows = cur.fetchall()
    for row in rows:
        print(row)

def pull_complaint(conn, complaint_id):
    # pulls the complaint data by complaint_id
    try:
        cur = conn.cursor()
        cur.execute("SELECT * FROM complaints WHERE rowid=?", (complaint_id,))
        row = cur.fetchone()
        return row
    except Error as e:
        print(e)   
    return False    

def pull_client(conn, email):
    # pulls the client data by email
    try:
        cur = conn.cursor()
        cur.execute("SELECT * FROM clients WHERE email=?", (email,))
        row = cur.fetchone()
        print("pull_client fetched ", row, "when ", email, "as it's input")
        return row
    except Error as e:
        print(e)   

def pull_data(conn, complaint_id):
    complaint = pull_complaint(conn, complaint_id)
    print(" pull_data complaint is: " ,complaint)
    client_email = complaint[0]
    print(" pull_data's complaint[1:] is: ", complaint[1:])
    client = pull_client(conn, client_email)
    print(" pull_data recived pull_client as: ",client)
    merged = {'clientName': client[1], 'clientPhone': client[2], 'clientEmail': client[0],
      'clientYearOfBirth': client[3], 'companyName': complaint[1], 'complaintContent':complaint[2]}
    return merged
