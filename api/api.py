import time
import random
import pandas as pd
import json
import numpy as np
from sklearn import preprocessing
from flask import Flask, request


#Import data files
fl_df = pd.read_csv("../src/components/data/fl_data_1.txt", header=None)
atl_df = pd.read_csv("../src/components/data/atl_data_1.txt", header=None)

fl_df.columns = ["Queue", "Debug1", "Reward", "Velocity", "Debug2", "AvgTime", "Throughput"]
atl_df.columns = ["Queue", "Debug1", "Reward", "Velocity", "Debug2", "AvgTime", "Throughput"]

fl_df = fl_df.drop(['Debug1', 'Debug2'], axis =1)
atl_df = atl_df.drop(columns=['Debug1', 'Debug2'])

#
#   APP ROUTES
#

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/run', methods = ["GET","POST"])
def run_model():
    #Extract Inputs
    d={}
    data = request.get_json(silent=True)
    try:
        for key in data:
            print("Key: ", key)
            d[key] = random.randint(0,10)
    except:
        return "You tried"
    return d

@app.route('/fl', methods = ["GET","POST"])
def fl():
    return fl_df.to_json(orient="records")

@app.route('/get_attribute', methods = ["GET","POST"])
def get_attribute():
    try:
        col = request.args['attribute']
        col = col.quantile([.25, .5, .75, 1])

        
        return json.dumps({col: fl_df[col].tolist()})
    except:
        return "Invalid attribute"

@app.route('/intersection', methods = ["GET","POST"])
def intersection():
    fl_quartiles = fl_df.quantile([.25, .5, .75, 1])
    
    def get_quantile(x, col):
        lower_better = ["Queue", "AvgTime"]
        higher_better = ["Reward", "Velocity", "Throughput"]
        if col in higher_better:
            i = 0
            while x>fl_quartiles[col].iloc[i]:
                i+=1
            return i
        else:
            i = 0
            while x>fl_quartiles[col].iloc[i]:
                i+=1
            return 3-i

    try:
        print("Entering the try")
        d={}
        names = fl_df.columns
        for col in names:
            print("col: ", col)
            d[col] = fl_df[col].tolist()
            func = np.vectorize(get_quantile)
            d[col+"Color"] = func(d[col], col).tolist()
            print("colColor: ", col+"Color")
        d['lat'] = 24.204003+random.random()/10-random.random()/10
        d['lng'] = 120.610827+random.random()/10-random.random()/10
        # print("Dictionary: ", d)
        return d
    except:
        return "Invalid attribute"
 