import React, { useState, useEffect } from 'react';

const Summons = () => {
  const [summons, setSummons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch summons data from local storage or an API
    const fetchSummons = () => {
      const storedSummons = JSON.parse(localStorage.getItem('summons')) || [];
      setSummons(storedSummons);
      setLoading(false);
    };

    fetchSummons();
  }, []);

  const handleNotify = (summon) => {
    // Logic for audio notification or alert
    alert(`Notification for Summons: ${summon.caseName}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="summons-widget">
      <h2>Digital Summons</h2>
      <ul>
        {summons.map((summon, index) => (
          <li key={index} onClick={() => handleNotify(summon)}>
            <strong>Case:</strong> {summon.caseName} | <strong>Date:</strong> {summon.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Summons;