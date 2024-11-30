import React from 'react';
import './style.css';
import Logo from '../assets/logo.png';
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const WelcomeBanner = () => {
  const { isAuthenticated, logout, user } = useAuth();
  return (
    <div className="welcome-banner">
      <div className="logo-container">
        <img src={Logo} alt="Logo" />
      </div>

      <div className="text-container">
        <h1>Bienvenido a la plataforma ESPE DOCENTES</h1>
      </div>
      {isAuthenticated ? (
        <>
          {user && user.name1 ? (
            <li>{user.name1} {user.name2} {user.lastname1} {user.lastname2}</li>
          ) : (
            <li>Loading...</li>
          )}
        </>
      ) : (
        <>
          <li>
            <Link to="/register">Perfil</Link>
          </li>
          <li>
            <Link to="/">Cerrar Sesión</Link>
          </li>
        </>
      )}
    </div>
  );
};

export default WelcomeBanner;
