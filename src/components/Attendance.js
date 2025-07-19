import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { getAttendanceData, saveAttendanceData } from '../utils/storage';

const Attendance = () => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [qrCodeValue, setQrCodeValue] = useState('');

  useEffect(() => {
    const data = getAttendanceData();
    setAttendanceList(data);
  }, []);

  const handleAttendance = (participantId) => {
    const updatedList = [...attendanceList, { id: participantId, timestamp: new Date().toISOString() }];
    setAttendanceList(updatedList);
    saveAttendanceData(updatedList);
  };

  const handleQRCodeChange = (e) => {
    setQrCodeValue(e.target.value);
  };

  const handleQRCodeScan = () => {
    if (qrCodeValue) {
      handleAttendance(qrCodeValue);
      setQrCodeValue('');
    }
  };

  return (
    <div className="attendance-container">
      <h2>Attendance Tracking</h2>
      <div className="qr-code-section">
        <input
          type="text"
          value={qrCodeValue}
          onChange={handleQRCodeChange}
          placeholder="Scan QR Code or Enter ID"
        />
        <button onClick={handleQRCodeScan}>Mark Attendance</button>
      </div>
      <div className="attendance-list">
        <h3>Attendance List</h3>
        <ul>
          {attendanceList.map((entry, index) => (
            <li key={index}>
              ID: {entry.id} - Time: {new Date(entry.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
      <div className="qr-code-display">
        <QRCode value={qrCodeValue} />
      </div>
    </div>
  );
};

export default Attendance;