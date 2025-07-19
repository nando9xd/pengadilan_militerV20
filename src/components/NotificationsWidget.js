import React from 'react';

const NotificationsWidget = () => {
  const notifications = [
    { id: 1, message: 'Hearing scheduled for case #1234 at 10:00 AM in Courtroom A.' },
    { id: 2, message: 'Reminder: Submit documents for case #5678 by 5:00 PM today.' },
    { id: 3, message: 'New summons issued for defendant John Doe.' },
  ];

  return (
    <div className="notifications-widget">
      <h2>Notifications</h2>
      <ul>
        {notifications.map(notification => (
          <li key={notification.id}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsWidget;