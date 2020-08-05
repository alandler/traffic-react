import json
import pandas

fl = pandas.read_csv("fl_data_1.txt", header=None)
atl = pandas.read_csv("atl_data_1.txt", header=None)


fl.columns = ["Queue", "Debug1", "Reward", "Velocity", "Debug2", "AvgTime", "Throughput"]
result_fl = fl.to_json(orient="records")
parsed_fl = json.loads(result_fl)

atl.columns = ["Queue", "Debug1", "Reward", "Velocity", "Debug2", "AvgTime", "Throughput"]
result_atl = atl.to_json(orient="records")
parsed_atl = json.loads(result_atl)

with open('fl.json', 'w') as outfile:
    json.dump(parsed_fl, outfile)

with open('atl.json', 'w') as outfile:
    json.dump(parsed_atl, outfile)

