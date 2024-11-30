import React, { useState } from 'react';
import './styles.css';
import WelcomeBanner from '../components/Bienvenida';
import Popup from '../components/Popup';
import { useEffect } from "react";
import Axios from "axios";




const Plataforma = () => {

  const [proceso, setProceso] = useState({
    postulacion: '',
    tipoContratacion: '',
    tipoPersonal: '',
    campoAmplio: '',
    campoEspecifico: '',
    sede: '',
    vacantes: '',
    tiempo: '',
    departamento: ''
  });
  const [procesoList, setProcesoList] = useState([]);
  const [contratacion, setContratacion] = useState([]);
  const [PersonalAcademico, setPersonalAcademico] = useState([]);
  const [campoAmplio, setCampoAmplio] = useState([]);
  const [campoEspecifico, setCampoEspecifico] = useState([]);
  const [sede, setSede] = useState([]);
  const [oferta, setOferta] = useState([]);



  useEffect(() => {
    Axios.get("http://127.0.0.1:8000/api/v1/procesocontratacion/postulacion").then((response) => {
      console.log(response);
      setProcesoList(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("http://127.0.0.1:8000/api/v1/procesocontratacion/contratacion").then((response) => {
      console.log(response);
      setContratacion(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("http://127.0.0.1:8000/api/v1/procesocontratacion/personal_academico").then((response) => {
      console.log(response);
      setPersonalAcademico(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("http://127.0.0.1:8000/api/v1/procesocontratacion/campo_amplio").then((response) => {
      console.log(response);
      setCampoAmplio(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("http://127.0.0.1:8000/api/v1/procesocontratacion/campo_especifico").then((response) => {
      console.log(response);
      setCampoEspecifico(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("http://127.0.0.1:8000/api/v1/procesocontratacion/sede").then((response) => {
      console.log(response);
      setSede(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("http://127.0.0.1:8000/api/v1/procesocontratacion/oferta").then((response) => {
      console.log(response);
      setOferta(response.data);
    });
  }, []);





  const [showPopup, setShowPopup] = useState(false);

  const handleProceso = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="process-container">
     
      <div className="formulario">
        {procesoList.map((val, key) => {
          return (
            <div className="proceso-container" key={key}>
              <span className="proceso-text">SELECCIONAR POSTULACIÓN</span>
              <select className="proceso-select" value={proceso.postulacion} onChange={(e) => setProceso({ ...proceso, postulacion: e.target.value })}>
                <option value="opcion1">{val[1]}</option>
                {console.log(val)}
                {console.log(val[1])}
              </select>
            </div>
          );
        })}
        <div className="proceso-container">
          <span className="proceso-text">SELECCIONAR TIPO DE CONTRATACIÓN</span>
          <select
            className="proceso-select"
            value={proceso.tipoContratacion}
            onChange={(e) => setProceso({ ...proceso, tipoContratacion: e.target.value })}
          >
            {contratacion.map((val1, key) => (
              <option key={key} value={val1[1]}>
                {val1[1]}
              </option>
            ))}
          </select>
        </div>
        <div className="proceso-container">
          <span className="proceso-text">SELECCIONAR TIPO DE PERSONAL ACADÉMICO</span>
          <select className="proceso-select" value={proceso.tipoPersonal} onChange={(e) => setProceso({ ...proceso, tipoPersonal: e.target.value })}>
            {PersonalAcademico.map((val2, key) => (
              <option key={key} value={val2[1]}>
                {val2[1]}
              </option>
            ))}
          </select>
        </div>

        <div className="proceso-container">
          <span className="proceso-text">CAMPO AMPLIO</span>
          <select className="proceso-select" value={proceso.campoAmplio} onChange={(e) => setProceso({ ...proceso, campoAmplio: e.target.value })}>
            {campoAmplio.map((val3, key) => (
              <option key={key} value={val3[1]}>
                {val3[1]}
              </option>
            ))}
          </select>
        </div>

        <div className="proceso-container">
          <span className="proceso-text">CAMPO ESPECÍFICO</span>
          <select className="proceso-select" value={proceso.campoEspecifico} onChange={(e) => setProceso({ ...proceso, campoEspecifico: e.target.value })}>
            {campoEspecifico.map((val4, key) => (
              <option key={key} value={val4[1]}>
                {val4[1]}
              </option>
            ))}
          </select>
        </div>

        <div className="proceso-container">
          <span className="proceso-text">SEDE</span>
          <select className="proceso-select" value={proceso.sede} onChange={(e) => setProceso({ ...proceso, sede: e.target.value })}>
            {sede.map((val5, key) => (
              <option key={key} value={val5[1]}>
                {val5[1]}
              </option>
            ))}
          </select>
        </div>
        <table className="tabla">

          {oferta.map((val6, key) => (
            <tr key={key}>
              <td>{val6[9]}</td>
              <td>{val6[10]}</td>

              {val6[5] === 1 ? <td>MATRIZ</td> : null}
            </tr>
          ))}


          <thead>
            <tr>
              <th>VACANTES</th>
              <th>TIEMPO (HRS)</th>
              <th>DEPARTAMENTO</th>
            </tr>
          </thead>
          <tbody>
            <tr>
            </tr>
          </tbody>
        </table>
        <div className="botones-container">
          <button className="btn-aceptar" onClick={handleProceso}>Aceptar</button>
          {showPopup && (
            <Popup
              mensaje="DATOS SUBIDOS CORRECTAMENTE"
              ruta="/plataforma"
              onClose={handleClosePopup}
            />
          )}
          <button className="btn-regresar" onClick={() => window.location.href = '/plataforma'}>Regresar</button>
        </div>
      </div>
    </div>
  );
};

export default Plataforma;
