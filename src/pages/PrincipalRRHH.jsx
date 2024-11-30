import React, { useContext, useEffect } from 'react';
import './styles.css';
import MenuRRHH from '../components/MenuRRHH';
import TopBar from '../components/TopBar';
import CustomComponent from '../components/CustomComponent'
import { FiUpload, FiFolder, FiUnlock, FiLock } from 'react-icons/fi';
import { useAuth } from "../context/AuthContext";

const PrincipalRRHH = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="parent-container">
      <div className="plataforma-container">
        <div className="top-item">
        <TopBar
            title="Inicio"
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
          <CustomComponent
            title='Solicitudes de Postulantes'
            subtitle1='Anexe su información'
            subtitle2='Seleccione la postulación'
            icon1={<FiUpload />}
            icon2={<FiFolder />}
          ></CustomComponent>
        </div>
        <video className="background-video" autoPlay loop muted>
          <source src={require('../assets/inicio.mp4')} type="video/mp4" />
          Tu navegador no admite la reproducción de videos.
        </video>
      </div>
    </div>
  );
};

export default PrincipalRRHH;
