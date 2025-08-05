from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app) 

try:
    brent_df = pd.read_csv('processed_brent_data.csv')
    brent_df['Date'] = pd.to_datetime(brent_df['Date'])
    events = pd.read_csv('events_data.csv')
    events['Date'] = pd.to_datetime(events['Date'])
except FileNotFoundError as e:
    print(f"Error: {e}. Please ensure data files are in the backend directory.")
    exit(1)
except Exception as e:
    print(f"Error loading data: {e}")
    exit(1)

@app.route('/')
def home():
    return "Welcome to the Brent Oil Price Dashboard API. Use /api/prices, /api/change_point, or /api/events."

@app.route('/api/prices', methods=['GET'])
def get_prices():
    columns = ['Date', 'Price']
    if 'Rolling_Mean' in brent_df.columns:
        columns.append('Rolling_Mean')
    if 'Rolling_Std' in brent_df.columns:
        columns.append('Rolling_Std')
    data = brent_df[columns].to_dict(orient='records')
    for d in data:
        d['Date'] = d['Date'].isoformat()
    return jsonify(data)

@app.route('/api/change_point', methods=['GET'])
def get_change_point():
    change_point = {
        'date': '2017-10-23',
        'mean_before': 0.001,  
        'mean_after': 0.005   
    }
    return jsonify(change_point)

@app.route('/api/events', methods=['GET'])
def get_events():
    data = events[['Date', 'Event']].to_dict(orient='records')
    for d in data:
        d['Date'] = d['Date'].isoformat()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)