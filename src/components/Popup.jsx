import React from 'react';
import './style.css';

const Popup = ({titulo,  mensaje, ruta, onClose }) => {
  const handleAceptar = () => {
    onClose();
    window.location.href = ruta;
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <h1>{titulo}</h1>
        <p>{mensaje}</p>
        <button onClick={handleAceptar}>Aceptar</button>
      </div>
    </div>
  );
};

export default Popup;