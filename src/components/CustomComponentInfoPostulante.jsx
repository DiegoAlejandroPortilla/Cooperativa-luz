import React, { useState } from 'react';
import PopupDocument from './PopupDocument'; 
import Popup from './Popup'; 
import './PostulacionCandidato'
import Tabla from '../components/Tabla'

const CustomComponentForm = ({ title }) => {
    // Estado para controlar si se muestra la ventana emergente
    const [showPopup, setShowPopup] = useState(false);
    const [showPopup2, setShowPopup2] = useState(false);

    // Función para abrir la ventana emergente
    const handleOpenPopup = () => {
        setShowPopup(true);
    };

    const handleAccept = () => {
        setShowPopup2(true);
    };

    // Función para cerrar la ventana emergente
    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="documents-list">
            <h1 className="documents-title">{title}</h1>
            <hr className="documents-divider" />
            <div class="documents-container">
                <Tabla>
                </Tabla>
            </div>

          
        </div>
    );
};

export default CustomComponentForm;
