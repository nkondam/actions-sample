import pandas as pd
import json

# Read Excel sheet into a pandas dataframe
df = pd.read_excel('data.xlsx')

# Convert dataframe to a list of dictionaries
records = df.to_dict('records')

# Convert list of dictionaries to a JSON object
json_object = json.dumps(records)

# Print JSON object
print(json_object)
