import React, { useEffect } from 'react';
import './MenuRRHH.css';
import { FiArrowUpCircle, FiHome, FiUser, FiInfo } from 'react-icons/fi';
import { useAuth } from "../context/AuthContext";

const MenuRRHH = ({ title, subtitle1, subtitle2, subtitle3, icon1, icon2, icon3 }) => {
    const { isAuthenticated, logout, user } = useAuth();
    return (
        <div className="menu">
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
                <a href="/inicioRRHH"><FiHome /> Inicio</a>
            </div>
            <button className="menu-button" onClick={() => { logout(); }}>Cerrar sesión</button>
        </div>

    );
}

export default MenuRRHH;
