import React, { useContext, useEffect } from 'react';
import './styles.css';
import Menu from '../components/MenuCandidato';
import TopBar from '../components/TopBar';
import CustomComponent from '../components/CustomComponent'
import { FiUpload, FiFolder, FiUnlock, FiLock } from 'react-icons/fi';
import { useAuth } from "../context/AuthContext";
const Plataforma = () => {
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
          <Menu
            title='Usuarios'

            ></Menu>
        </div>
        <div className="right-item">
          <CustomComponent
            title='Bienvenidos a la consulta de valores'
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

export default Plataforma;
