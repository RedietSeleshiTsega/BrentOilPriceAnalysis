Brent Oil Price Analysis Project
Overview
This project analyzes the impact of major geopolitical and economic events on Brent oil prices from 2012 to 2022. It consists of three tasks:

Task 1: Data Collection and Preparation - Collect and clean Brent oil price data.
Task 2: Change Point Modeling and Insight Generation - Detect structural breaks in price trends using a Bayesian Change Point Model and associate them with key events.
Task 3: Interactive Dashboard - Develop a web-based dashboard to visualize price trends, change points, and events interactively.

The project delivers actionable insights for stakeholders (e.g., investors, policymakers, energy companies) through data analysis and an intuitive visualization tool.
Project Structure
brent-oil-analysis/
├── backend/
│   ├── app.py
│   ├── processed_brent_data.csv
│   └── events_data.csv
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   └── App.css
│   ├── public/
│   └── package.json
├── notebooks/
│   ├── task1_data_preparation.ipynb
│   └── task2_change_point_modeling.ipynb
├── plots/
│   ├── brent_price_plot.png
│   ├── log_returns_plot.png
│   └── change_point_trace.png
└── README.md

Prerequisites

Python 3.x with:
pandas, numpy, matplotlib, pymc, arviz, statsmodels, flask, flask-cors


Node.js and npm (LTS version recommended)
Dependencies for frontend:
recharts, axios, papaparse (optional for CSV export)


Data:
processed_brent_data.csv: Cleaned Brent oil price data (Date, Price, Log_Returns)
events_data.csv: Key events (Date, Event)



Setup Instructions
Backend (Flask)

Navigate to the backend/ directory:cd backend


Install Python dependencies:pip install pandas numpy matplotlib pymc arviz statsmodels flask flask-cors


Ensure processed_brent_data.csv and events_data.csv are in the backend/ directory.
Run the Flask server:python app.py


The server runs on http://localhost:5000.
APIs: /api/prices, /api/change_point, /api/events.



Frontend (React)

Navigate to the frontend/ directory:cd frontend


Install Node.js dependencies:npm install recharts axios


Optional: Install papaparse for CSV export:npm install papaparse




Run the React app:npm start


The app runs on http://localhost:3000.



Notebooks

Navigate to the notebooks/ directory:cd notebooks


Open Jupyter Notebook:jupyter notebook


Run task1_data_preparation.ipynb to clean and process Brent oil price data.
Run task2_change_point_modeling.ipynb to perform Bayesian change point analysis.

Data

Brent Oil Prices (processed_brent_data.csv):
Source: Historical Brent oil price data (e.g., from EIA or Alpha Vantage).
Columns: Date (datetime), Price (USD), Log_Returns (calculated).
Processed in Task 1 to handle missing values and ensure correct formats.


Events (events_data.csv):
Contains 6 key events (2014-2022), e.g., OPEC production cuts, Russia-Ukraine conflict.
Columns: Date (datetime), Event (description).
Example:Date,Event
2014-11-27,OPEC refuses to cut production
2016-11-30,OPEC agrees to production cut
...




Plots:
Stored in plots/ (e.g., brent_price_plot.png, log_returns_plot.png, change_point_trace.png).



Features
Task 1: Data Collection and Preparation

Loads raw Brent oil price data.
Cleans data (handles missing values, converts Date to datetime, ensures Price is numeric).
Computes log returns for modeling.
Saves processed data to backend/processed_brent_data.csv.

Task 2: Change Point Modeling

Performs exploratory data analysis (EDA) with:
Augmented Dickey-Fuller (ADF) test for stationarity.
Visualization of price trends and log returns.


Implements a Bayesian Change Point Model using PyMC to detect a structural break in log returns.
Key result: Change point detected on 2017-10-23, with a shift in mean log returns (e.g., from 0.001 to 0.005).
Associates change point with events (e.g., OPEC production cut on 2016-11-30, noting lagged effects).
Quantifies price impact (e.g., ~16.98% price increase post-change point).
Saves diagnostic plots to plots/.

Task 3: Interactive Dashboard

Backend: Flask APIs to serve price data, change point results, and events.
Frontend: React app with Recharts for visualizations:
Price Chart: Line chart of Brent oil prices with a highlighted change point (orange scatter).
Events Timeline: Scatter chart of key events with tooltips showing event details.
Date Range Filter: Input fields to filter data by start/end dates.
Change Point Details: Text summary of change point date and mean log returns before/after.


Responsive design for desktop, tablet, and mobile.

Usage

Start the Flask backend:cd backend
python app.py


Start the React frontend:cd frontend
npm start


Open http://localhost:3000 in a browser to access the dashboard.
Use the date range filter to explore specific periods.
Hover over events in the timeline to view details.
Review change point analysis below the charts.

Assumptions and Limitations

Assumptions:
Single change point modeled for simplicity.
Log returns follow a normal distribution.
Events have immediate or short-term impacts (within ±30 days).


Limitations:
Correlation between change points and events does not imply causation.
Limited to one change point; multiple breaks may exist.
Event dataset is small (6 events); expand for better coverage.
Excludes macroeconomic factors (e.g., GDP, exchange rates).



Future Work

Incorporate macroeconomic data (e.g., from World Bank or FRED) as covariates.
Use advanced models (e.g., Vector Autoregression, Markov-Switching) for dynamic analysis.
Add real-time data integration via external APIs (e.g., Alpha Vantage).
Enhance dashboard with event highlighting and CSV export features.

Deployment (Optional)

Backend: Deploy on Heroku:cd backend
pip freeze > requirements.txt
echo "web: gunicorn app:app" > Procfile
heroku create
git push heroku main


Frontend: Deploy on Netlify:cd frontend
npm run build

Upload the build/ folder to Netlify.

Contributing

Expand the event dataset in events_data.csv with additional 2017-2018 events.
Improve model robustness by detecting multiple change points.
Add advanced visualizations (e.g., volatility plots, event impact windows).

License
This project is for educational and professional use. Contact the project owner for licensing details.
