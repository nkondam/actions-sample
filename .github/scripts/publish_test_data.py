import pandas as pd
import json

# Read Excel sheet into a pandas dataframe
df = pd.read_excel('./variables/data.xlsx')

# Convert timestamps to strings
# df['date_column'] = df['date_column'].astype(str)

# Convert dataframe to a list of dictionaries
records = df.to_dict('records')

# Convert list of dictionaries to a JSON object
json_object = json.dumps(records)

# Print JSON object
print(json_object)
