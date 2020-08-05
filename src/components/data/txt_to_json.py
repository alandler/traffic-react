import json
import pandas

fl = pandas.read_csv("fl_data_1.txt", header=None)
atl = pandas.read_csv("atl_data_1.txt", header=None)


#Records format
fl.columns = ["Queue", "Debug1", "Reward", "Velocity", "Debug2", "AvgTime", "Throughput"]
records_fl = fl.to_json(orient="records")
parsed_records_fl = json.loads(records_fl)

atl.columns = ["Queue", "Debug1", "Reward", "Velocity", "Debug2", "AvgTime", "Throughput"]
records_atl = atl.to_json(orient="records")
parsed_records_atl = json.loads(records_atl)

with open('fl-records.json', 'w') as outfile:
    json.dump(parsed_records_fl, outfile)

with open('atl-records.json', 'w') as outfile:
    json.dump(parsed_records_atl, outfile)


#Split format
split_fl = fl.to_json(orient="split")
parsed_split_fl = json.loads(split_fl)

split_atl = atl.to_json(orient="split")
parsed_split_atl = json.loads(split_atl)

with open('fl-split.json', 'w') as outfile:
    json.dump(parsed_split_fl, outfile)

with open('atl-split.json', 'w') as outfile:
    json.dump(parsed_split_atl, outfile)

#Column format
column_fl = fl.to_json(orient="columns")
parsed_column_fl = json.loads(column_fl)

column_atl = atl.to_json(orient="columns")
parsed_column_atl = json.loads(column_atl)

with open('fl-col.json', 'w') as outfile:
    json.dump(parsed_column_fl, outfile)

with open('atl-col.json', 'w') as outfile:
    json.dump(parsed_column_atl, outfile)