import React, { useState } from "react";




// Este es el componente principal que renderiza la interfaz
const informacion = () => {
  
  return (
    <div className="contenedor-principal2" >
      <div className="contenedor-izquierdo2">
        <h1>Usuario</h1>
        <hr/>
        <button><i className="fas fa-home"></i> Inicio</button>
        <button> <i className="fas fa-user"></i> Información del postulante</button>
        <button> <i className="fas fa-file"></i> Formato de archivos</button>
        <div className="cerrar-sesion-btn"><button>Cerrar sesión</button></div>
        
      </div>
      <div className="contenedor-derecho2" >
        <h1>Bienvenidos a la Plataforma Espe</h1>
        <hr />
        <div className="nuevo-div">
          <div className="texto-con-icono">
            <i className="fas fa-info-circle"  style={{ display: "flex", justifyContent: "center" }}></i>
            <span>
              <h1>Ha culminado su proceso</h1>
              Se le informaran los resultados despues de revisar su solicitud</span>
          </div>
          <div className="imagen">
            <img
              src="https://scontent.fuio35-1.fna.fbcdn.net/v/t39.30808-6/364158523_677901024374752_6288214686063065157_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeEsFvPlcPEjbrYIochPkDauutp4CQGZ-qC62ngJAZn6oJXLEgjqyz1q_19PRsaSAbgAs4RjaRbZZNMU3kBO_zLl&_nc_ohc=bPSTA78KWZUAX-C4Zlg&_nc_ht=scontent.fuio35-1.fna&oh=00_AfBk1AQjt3yxDwYe-CG-odqEd4AJ57btDGa-XZgrrtIJ-w&oe=64D3965C"
              alt="Descripción de la imagen"
              //style={{ maxWidth: "70%", height: "auto" }}

            />
          </div>
        </div>
      </div>


      <style jsx>{` 


/* Estilos generales del body */
body {
  background-color: #f4ffe9;
  color: black;
  font-family: "Quattrocento", sans-serif;
}

/* Estilos para el contenedor principal */
.contenedor-principal2 {
  display: flex;
  justify-content: center;
  align-items: stretch;
  height: 100vh;
  margin: 20px;
}

.contenedor-izquierdo2 {
  width: 20%;
  background-color: white;
  border: 2px solid black;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  margin: 20px;
}

.contenedor-izquierdo2 button {
  margin-bottom: 0.5em;
  padding: 1em 2em;
  font-size: 1em;
}

.contenedor-izquierdo2 .cerrar-sesion-btn {
  margin-top: 1em;
  border: 2px solid black;
  border-radius: 5px;
  padding: 0.5em 1em;
  font-size: 1em;
}

.contenedor-derecho2 {
  flex: 1;
  background-color: white;
  border: 2px solid black;
  border-radius: 10px;
  padding: 20px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  margin: 20px;
}

/* Estilos para el contenedor de la imagen y texto con ícono */
.nuevo-div {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Estilos para el div de texto con ícono */
.texto-con-icono {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 20px; /* Agregar margen inferior */
  margin-right: 20px; /* Agregar margen derecho */
}

.texto-con-icono i {
  margin-bottom: 10px; /* Espacio entre el icono y el texto */
}

/* Estilos para el div de la imagen */
.imagen {
  width: 50%;
  height: 0;
  padding-bottom: 50%;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 20px; /* Agregar margen superior */
  margin-left: 20px; /* Agregar margen izquierdo */
}

/* Estilos para la imagen dentro del contenedor */
.imagen img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

/* Estilos para los títulos <h1> */
h1 {
  font-family: "Quattrocento", sans-serif;
  font-size: 24px;
  margin: 0;
}

/* Estilos para los textos del span */
span {
  font-size: 18px;
  margin: 0;
}

/* Estilos para los select */
select {
  margin: 10px 0;
  border: 1px solid black;
  border-radius: 20px;
  padding: 5px;
  width: 100%;
  max-width: 200px;
  font-size: 14px;
}

/* Nuevos estilos para los labels */
label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

/* Nuevos estilos para ajustar el espacio entre los elementos en la tercera fila */
.fila-3 {
  grid-column: 1 / span 2;
  display: flex;
  justify-content: center;
}

.fila-3 .item {
  flex: 1;
  margin-right: 150px;
}

.fila-3 .item:last-child {
  margin-right: 0;
}

/* Estilos para el botón "Cerrar sesión" */
.contenedor-izquierdo2 .cerrar-sesion-btn {
  margin-top: 20px;
  border: 2px solid black;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 14px;
}

/* Centramos el botón "Cerrar sesión" horizontalmente */
.contenedor-izquierdo2 .cerrar-sesion-btn {
  display: block;
  margin: 0 auto;
}

/* Estilos para los botones dentro del contenedor-izquierdo2 */
.contenedor-izquierdo2 button {
  margin-bottom: 10px;
}

/* Estilos para la línea horizontal <hr> */
hr {
  border: 2px solid black;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
}

/* Agregamos estilos para el botón "Enviar" */
.contenedor-derecho2 button {
  background-color: #ffffff;
  border: 2px solid black;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 14px;
  margin-top: 20px;
  margin-left: auto;
  display: block;
}

/* Estilo para el botón "Enviar" al pasar el cursor */
.contenedor-derecho2 button:hover {
  background-color: #e6e6e6;
}

/* Estilos para la versión responsive */
@media (max-width: 768px) {
  .contenedor-principal2 {
    flex-direction: column;
    height: auto;
  }

  .contenedor-izquierdo2,
  .contenedor-derecho2 {
    width: 100%;
    margin-left: 0;
    margin-right: 0;
  }

  .contenedor-derecho2 {
    margin-top: 20px;
  }

  .info-contenedor {
    grid-template-columns: 1fr;
  }

  /* Alineamos el botón "Enviar" en el centro en dispositivos móviles */
  .contenedor-derecho2 button {
    margin-left: 0;
    margin-right: 0;
    margin-top: 20px;
    margin-bottom: 20px;
  } 

  /* Estilos para el div de texto con ícono en dispositivos móviles */
  .texto-con-icono {
    text-align: center;
  }
}


`}</style>
     

    </div>
  );
};

export default informacion;

