import React from 'react';
import './styles/dashboard.css';
import HearingsWidget from './HearingsWidget';
import QueueWidget from './QueueWidget';
import LocationWidget from './LocationWidget';
import NotificationsWidget from './NotificationsWidget';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">eSidang Dashboard</h1>
      <div className="dashboard-widgets">
        <HearingsWidget />
        <QueueWidget />
        <LocationWidget />
        <NotificationsWidget />
      </div>
    </div>
  );
};

export default Dashboard;