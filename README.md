# eSidang - Court Session Management Application

eSidang is an offline-capable web application designed for managing court sessions efficiently. It provides a user-friendly dashboard that allows court officials and participants to access essential information and functionalities related to court hearings.

## Features

- **Today's Hearings**: View the schedule of hearings for the day, including time and courtroom details.
- **Current Case Queue**: Monitor the active and upcoming cases in the queue.
- **Courtroom Location**: Display the location of the courtroom, potentially integrating a map for easy navigation.
- **Notifications**: Receive alerts for court summons and important updates.
- **Scheduling**: Manage and schedule hearings with ease.
- **Digital Summons**: Handle digital summons with display and audio notifications.
- **Attendance Tracking**: Track attendance using QR code scanning and real-time data entry.
- **Document Management**: Upload, download, and preview legal documents.
- **Mobile Version**: Access a mobile-friendly version of the application for participants, ensuring they receive notifications and can access documents on the go.

## Project Structure

```
eSidang
├── public
│   ├── index.html
│   ├── manifest.json
│   └── service-worker.js
├── src
│   ├── app.js
│   ├── styles
│   │   └── dashboard.css
│   ├── components
│   │   ├── Dashboard.js
│   │   ├── HearingsWidget.js
│   │   ├── QueueWidget.js
│   │   ├── LocationWidget.js
│   │   ├── NotificationsWidget.js
│   │   ├── Schedule.js
│   │   ├── Summons.js
│   │   ├── Attendance.js
│   │   ├── Documents.js
│   │   └── MobileView.js
│   └── utils
│       └── storage.js
├── package.json
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd eSidang
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Start the application:
   ```
   npm start
   ```

## Usage

Once the application is running, access it through your web browser. The dashboard will provide an overview of today's hearings, case queues, and other functionalities. 

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.