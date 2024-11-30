import React, { useState } from 'react';
import './CustomComponentInfo.css'

const CustomComponentForm = ({ title }) => {

    return (
        <div className="custom-component-postulante">
            <h1 className="custom-title">{title}</h1>
            <hr className="custom-divider" />
            <div className='form-line-container'>
                <div className="form-line">
                    <div>
                        <h1>De Solicitud</h1>
                        <ul className="custom-list">
                                <li><a href="#">Candidato</a></li>
                                <li><a href="#">Actividad</a></li>
                                <li><a href="#">Campo Amplio</a></li>
                                <li><a href="#">Campo Específico</a></li>
                        </ul>
                    </div>
                    <div>
                        <h1>De Institución</h1>
                        <ul className="custom-list">
                                <li><a href="#">Sede</a></li>
                                <li><a href="#">Departamento</a></li>
                                <li><a href="#">Item</a></li>
                        </ul>
                    </div>
                    <div>
                        <h1>De Contrato</h1>
                        <ul className="custom-list">
                                <li><a href="#">Contratación</a></li>
                                <li><a href="#">Solicitud</a></li>
                                <li><a href="#">Postulación</a></li>
                                <li><a href="#">Requisito</a></li>
                                <li><a href="#">Oferta</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomComponentForm;