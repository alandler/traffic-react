import json
import pandas as pd
import numpy as np
from sklearn import preprocessing

fl = pd.read_csv("fl_data_1.txt", header=None)
atl = pd.read_csv("atl_data_1.txt", header=None)

#Add Columns
fl.columns = ["Queue", "Debug1", "Reward", "Velocity", "Debug2", "AvgTime", "Throughput"]
atl.columns = ["Queue", "Debug1", "Reward", "Velocity", "Debug2", "AvgTime", "Throughput"]

print(fl.head())

# #Records format
records_fl = fl.to_json(orient="records")
parsed_records_fl = json.loads(records_fl)
records_atl = atl.to_json(orient="records")
parsed_records_atl = json.loads(records_atl)
# with open('fl-records.json', 'w') as outfile:
#     json.dump(parsed_records_fl, outfile)
# with open('atl-records.json', 'w') as outfile:
#     json.dump(parsed_records_atl, outfile)


# #Split format
split_fl = fl.to_json(orient="split")
parsed_split_fl = json.loads(split_fl)
split_atl = atl.to_json(orient="split")
parsed_split_atl = json.loads(split_atl)
# with open('fl-split.json', 'w') as outfile:
#     json.dump(parsed_split_fl, outfile)
# with open('atl-split.json', 'w') as outfile:
#     json.dump(parsed_split_atl, outfile)

# #Column format
column_fl = fl.to_json(orient="columns")
parsed_column_fl = json.loads(column_fl)
column_atl = atl.to_json(orient="columns")
parsed_column_atl = json.loads(column_atl)
# with open('fl-col.json', 'w') as outfile:
#     json.dump(parsed_column_fl, outfile)
# with open('atl-col.json', 'w') as outfile:
#     json.dump(parsed_column_atl, outfile)


d = {}
create = True

for timestep in parsed_records_fl:
    # print("Step object:", timestep)
    for key in timestep:
        # print("Key: ", key)
        # print(timestep[key])
        if create == True:
            d[key] = [timestep[key]]
        else:
            d[key].append(timestep[key])
    create=False

# Get column names first
names = fl.columns
# Create the Scaler object
scaler = preprocessing.StandardScaler()
# Fit your data on the scaler object
standardized_fl = scaler.fit_transform(fl)
standardized_fl = pd.DataFrame(standardized_fl, columns=names)

# print(scaled_fl.head())


x = fl.values #returns a numpy array
min_max_scaler = preprocessing.MinMaxScaler()
x_scaled = min_max_scaler.fit_transform(x)
normalized_fl = pd.DataFrame(x_scaled)

print(normalized_fl.head())
print(normalized_fl.var())

quartiles = {}
means = {}
stds = {}

for key in d:
    means[key] = np.mean(d[key])
    stds[key] = np.std(d[key])
    quartiles[key] = [
    np.quantile(d[key], .25),
    np.quantile(d[key], .5),
    np.quantile(d[key], .75),
    np.quantile(d[key], 1),
    ]

# print(means)
# print(stds)
# print(quartiles)


# print(scaled_fl.var())
