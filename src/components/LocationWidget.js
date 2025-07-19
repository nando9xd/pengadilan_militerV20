import React from 'react';

const LocationWidget = () => {
  return (
    <div className="location-widget">
      <h2>Lokasi Ruang Sidang</h2>
      <p>Ruang Sidang: <strong>Ruang 1A</strong></p>
      <p>Alamat: <strong>Jl. Pengadilan No. 123, Jakarta</strong></p>
      <div id="map" style={{ height: '200px', width: '100%', backgroundColor: '#e0e0e0' }}>
        {/* Map integration can be added here */}
      </div>
    </div>
  );
};

export default LocationWidget;