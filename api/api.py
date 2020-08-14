import time
import random
import pandas as pd
import json
import numpy as np
from sklearn import preprocessing
from flask import Flask, request


#Import data files
fl_txt = pd.read_csv("../src/components/data/fl_data_1.txt", header=None)
atl_txt = pd.read_csv("../src/components/data/atl_data_1.txt", header=None)

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

@app.route('/fl', methods = ["GET","POST"])
def fl():
    return fl_txt.to_json(orient="records")