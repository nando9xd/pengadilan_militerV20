import React from 'react';

const QueueWidget = () => {
  const [currentQueue, setCurrentQueue] = React.useState([]);

  React.useEffect(() => {
    // Fetch the current case queue from an API or local storage
    const fetchQueue = async () => {
      // Placeholder for fetching logic
      const queueData = [
        { id: 1, caseNumber: 'PK123', status: 'Active' },
        { id: 2, caseNumber: 'PK124', status: 'Next' },
      ];
      setCurrentQueue(queueData);
    };

    fetchQueue();
  }, []);

  return (
    <div className="queue-widget">
      <h2>Current Case Queue</h2>
      <ul>
        {currentQueue.map((caseItem) => (
          <li key={caseItem.id}>
            <span>{caseItem.caseNumber}</span> - <span>{caseItem.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QueueWidget;