import React, { useContext, useEffect } from 'react';
import './styles.css';
import Menu from '../components/MenuCandidato';
import TopBar from '../components/TopBar';
import CustomComponentRh from '../components/CustomComponentRh'

import { useAuth } from "../context/AuthContext";
const Plataforma = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="parent-container">
      <div className="plataforma-container">
        <div className="top-item">
          <TopBar>
          </TopBar>
        </div>
        <div className="left-item">
          <Menu
            title='Usuarios'
            subtitle1='Información del postulante'
            subtitle2='Seleccionar postulación'
            subtitle3='Formatos de Archivos'
            ></Menu>
        </div>
        <div className="right-item">
        <CustomComponentRh
            title='Bienvenidos a la plataforma ESPE docentes'
            subtitle1='De Solicitud'
            subtitle2='Seleccione la postulación'
            
          ></CustomComponentRh>
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
