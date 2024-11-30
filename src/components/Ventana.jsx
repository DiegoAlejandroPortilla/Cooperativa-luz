import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const VentanaInformacion = () => {
    const [mostrarVentana, setMostrarVentana] = useState(false);
  
    const handleMostrarVentana = () => {
      setMostrarVentana(!mostrarVentana);
    };
    
    const handleRedireccion = (url) => {
        window.location.href = url;
      };

    return (
      <div className='ventana-contenedor'>
        <button onClick={handleMostrarVentana}>
        <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: '10px' }} />
        Más Información</button>
        {mostrarVentana && (
          <div className="ventana-emergente">
            <h1>CONOCE MÁS ACERCA DEL CONCURSO DE MÉRITOS DE OPOSICIÓN</h1>
            <p onClick={() => handleRedireccion('https://www.espe.edu.ec/campus/')}>NUESTRAS SEDES</p>
          <p onClick={() => handleRedireccion('https://www.espe.edu.ec/campus/')}>BASES DEL CONCURSO 2023</p>
          <p onClick={() => handleRedireccion('https://www.espe.edu.ec/campus/')}>CRONOGRAMA</p>
          </div>
        )}
      </div>
    );
  };

export default VentanaInformacion;
