import React from 'react';
import './style.css';

const PopupLey = ({titulo, mensaje, ruta, onClose }) => {
  const handleAceptar = () => {
    onClose();
    window.location.href = ruta;
  };

  const handleLeerMas = () => {
    window.location.href = "https://www.registrospublicos.gob.ec/programas-servicios/servicios/proyecto-de-ley-de-proteccion-de-datos/#:~:text=En%20Ecuador%20el%20art%C3%ADculo%2066,as%C3%AD%20como%20su%20correspondiente%20protecci%C3%B3n.";
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <h1>{titulo}</h1>
        <p>{mensaje}</p>
        <button onClick={handleAceptar}>Aceptar</button>
        <button onClick={handleLeerMas}>Leer Más</button>
      </div>
    </div>
  );
};

export default PopupLey;
