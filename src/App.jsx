import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeContext } from './context/ThemeContext';
import Informacionrh from './pages/Informacionrh';
import Inicio from './pages/Inicio';
import Registro from './pages/Registro';
import RegistroRRHH from './pages/RegistroRRHH';
import Login from './pages/Login';
import Proceso from './pages/Proceso';
import Recursoshumanos from './pages/Recursoshumanos';
import Solicitud from './pages/Solicitud';
import PrincipalRRHH from './pages/PrincipalRRHH';
import Usuarios from './pages/Postulacion';
import Informacion from './pages/informacion';
import '@fortawesome/fontawesome-free/css/all.css';
import InicioPostulante from './pages/InicioPostulante';
import InfoPostulante from './pages/InformacionPostulante';
import SolicitudesPostulantes from './pages/SolicitudesPostulantes';
import InfoPostRRHH from './pages/InformacionPostulacionRRHH';
import InicioRRHH from './pages/InicioRRHH';
import InformacionPersonal from './pages/InformacionPersonal';
import PRUEBA from './pages/PRUEBA.jsx';
import InfoCuentaCandidato from './pages/infoCuentaCandidato';
import ListaPostulantes from './pages/ListaPostulantes';
import Calificacion from './pages/Calificacion';
import VerPDF from './pages/VerPDF';
import Actividad from './components/CRUD/Oferta';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/informacionrh" element={<Informacionrh />} />
            <Route path="/proceso" element={<Proceso />} />
            <Route path="/recursoshumanos" element={<Recursoshumanos />} />
            <Route path="/academica" element={<Solicitud />} />
            <Route path="/principalRRHH" element={<PrincipalRRHH />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/informacion" element={<Informacion />} />
            <Route path="/inicioConsultor" element={<InicioPostulante />} />
            <Route path="/infoPostulante" element={<InfoPostulante />} />
            <Route path="/solicitudesPostulantes" element={<SolicitudesPostulantes />} />
            <Route path="/infoPostRRHH" element={<InfoPostRRHH />} />
            <Route path="/inicioAdministrador" element={<InicioRRHH />} />
            <Route path="/informacionPersonal" element={<InformacionPersonal />} />
            <Route path="/prueba" element={<PRUEBA />} />
            <Route path="/infoCuentaCandidato" element={<InfoCuentaCandidato />} />
            <Route path="/listaPostulantes" element={<ListaPostulantes />} />
            <Route path="/calificacion" element={<Calificacion />} />
            <Route path="/verPDF" element={<VerPDF />} />
            <Route path="/actividad" element={<Actividad />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeContext.Provider>
  );
};

export default App;
