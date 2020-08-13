import time
import random
from flask import Flask, request

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/run', methods = ["GET","POST"])
def run_model():
    d={}
    data = request.get_json(silent=True)
    for key in data:
        print("Key: ", key)
        d[key] = random.randint(0,10)
    return d