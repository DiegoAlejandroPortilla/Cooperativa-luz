import React, { useState } from 'react';
// import FilePreview from './FilePreview';
import documento from '../assets/prueba.png';
import Popup from '../components/Popup';
import './PopupCalificacion.css'; // Asegúrate de tener los estilos CSS en este archivo
// import { image } from '@nextui-org/theme';
const PopupCalificacion = ({ show, onClose, title, subtitle, candidato, calificaciones, onConfirm, onCancel }) => {
  const [showPopup2, setShowPopup2] = useState(false);
   // Función para abrir la ventana emergente
   const handleOpenPopup = () => {
    setShowPopup2(true);

};
const handleAccept = () =>{
    setShowPopup2(true);
};

// Función para cerrar la ventana emergente
const handleClosePopup = () => {
    setShowPopup2(false);
};

console.log("candidato")
console.log(candidato)

    return show ? (
      <div className="popupdoc-overlay">
        <div className="popupdoc-container">
          <button className="popupdoc-button-close" onClick={onClose}>X</button>
          <h1 className="popupdoc-title">{title}</h1>
          <h2 className="popupdoc-title">{subtitle}</h2>
          <div className="popupdoc-content">
            <div className="candidato-section">
              <h3>Candidato</h3>
              <div className="candidato-info">
                <img src={documento} alt="h" className="candidato-img" />
                <div>
                  <p>{candidato[8] +" "+candidato[10] }</p>
                  <p>{candidato[6]}</p>
                </div>
              </div>
            </div>
            <div className="calificaciones-section">
                <div className="calificaciones-columns">
                    <div className="calificaciones-parametros">           
                        <h3>Parámetros</h3>
                        {calificaciones.map((calificacion, index) => (
                            <p className='parametro-p' key={index}>{calificacion.documento_nombre}</p>
                        ))}
                        
                    </div>
                    <div className="calificaciones-puntajes">
                        <h3>Calificaciones</h3>
                        {calificaciones.map((calificacion, index) => (
                            <p className='puntaje-p' key={index}>{calificacion.calificacion}</p>
                        ))}
                    </div>
                </div>
            </div>
          </div>
          <div className="buttons-pop">
          <button className="button-calificacion" onClick={handleAccept}>
              Si, calificar
            </button>
                {showPopup2 && (
                    <Popup
                        titulo="DATOS SUBIDOS CORRECTAMENTE"
                        ruta="/solicitudesPostulantes"
                        onClose={handleClosePopup}
                    />
                )}
            <button className="button-calificacion" onClick={onClose}>
            No, volver
            </button>
            </div>
        </div>
      </div>
    ) : null;
  };
  
  

export default PopupCalificacion;
