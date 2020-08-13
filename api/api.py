import time
import random
import pandas
import json
from flask import Flask, request

fl = pandas.read_csv("../src/components/fl_data_1.txt", header=None)
atl = pandas.read_csv("../src/components/atl_data_1.txt", header=None)

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/run', methods = ["GET","POST"])
def run_model():
    #Extract Inputs
    d={}
    data = request.get_json(silent=True)
    for key in data:
        print("Key: ", key)
        d[key] = random.randint(0,10)
    return d