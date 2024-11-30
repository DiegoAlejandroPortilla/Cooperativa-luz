import React from 'react';
import './styles.css';
import VentanaInformacion from '../components/Ventana.jsx';

const Inicio = () => {
  return (
    <div className='inicio'>
      <video className='video-background' autoPlay muted loop>
      <source src={require('../assets/video.mp4')} type="video/mp4" />
      </video>
      <div className='video-overlay'>
        <div className='recuadro-blanco-titulo'>
          <h2>Concurso de Méritos y Oposición 2023</h2>
          <h1>Trabaja con nosotros</h1>
          <button onClick={() => window.location.href = '/login'}>Comenzar</button>
        </div>
        <div className='boton-info'>
          <VentanaInformacion />
        </div>
      </div>
    </div>
  );
};

export default Inicio;
