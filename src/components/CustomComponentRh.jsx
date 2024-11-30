import React, { useState } from 'react';
import PopupDocument from './PopupDocument'; 
import Popup from './Popup'; 
import './CustomComponentFormRh.css'

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
        <div className="custom-component" >
        <h1 className="custom-title">{title}</h1>
        <hr className="custom-divider" />
        <div className="nuevo-div">
          <div className="texto-con-icono">
            <i className="fas fa-info-circle"  style={{ display: "flex", justifyContent: "center" }}></i>
            <span>
              <h1>Ha culminado su proceso</h1>
              Se le informaran los resultados despues de revisar su solicitud</span>
          </div>
          <div className="imagen">
            <img
              src="https://scontent.fuio35-1.fna.fbcdn.net/v/t39.30808-6/365215312_679493340882187_5155199488433320608_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7f8c78&_nc_eui2=AeErv6ik0c8ddwbveKPA0RP9gsGufmwls3SCwa5-bCWzdKVaOa6ulBGzNFCB962N0SnBM7tjfpltxqtr37-An668&_nc_ohc=7IgGuaCYDXEAX9pFcDy&_nc_oc=AQnm1l9Z-7U-ScJwLGIIdP2T3qQBi2tCQ1oCDCCt_fIXqTkEAru6pGnVsbZ7sNSGkbLpNZJCWPqiVtEjnAEzSA8T&_nc_ht=scontent.fuio35-1.fna&oh=00_AfArEfeSvUsq5_SVwfzienn7vrYir3CjqizlxrI6WLafRg&oe=64DD9AFB"
              alt="Descripción de la imagen"
              //style={{ maxWidth: "70%", height: "auto" }}

            />
          </div>
        </div>
        </div>
    );
};

export default CustomComponentForm;
