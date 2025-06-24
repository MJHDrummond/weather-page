import React, { useState, useEffect } from 'react';
import { getCurrentDatetime, getEarlierDatetime } from './helpers/datetime';
import './App.css';

function App() {
  const [datetime, setDatetime] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(null);
  const baseUrl = process.env.REACT_APP_API_URL;

  const fetchImage = async (dt, retry = true) => {
    try {
      const res = await fetch(`${baseUrl}/api/get_weather?datetime=${dt}`)
      const contentType = res.headers.get("content-type");

      if (contentType && contentType.includes("application/json")){
        if (retry) {
          const retryDatetime = getEarlierDatetime(dt, 10);
          setError("Could not load image, retrying with earlier time")
          setImageUrl('');
          return fetchImage(retryDatetime, true);
        } else {
          throw new Error("Stopping retry")
        }
      } else {
        const blob = await res.blob();
        setImageUrl(URL.createObjectURL(blob));
        setError(null);
      }
    } catch (err) {
      setImageUrl('');
      if (retry){
        setError("Could not load image, retrying with earlier time")
      } else {
        setError("Could not load image, try choosing a new time");
      }
    }
  };

  useEffect(() => {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const formatted = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
    setDatetime(formatted);
  }, []);

  useEffect(() => {
    if (datetime) {
      fetchImage(getCurrentDatetime());
      }
  }, [datetime]);

  const handleChange = (e) => setDatetime(e.target.value);

  const handleRefresh = () => fetchImage(datetime);

  return (
    <main className="weather-app">
      <h1 className="weather-title">Live Weather Radar</h1>

      <div className="datetime-input">
        <label htmlFor="datetime">Choose time: </label>
        <input
          type="datetime-local"
          id="datetime"
          name="datetime"
          value={datetime}
          onChange={handleChange}
        />
      </div>

      {imageUrl && <img src={imageUrl} alt="Weather Radar" className="radar-image" />}

      {error && <div className="error-message">{error}</div>}
    </main>
  );
}

export default App;
