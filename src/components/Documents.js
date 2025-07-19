import React, { useState } from 'react';

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      const newDocuments = [...documents, file];
      setDocuments(newDocuments);
      setFile(null);
      // Here you would typically also handle the upload to a server or storage
    }
  };

  const handleDownload = (doc) => {
    const url = URL.createObjectURL(doc);
    const a = document.createElement('a');
    a.href = url;
    a.download = doc.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePreview = (doc) => {
    const url = URL.createObjectURL(doc);
    window.open(url, '_blank');
    URL.revokeObjectURL(url);
  };

  return (
    <div className="documents-container">
      <h2>Document Management</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Document</button>
      <ul>
        {documents.map((doc, index) => (
          <li key={index}>
            {doc.name}
            <button onClick={() => handleDownload(doc)}>Download</button>
            <button onClick={() => handlePreview(doc)}>Preview</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Documents;