import React from 'react';
import './style.css';

const PopupCedula = ({titulo,  mensaje, onClose }) => {
  const handleAceptar = () => {
    onClose();
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

export default PopupCedula;