import React, { useState, useEffect } from 'react';
import './styles.css';
import WelcomeBanner from '../components/Bienvenida';
import axios from 'axios';

const RecursosHumanos = () => {
  const [candidatos, setCandidatos] = useState([]);

  // Función para cargar los datos de los candidatos
  useEffect(() => {
    // Aquí debes realizar una petición HTTP para obtener la lista de candidatos desde la página de registro
    // Utiliza la librería axios que ya está en tus dependencias
    axios.get('URL_DE_LA_API_PARA_OBTENER_CANDIDATOS')
      .then((response) => {
        setCandidatos(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los candidatos:', error);
      });
  }, []);

  // Función para aceptar un candidato
  const aceptarCandidato = (id) => {
    // Aquí debes realizar una petición HTTP para enviar la respuesta de aceptación al candidato con el ID proporcionado
    // Puedes utilizar axios para hacer esto
  };

  // Función para rechazar un candidato
  const rechazarCandidato = (id) => {
    // Aquí debes realizar una petición HTTP para enviar la respuesta de rechazo al candidato con el ID proporcionado
    // Puedes utilizar axios para hacer esto
  };

  return (
    <div className="plataforma-container">
      <WelcomeBanner />
    <div className="seccion-informacion">
      
      <h1>Página de Recursos Humanos</h1>
      <table  className="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Ver Documento</th>
            <th>Cargo</th>
            <th>Aceptación</th>
          </tr>
        </thead>
        <tbody>
          {candidatos.map((candidato) => (
            <tr key={candidato.id}>
              <td>{candidato.nombre}</td>
              <td>{/* Aquí mostrar el documento del candidato */}</td>
              <td>{candidato.cargo}</td>
              <td>
                <button onClick={() => aceptarCandidato(candidato.id)}>Aceptar</button>
                <button onClick={() => rechazarCandidato(candidato.id)}>Rechazar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default RecursosHumanos;
