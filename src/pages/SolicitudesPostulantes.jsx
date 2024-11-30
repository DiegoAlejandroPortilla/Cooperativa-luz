import React, { useContext, useEffect } from 'react';
import './styles.css';
import MenuRRHH from '../components/MenuRRHH';
import TopBar from '../components/TopBar';
import CustomComponentSolicitudes from '../components/CustomComponentSolicitudes'
import { useAuth } from "../context/AuthContext";

const SolicitudesPostulantes = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="parent-container">
      <div className="plataforma-container">
        <div className="top-item">
          <TopBar
          title="Solicitudes Postulantes"
          ></TopBar>
        </div>
        <div className="left-item">
          <MenuRRHH
            title='Usuario'
            subtitle1='Solicitudes'
            subtitle2='Información postulación'
            subtitle3='Información personal'
            ></MenuRRHH>
        </div>
        <div className="right-item">
          <CustomComponentSolicitudes
            title='Solicitudes de Postulantes'
          ></CustomComponentSolicitudes>
        </div>
        <video className="background-video" autoPlay loop muted>
          <source src={require('../assets/inicio.mp4')} type="video/mp4" />
          Tu navegador no admite la reproducción de videos.
        </video>
      </div>
    </div>
  );
};

export default SolicitudesPostulantes;