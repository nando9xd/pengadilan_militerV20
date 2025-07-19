import React from 'react';
import NotificationsWidget from './NotificationsWidget';
import Documents from './Documents';

const MobileView = () => {
  return (
    <div className="mobile-view">
      <h1>eSidang Mobile</h1>
      <NotificationsWidget />
      <Documents />
      <div className="mobile-footer">
        <p>Access your documents and stay updated on notifications.</p>
      </div>
    </div>
  );
};

export default MobileView;