import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MenuCandidato.css';
import { FiHome, FiUser, FiFile, FiFolder, FiUnlock, FiLock } from 'react-icons/fi';
import { useAuth } from "../context/AuthContext";
import PopupDocument from './PopupDocument';


const Menu = ({ title, subtitle1, subtitle2, subtitle3, icon1, icon2, icon3 }) => {
    const [showPopup, setShowPopup] = useState(false);

    const handleOpenPopup = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };
    const { isAuthenticated, logout, user } = useAuth();
    const [documentTitles, setDocumentTitles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Supongo que user.id contiene el ID del usuario
                const response = await axios.get(`http://127.0.0.1:8001/validar_documento/${user.id}`);
                console.log(user.id);
                setDocumentTitles(response.data);
                console.log("Esto esta", response.data);
            } catch (error) {
                console.error("Error al obtener los títulos de los documentos:", error);
            }
        };
        fetchData();
    }, []);




    return (
        <div className="menu-candidato">
            <div>
                <h1 className="menu-title">
                    {isAuthenticated ? (
                        <>
                            {user && user.name1 ? (
                                <div>{user.name1} {user.name2} {user.lastname1} {user.lastname2}</div>
                            ) : (
                                <li>Loading...</li>
                            )}
                        </>
                    ) : (
                        null
                    )}</h1>
                <hr className="menu-divider" />
            </div>
            <div>
                <a href="/inicioPostulante"><FiHome /> Inicio</a>
                <PopupDocument
                    show={showPopup}
                    onClose={handleClosePopup}
                    title="Formatos Aceptados"
                />
            </div>
            <button className="menu-button" onClick={() => { logout(); }}>Cerrar sesión</button>
        </div>

    );
}

export default Menu;