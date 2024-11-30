import React from 'react';
import './Boton.css';

const Boton = ({ text, children, outlineColor, fontColor, onClick }) => {
  const buttonStyle = {
    borderColor: outlineColor || '#004b23', // Default outline color if not provided
    color: fontColor || '#004b23', // Default font color if not provided
  };

  return (
    <button className="custom-button" style={buttonStyle} onClick={onClick}>
      <div className='children'>{children}</div>
      <span className="button-text">{text}</span>
    </button>
  );
};

export default Boton;


