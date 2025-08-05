# **Brent Oil Price Analysis Project**

## **Overview**

This project analyzes the impact of major **geopolitical** and **economic events** on Brent oil prices from **2012 to 2022**.
It consists of three main tasks:

1. **Task 1: Data Collection and Preparation**

   * Collect and clean Brent oil price data.
2. **Task 2: Change Point Modeling and Insight Generation**

   * Detect structural breaks in price trends using a **Bayesian Change Point Model** and associate them with key events.
3. **Task 3: Interactive Dashboard**

   * Develop a **web-based dashboard** to visualize price trends, change points, and events interactively.

The project delivers **actionable insights** for stakeholders such as investors, policymakers, and energy companies through **data analysis** and an **intuitive visualization tool**.

---

## **Project Structure**

```
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
```

---

## **Prerequisites**

### **Backend (Python 3.x)**

* `pandas`
* `numpy`
* `matplotlib`
* `pymc`
* `arviz`
* `statsmodels`
* `flask`
* `flask-cors`

### **Frontend (Node.js & npm)**

* `recharts`
* `axios`
* `papaparse` *(optional for CSV export)*

---

## **Data**

### **1. Brent Oil Prices (`processed_brent_data.csv`)**

* **Source**: Historical Brent oil price data (e.g., from EIA or Alpha Vantage).
* **Columns**:

  * `Date` (datetime)
  * `Price` (USD)
  * `Log_Returns` (calculated)
* **Pre-processing**: Missing value handling, datetime formatting, and numeric type enforcement.

### **2. Events (`events_data.csv`)**

* Contains **6 key events (2014–2022)**, e.g., OPEC production cuts, Russia-Ukraine conflict.
* **Columns**:

  * `Date` (datetime)
  * `Event` (description)
* **Example**:

  ```
  Date,Event
  2014-11-27,OPEC refuses to cut production
  2016-11-30,OPEC agrees to production cut
  ```

### **3. Plots** (stored in `plots/`)

* `brent_price_plot.png`
* `log_returns_plot.png`
* `change_point_trace.png`

---

## **Setup Instructions**

### **1. Backend (Flask)**

```bash
cd backend
pip install pandas numpy matplotlib pymc arviz statsmodels flask flask-cors
python app.py
```

* Server runs at: **[http://localhost:5000](http://localhost:5000)**
* **APIs**:

  * `/api/prices`
  * `/api/change_point`
  * `/api/events`

### **2. Frontend (React)**

```bash
cd frontend
npm install recharts axios
# Optional for CSV export
npm install papaparse
npm start
```

* App runs at: **[http://localhost:3000](http://localhost:3000)**

### **3. Notebooks (Data Preparation & Modeling)**

```bash
cd notebooks
jupyter notebook
```

* Run:

  * `task1_data_preparation.ipynb` (Data Cleaning)
  * `task2_change_point_modeling.ipynb` (Change Point Analysis)

---

## **Features**

### **Task 1: Data Collection and Preparation**

* Load raw Brent oil price data.
* Clean data (handle missing values, datetime conversion, numeric price validation).
* Compute **log returns**.
* Save processed data to: `backend/processed_brent_data.csv`.

### **Task 2: Change Point Modeling**

* **Exploratory Data Analysis (EDA)**:

  * Augmented Dickey-Fuller (ADF) test for stationarity.
  * Visualization of price trends and log returns.
* **Bayesian Change Point Model (PyMC)**:

  * Detects structural break in log returns.
  * **Result**: Change point detected on **2017-10-23**, indicating a shift in mean log returns (e.g., from `0.001` → `0.005`).
* **Impact Quantification**:

  * \~16.98% price increase post-change point.
* **Events Association**:

  * Linked to OPEC production cut on **2016-11-30** (lagged effects considered).
* Plots saved to: `plots/`.

### **Task 3: Interactive Dashboard**

* **Backend**: Flask APIs serve data and model results.
* **Frontend (React + Recharts)**:

  * **Price Chart**: Brent oil prices (line chart) with highlighted change point (orange marker).
  * **Events Timeline**: Scatter chart with event tooltips.
  * **Date Range Filter**: Start & end date selection.
  * **Change Point Summary**: Text-based insights.
* **Responsive Design** for mobile, tablet, and desktop.

---

## **Usage**

```bash
# Start Backend
cd backend
python app.py

# Start Frontend
cd frontend
npm start
```

* Open: **[http://localhost:3000](http://localhost:3000)**
* Use the **date range filter** to explore specific periods.
* Hover over events for details.
* Review change point analysis below charts.

---

## **Assumptions & Limitations**

### **Assumptions**

* Single change point modeled (for simplicity).
* Log returns follow a **normal distribution**.
* Events have **immediate or short-term impacts** (±30 days).

### **Limitations**

* Correlation does **not imply causation**.
* Only one change point analyzed; multiple may exist.
* Event dataset is **small (6 events)** – expanding is recommended.
* Excludes **macroeconomic factors** (GDP, exchange rates, etc.).

---

## **Future Work**

* Add **macroeconomic data** (World Bank, FRED) as covariates.
* Use advanced models:

  * **Vector Autoregression (VAR)**
  * **Markov-Switching Models**
* Real-time data integration via APIs (e.g., Alpha Vantage).
* Enhance dashboard:

  * **Event highlighting**
  * **CSV export**

---

## **Deployment (Optional)**

### **Backend (Heroku)**

```bash
cd backend
pip freeze > requirements.txt
echo "web: gunicorn app:app" > Procfile
heroku create
git push heroku main
```

### **Frontend (Netlify)**

```bash
cd frontend
npm run build
```

Upload `build/` folder to **Netlify**.

---

## **Contributing**

* Expand `events_data.csv` (e.g., 2017–2018 events).
* Improve model robustness (detect multiple change points).
* Add advanced visualizations (e.g., volatility plots, event impact windows).

---

## **License**

This project is for **educational and professional use**.
Contact the project owner for **licensing details**.



