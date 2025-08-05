import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ScatterChart, Scatter } from 'recharts';
import axios from 'axios';
import './App.css';

function App() {
  const [priceData, setPriceData] = useState([]);
  const [changePoint, setChangePoint] = useState(null);
  const [events, setEvents] = useState([]);
  const [dateRange, setDateRange] = useState({ start: '2012-01-01', end: '2022-12-31' });

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/prices')
      .then(res => setPriceData(res.data.map(d => ({ ...d, Date: new Date(d.Date).getTime() }))))
      .catch(err => console.error('Error fetching prices:', err));

    axios.get('http://127.0.0.1:5000/api/change_point')
      .then(res => setChangePoint(res.data))
      .catch(err => console.error('Error fetching change point:', err));

    axios.get('http://127.0.0.1:5000/api/events')
      .then(res => setEvents(res.data.map(d => ({ ...d, Date: new Date(d.Date).getTime() }))))
      .catch(err => console.error('Error fetching events:', err));
  }, []);

  const filteredData = priceData.filter(d => {
    const date = new Date(d.Date);
    return date >= new Date(dateRange.start) && date <= new Date(dateRange.end);
  });

  const handleDateChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };

  return (
    <div className="App">
      <h1>Brent Oil Price Dashboard</h1>
      <div className="filter">
        <label>Start Date: </label>
        <input type="date" name="start" value={dateRange.start} onChange={handleDateChange} />
        <label>End Date: </label>
        <input type="date" name="end" value={dateRange.end} onChange={handleDateChange} />
      </div>
      <h2>Historical Brent Oil Prices</h2>
      <LineChart width={800} height={400} data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" tickFormatter={(tick) => new Date(tick).toLocaleDateString()} />
        <YAxis />
        <Tooltip formatter={(value) => `$${value.toFixed(2)}`} labelFormatter={(label) => new Date(label).toLocaleDateString()} />
        <Legend />
        <Line type="monotone" dataKey="Price" stroke="#8884d8" name="Price (USD)" />
        {filteredData[0] && 'Rolling_Mean' in filteredData[0] && (
          <Line type="monotone" dataKey="Rolling_Mean" stroke="#82ca9d" name="Rolling Mean" />
        )}
        {changePoint && (
          <Scatter data={[{ Date: new Date(changePoint.date).getTime(), Price: filteredData.find(d => new Date(d.Date).toDateString() === new Date(changePoint.date).toDateString())?.Price }]} fill="#ff7300" name="Change Point" />
        )}
      </LineChart>
      <h2>Key Events</h2>
      <ScatterChart width={800} height={100} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid />
        <XAxis dataKey="Date" tickFormatter={(tick) => new Date(tick).toLocaleDateString()} />
        <YAxis hide />
        <Tooltip content={({ payload }) => payload[0] ? <div>{payload[0].payload.Event} - {new Date(payload[0].payload.Date).toLocaleDateString()}</div> : null} />
        <Scatter data={events} fill="#82ca9d" name="Events" />
      </ScatterChart>
      {changePoint && (
        <div className="change-point-details">
          <h2>Change Point Analysis</h2>
          <p>Change Point Date: {new Date(changePoint.date).toLocaleDateString()}</p>
          <p>Mean Before: {changePoint.mean_before.toFixed(4)}</p>
          <p>Mean After: {changePoint.mean_after.toFixed(4)}</p>
        </div>
      )}
    </div>
  );
}

export default App;