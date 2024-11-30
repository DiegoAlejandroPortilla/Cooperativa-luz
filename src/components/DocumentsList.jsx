import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../context/AuthContext";
import PopupDocument from './PopupDocument'; 
import Popup from './Popup'; 
import './DocumentsList.css';

const DocumentList = ({ title, children }) => {
    
    const [documentTitles, setDocumentTitles] = useState([]);
    const [files, setFiles] = useState({});
    const [files1, setFiles1] = useState({});
    const { isAuthenticated, user } = useAuth();

    // Estado para controlar si se muestra la ventana emergente
    const [showPopup, setShowPopup] = useState(false);
    const [showPopup2, setShowPopup2] = useState(false);

    // Función para abrir la ventana emergente
    const handleOpenPopup = () => {
        setShowPopup(true);

    };
    const handleAccept = () =>{
        setShowPopup2(true);
    };

    // Función para cerrar la ventana emergente
    const handleClosePopup = () => {
        setShowPopup(false);
    };
    const getNumPages = async (file, docId) => {
        if (file) {
          const arrayBuffer = await file.arrayBuffer();
          const uint8Array = new Uint8Array(arrayBuffer);
          let numPages = 0;
          for (let i = 0; i < uint8Array.length - 4; i++) {
            if (
              String.fromCharCode(uint8Array[i]) === '/' &&
              String.fromCharCode(uint8Array[i + 1]) === 'P' &&
              String.fromCharCode(uint8Array[i + 2]) === 'a' &&
              String.fromCharCode(uint8Array[i + 3]) === 'g' &&
              String.fromCharCode(uint8Array[i + 4]) === 'e'
            ) {
              numPages++;
            }
          }
    
          setFiles1({
            ...files1,
            [`${docId}-pages`]: numPages,
          });
        }
    };
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                //que dependa de que pues eliga se muestran los titulos 
                const response = await axios.get('http://127.0.0.1:8000/api/v1/procesocontratacion/titulo_exp_por_pa_id/1'); // Ejemplo con pa_id=2
                setDocumentTitles(response.data);
                console.log("doc title", response.data);

            } catch (error) {
                console.error("Error al obtener los títulos de los documentos:", error);
            }
        };
        fetchData();
    }, []);




    const handleFileChange = (e, field, description,docId) => {
        if (!field) {
            console.error("El campo proporcionado es inválido:", field);
            return;
        }
        console.log("Campo:", field);  // Añadido para depuración
        console.log("Descripción:", description);  // Añadido para depuración
        console.log("Calificaion:", 0);  // Añadido para depuración
        const selectedFile1 = e.target.files[0];
        const selectedFile = e.target.files[0];
        setFiles(prevFiles => ({
            ...prevFiles,
            [field]: {
                file: selectedFile,
                description: description
                
            }
        }));
        getNumPages(selectedFile1, docId);
    };

    console.log(files)
  
    const sendFilesToMongo = async () => {
        const formData = new FormData();
        
        const fileEntries = Object.entries(files);
        console.log(fileEntries)
        console.log(files)
        console.log(documentTitles)
    
        if (fileEntries.length !== documentTitles.length) {
            console.error("No se ha seleccionado un archivo para cada título.");
            return;
        }

    
        fileEntries.forEach(([key, fileData]) => {
            if (fileData.file && fileData.description) {  // Asegurarse de que file y description existen
                console.log(fileData.file);
                console.log(fileData.description);
                formData.append('archivos', fileData.file);
                formData.append('nombres', fileData.description);
                formData.append('calificaciones', 0);
            } else {
                console.error(`Error con la clave ${key}: file o description son undefined`);
            }
        });
        
        formData.append('tipo_documento', 'pdf');
        formData.append('id_usuario', user.id); 
        for (let pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
         }
         for (let [key, value] of formData.entries()) {
            console.log(key, value);
          }
        try {
            const response = await axios.post('http://127.0.0.1:8001/guardar_documentos/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error("Error al guardar los archivos:", error);
            if (error.response) {
                console.error("Detalles del servidor:", error.response.data);
            }
        }
        setShowPopup2(true);
    };
    
console.log(files)

    return (
        <div className="custom-component-postulante">
            <h1 className="custom-title">{title}</h1>
            <hr className="custom-divider" />
            <div className='documents-container'>
            {documentTitles.map(titleData => (
                     <div key={titleData.tx_id} className="file-upload">
                        <p className="title" style={{ flex: 2 }}>{titleData.tx_descripcion}</p>
                        <input 
                            type="file" 
                            style={{ flex: 3 }} 
                            accept=".pdf" 
                            onChange={(e) => handleFileChange(e, `document-${titleData.tx_id}`, titleData.tx_descripcion, titleData.tx_id)}

                        />
                     <p style={{ flex: 1 }}>{files1[`${titleData.tx_id}-pages`] - 2 || 0}</p>

                    </div>
                ))}
            </div>
            <div className='buttons-container'>
                <button onClick={handleOpenPopup}>Ver formatos</button>
                <button onClick={sendFilesToMongo}>Enviar información</button>
                {showPopup2 && (
                    <Popup
                        mensaje="DATOS SUBIDOS CORRECTAMENTE"
                        ruta="/inicioPostulante"
                        onClose={handleClosePopup}
                    />
                )}
            </div>
            <PopupDocument
                show={showPopup}
                onClose={handleClosePopup}
                title="Formatos Aceptados"
            />
        </div>
    );
};




export default DocumentList;
