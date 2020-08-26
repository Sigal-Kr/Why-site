from flask import Flask, jsonify

app = Flask('WhyApp')

@app.route('/')
def home_page():
    return jsonify('My React app?')

if (__name__ == "__main__"):
    app.run()
