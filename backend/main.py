from flask import Flask, Request, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app)
@app.route('/lol', methods=['POST'])
def login_post():
    data = request.json
    print(data)
    return jsonify({"message": "Данные получены", "received_data": data})

if __name__ == '__main__':
    # run app in debug mode on port 5000
    app.run(debug=True, port=8000)
