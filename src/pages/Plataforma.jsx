import React from 'react';
import './styles.css';
import WelcomeBanner from '../components/Bienvenida';

const Plataforma = () => {
  return (
    <div className="plataforma-container">
      <WelcomeBanner />
      <video className="background-video" autoPlay loop muted>
        <source src={require('../assets/inicio.mp4')} type="video/mp4" />
        {/* Agrega más etiquetas <source> para otros formatos de video si es necesario */}
        Tu navegador no admite la reproducción de videos.
      </video>
      <div className="seccion-informacion">
        <h1>LLENAR LA SIGUIENTE INFORMACIÓN</h1>
        <button onClick={() => window.location.href = '/postulante'}>INFORMACIÓN DEL POSTULANTE</button>
        <button onClick={() => window.location.href = '/proceso'}>SELECCIONAR POSTULACIÓN</button>
      </div>
      <div className="estados">
        <p>COMPLETADO</p>
        <p>POR COMPLETAR</p>
      </div>
    </div>
  );
};

export default Plataforma;
