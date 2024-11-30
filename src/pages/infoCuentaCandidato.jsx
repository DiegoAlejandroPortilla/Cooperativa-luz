import React, { useContext } from 'react';
import './styles.css';
import Menu from '../components/MenuCandidato';
import TopBar from '../components/TopBar';
import { Card, CardBody, Image, Button, Progress } from "@nextui-org/react";
import CustomComponent from '../components/CustomComponentPersonalInfo'
import { FiUpload, FiFolder, FiUnlock, FiLock } from 'react-icons/fi';

const InfoCuentaCandidato = () => {
    return (
        <div className="parent-container md:w-1/2">
            <div className="plataforma-container">
                <div className="top-item">
                    <TopBar
                        title="Información del postulante"
                    ></TopBar>
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
                    <CustomComponent title='Información sobre su Cuenta'>
                    </CustomComponent>
                </div>
                <video className="background-video" autoPlay loop muted>
                    <source src={require('../assets/inicio.mp4')} type="video/mp4" />
                    Tu navegador no admite la reproducción de videos.
                </video>
            </div>
        </div>
    );
};

export default InfoCuentaCandidato;
