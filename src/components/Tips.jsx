import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Tips.css';

const Tips = () => {
  const navigate = useNavigate();

  return (
    <div className="tips-container">
      <h1 className="tips-title">Tips</h1>
      <div className="tip-item">
        <p className="tip-question">¿Deseas cambiar información institucional?</p>
        <button className="tip-button" onClick={() => navigate('/infoPostRRHH')}>Ir</button>
      </div>
      <div className="tip-item">
        <p className="tip-question">¿Deseas actualizar tu información personal?</p>
        <button className="tip-button" onClick={() => navigate('/informacionPersonal')}>Ir</button>
      </div>
    </div>
  );
};

export default Tips;
