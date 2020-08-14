#Import libraries
import json
import pandas as pd
import numpy as np
from sklearn import preprocessing

#Import data files
fl = pd.read_csv("fl_data_1.txt", header=None)
atl = pd.read_csv("atl_data_1.txt", header=None)

# Add Column Names
fl.columns = ["Queue", "Debug1", "Reward", "Velocity", "Debug2", "AvgTime", "Throughput"]
atl.columns = ["Queue", "Debug1", "Reward", "Velocity", "Debug2", "AvgTime", "Throughput"]

#
# WRITE FILES
#

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




#
# STATISTICS
#

# Get column names first
names = fl.columns

#Standardize
scaler = preprocessing.StandardScaler() # Create the Scaler object
standardized_fl = scaler.fit_transform(fl) # Fit your data on the scaler object
standardized_fl = pd.DataFrame(standardized_fl, columns=names)

#Normalize
min_max_scaler = preprocessing.MinMaxScaler()
x_scaled = min_max_scaler.fit_transform(fl)
normalized_fl = pd.DataFrame(x_scaled, columns=names)

#Extract actual quantiles
fl_quartiles = fl.quantile([.25, .5, .75, 1])
fl_means = fl.mean()
fl_stds = fl.std()
fl_vars = fl.var()
fl_norm_var=normalized_fl.var()

# print("Quartiles: ", fl_quartiles)
# print("Means: ", fl_means)
# print("STDS: ", fl_stds)
# print("Vars: ", fl_vars)
# print("Norm Vars: ", fl_norm_var)

print(fl["Queue"].tolist())