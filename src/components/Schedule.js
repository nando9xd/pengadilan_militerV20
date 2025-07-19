import React, { useState, useEffect } from 'react';
import { getCases } from '../utils/storage';
import './Schedule.css';

const Schedule = () => {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const fetchCases = () => {
      const storedCases = getCases();
      setCases(storedCases);
    };

    fetchCases();
  }, []);

  return (
    <div className="schedule-container">
      <h2>Hearing Schedule</h2>
      <table className="schedule-table">
        <thead>
          <tr>
            <th>PK</th>
            <th>Perkara</th>
            <th>Tanggal Sidang</th>
            <th>Waktu</th>
            <th>Pengadilan</th>
          </tr>
        </thead>
        <tbody>
          {cases.length > 0 ? (
            cases.map((c, index) => (
              <tr key={index}>
                <td>{c.pk}</td>
                <td>{c.case}</td>
                <td>{c.date}</td>
                <td>{c.time}</td>
                <td>{c.court}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Tidak ada jadwal sidang saat ini.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Schedule;