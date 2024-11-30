import React, { useState } from 'react';
import './Document.css';

const FileUpload = ({ title }) => {
  const [files, setFiles] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  // Función para manejar el cambio en el input de archivo
  const handleFileChange = (e, field) => {
    const selectedFile = e.target.files[0];
    setFiles({
      ...files,
      [field]: selectedFile,
    });

    // Obtener el número de páginas del archivo PDF
    getNumPages(selectedFile, field);
  };

  // Función para obtener el número de páginas del archivo PDF
  const getNumPages = async (file, field) => {
    if (file) {
      const arrayBuffer = await file.arrayBuffer(); // Convertir el archivo en un ArrayBuffer
      const uint8Array = new Uint8Array(arrayBuffer);
      let numPages = 0;
      // Buscar referencias a las páginas (identificador "/Page")
      for (let i = 0; i < uint8Array.length - 4; i++) {
        if (
          String.fromCharCode(uint8Array[i]) === '/' &&
          String.fromCharCode(uint8Array[i + 1]) === 'P' &&
          String.fromCharCode(uint8Array[i + 2]) === 'a' &&
          String.fromCharCode(uint8Array[i + 3]) === 'g' &&
          String.fromCharCode(uint8Array[i + 4]) === 'e'
        ) {
          numPages++;
        }
      }

      setFiles({
        ...files,
        [`${field}-pages`]: numPages,
      });
    }
  };

  const handleAccept = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };


  return (
    <div className="file-upload">
      <p className="title" style={{ flex: 2 }}>{title}</p>
      <input type="file" style={{ flex: 3 }} accept=".pdf" onChange={(e) => handleFileChange(e, 'docuement')} />
      <p style={{ flex: 1 }}>{files['docuement-pages'] - 2 || 0}</p>
    </div>

  );
};

export default FileUpload;
