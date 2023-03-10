import pandas as pd
import requests

excel_data = pd.read_excel('../variables/input.xlsx')

# Convert Excel data to JSON
json_data = excel_data.to_json(orient='records')

# Set headers and payload for POST request
headers = {'Content-Type': 'application/json', 'Authorization': f'Bearer {API_KEY}'}
payload = json_data

# Send POST request
response = requests.post(API_URL, headers=headers, data=payload)

# Print response
print(response.text)