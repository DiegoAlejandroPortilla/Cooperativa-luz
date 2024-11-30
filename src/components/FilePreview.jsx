import React, { useState } from 'react';
import './FilePreview.css'; // Asegúrate de tener los estilos CSS en este archivo
import pdfIcon from '../assets/pdf-icon.png';

const FilePreview = ({ fileName, pdfFile }) => {
  const [showPreview, setShowPreview] = useState(false);

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  return (
    <div className="file-container">
      <p>{fileName}</p>
      <img src={pdfIcon} alt="PDF Icon" className="pdf-icon" /> {/* Ícono */}
      <button onClick={handlePreview}>Visualizar</button>

      {showPreview && (
        <div className="file-preview">
          <iframe src={pdfFile} type="application/pdf" title={fileName} className="file-iframe"></iframe> {/* Utiliza el archivo PDF importado */}
          <button className="download-cerrar" onClick={handleClosePreview}>Cerrar</button>
          <a href={pdfFile} download className="download-button">
            Descargar
          </a>
        </div>
      )}
    </div>
  );
};

export default FilePreview;
