import React, { useState, useEffect } from 'react';

function App() {
  const [datetime, setDatetime] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(null);
  const baseUrl = process.env.REACT_APP_API_URL;

  const getCurrentDatetime = () => {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    return (
      now.getFullYear().toString() +
      pad(now.getMonth() + 1) +
      pad(now.getDate()) +
      pad(now.getHours()) +
      '00'
    );
  };

  const fetchImage = (dt) => {
    fetch(`${baseUrl}/api/get_weather?datetime=${dt}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.blob();
      })
      .then(blob => {
        setImageUrl(URL.createObjectURL(blob));
        setError(null);
      })
      .catch(err => {
        setImageUrl('');
        setError("Could not load image");
      });
  };

  useEffect(() => {
    const current = getCurrentDatetime();
    setDatetime(current);
    fetchImage(current);
  }, []);

  const handleChange = (e) => setDatetime(e.target.value);

  const handleRefresh = () => fetchImage(datetime);

  return (
    <div style={{ padding: 20 }}>
      <h1>Weather Radar Viewer</h1>
      <input
        placeholder="YYYYMMDDHHMM"
        value={datetime}
        onChange={handleChange}
        style={{ marginRight: 10 }}
      />
      <button onClick={handleRefresh}>Refresh Image</button>

      <div style={{ marginTop: 20 }}>
        {imageUrl && <img src={imageUrl} alt="Radar" />}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
}

export default App;
