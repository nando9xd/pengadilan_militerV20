import React from 'react';

const HearingsWidget = () => {
  const [hearings, setHearings] = React.useState([]);

  React.useEffect(() => {
    // Fetch today's hearings from local storage or an API
    const fetchHearings = () => {
      const storedHearings = JSON.parse(localStorage.getItem('hearings')) || [];
      const today = new Date().toISOString().split('T')[0];
      const todaysHearings = storedHearings.filter(hearing => hearing.date === today);
      setHearings(todaysHearings);
    };

    fetchHearings();
  }, []);

  return (
    <div className="hearings-widget">
      <h2>Today's Hearings</h2>
      {hearings.length === 0 ? (
        <p>No hearings scheduled for today.</p>
      ) : (
        <ul>
          {hearings.map((hearing, index) => (
            <li key={index}>
              <strong>{hearing.time}</strong> - {hearing.caseName} in {hearing.courtroom}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HearingsWidget;