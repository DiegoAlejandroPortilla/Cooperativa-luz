import React, { useState } from "react";
import './CustomComponentInicio.css';
import * as XLSX from 'xlsx';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB0MM0G7Qk0oQ2bop4fagxfQEyxjv3ekrs",
    authDomain: "bdvalle-74d37.firebaseapp.com",
    databaseURL: "https://bdvalle-74d37-default-rtdb.firebaseio.com",
    projectId: "bdvalle-74d37",
    storageBucket: "bdvalle-74d37.appspot.com",
    messagingSenderId: "924924492592",
    appId: "1:924924492592:web:be7fb946f550714efc66f5",
    measurementId: "G-TDM5VF4400"
  };

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

const CustomComponentInicio = ({ title }) => {
    const [excelData, setExcelData] = useState([]);

    // Manejador de cambio de archivo
    const handleFileChange = (event) => {
        const file = event.target.files[0];
    
        // Verifica si hay un archivo seleccionado
        if (file) {
            // Verifica el tipo MIME del archivo
            const mimeType = file.type;
            if (mimeType !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
                mimeType !== 'application/vnd.ms-excel') {
                // Si el tipo MIME no es de Excel, muestra un mensaje de error y sale
                alert('Por favor, seleccione un archivo de Excel (.xlsx o .xls).');
                return;
            }
    
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                setExcelData(jsonData);
            };
            reader.readAsBinaryString(file);
        }
    };
    

    // Función para guardar los datos en Firebase
    const guardarDatos = () => {
        const db = getDatabase(app);

        // Generar un ID único para esta carga de datos (por ejemplo, usando la fecha y hora actual)
        // Esto genera un ID basado en la hora actual

        // Genera un ID único basado en la hora actual
        const dataRef = ref(db, `datos/1713493992529`);

        set(dataRef, excelData)
            .then(() => {
                console.log("Datos guardados exitosamente en Firebase");
            })
            .catch((error) => {
                console.error("Error al guardar datos en Firebase:", error);
            });
    };


    return (
        <div className="custom-component-postulante">
            <h1 className="custom-title">{title}</h1>
            <hr className="custom-divider" />
            <div className="solicitudes-container">
                <div className="solicitudes-info">
                    <h1>Cargar Excel</h1>
                </div>
                <input className="boton-ir" type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
            </div>

            <div>
                <br />
                {excelData.length > 0 ? (
                    <>
                        <table className="table">
                            <thead>
                                <tr>
                                    {Object.keys(excelData[0]).map((key, index) => (
                                        <th key={index}>{key}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {excelData.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {Object.values(row).map((value, cellIndex) => (
                                            <td key={cellIndex}>{value}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Botón para guardar los datos */}
                        <button onClick={guardarDatos}>Guardar Datos</button>
                    </>
                ) : (
                    <p>No se han cargado datos.</p>
                )}
            </div>
        </div>
    );
};

export default CustomComponentInicio;
