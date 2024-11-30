import React, { useContext } from 'react';
import './styles.css';
import Menu from '../components/MenuCandidato';
import TopBar from '../components/TopBar';
import Document from '../components/Document'
import DocumentsList from '../components/DocumentsList'
import { FiUnlock, FiLock } from 'react-icons/fi';

const Plataforma = () => {
  const url = `http://127.0.0.1:8001/obtener_documento/?id_usuario=28&doc_idx=1`;

  return (

    <div className="parent-container">
      <div className="plataforma-container">
        <div className="top-item">
        <TopBar
          title="Información del postulante"
          ></TopBar>
                  <div>
            <iframe src={url} width="100%" height="600px"></iframe>
        </div>
        </div>
        <div className="left-item">
          <Menu
            title='Usuarios'
            subtitle1='Información del postulante'
            subtitle2='Seleccionar postulación'
            subtitle3='Formatos de Archivos'
            icon1={<FiUnlock />}
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
