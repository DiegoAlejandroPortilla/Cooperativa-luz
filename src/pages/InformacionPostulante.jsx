import React, { useState } from 'react';
import './styles.css';
import Menu from '../components/MenuCandidato';
import TopBar from '../components/TopBar';
import Document from '../components/Document'
import DocumentsList from '../components/DocumentsList'
import { FiUnlock, FiLock } from 'react-icons/fi';

const Plataforma = () => {
  const [files, setFiles] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const handleFileChange = (e, field) => {
    const selectedFile = e.target.files[0];
    setFiles({
      ...files,
      [field]: selectedFile,
    });

    getNumPages(selectedFile, field);
  };

  const getNumPages = async (file, field) => {
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      let numPages = 0;

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

  const renderDocumentRow = (documentName, fieldName) => (
    <tr key={fieldName}>
      <td>{documentName}</td>
      <td>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => handleFileChange(e, fieldName)}
        />
      </td>
      <td>{files[`${fieldName}-pages`] ? files[`${fieldName}-pages`] - 2 : 0}</td>
    </tr>
  );

  return (
    <div className="parent-container">
      <div className="plataforma-container">
        <div className="top-item">
          <TopBar
            title="Información del postulante"
          ></TopBar>
        </div>
        <div className="left-item">
          <Menu
            title='Usuarios'
            
          ></Menu>
        </div>
        <div className="right-item">
          <DocumentsList title='Información de postulación'>
          </DocumentsList>
        </div>
        <video className="background-video" autoPlay loop muted>
          <source src={require('../assets/inicio.mp4')} type="video/mp4" />
          Tu navegador no admite la reproducción de videos.
        </video>
      </div>
    </div>
  );
};

export default Plataforma;
