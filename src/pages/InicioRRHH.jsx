import React, { useContext, useEffect } from 'react';
import './styles.css';
import MenuRRHH from '../components/MenuRRHH';
import TopBar from '../components/TopBar';
import CustomComponentInicio from '../components/CustomComponentInicio'
import { useAuth } from "../context/AuthContext";

const InicioRRHH = () => {
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
            subtitle3='Información personal'
            ></MenuRRHH>
        </div>
        <div className="right-item">
          <CustomComponentInicio
            title='Bienvenidos a la plataforma de Luz del valle'
            numeroDeSolicitudes = "9"
          ></CustomComponentInicio>
        </div>
      </div>
    </div>
  );
};

export default InicioRRHH;