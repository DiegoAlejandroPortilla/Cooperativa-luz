import React, { useState } from 'react';
import './CustomComponent.css';
import { useAuth } from "../context/AuthContext";
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { jsPDF } from 'jspdf'; // Importa jsPDF

const CustomComponent = ({ title, subtitle1, subtitle2, icon1, icon2 }) => {
    // Inicializa Firebase si no se ha inicializado aún
    if (!firebase.apps.length) {
        firebase.initializeApp({
            apiKey: "AIzaSyB0MM0G7Qk0oQ2bop4fagxfQEyxjv3ekrs",
            authDomain: "bdvalle-74d37.firebaseapp.com",
            databaseURL: "https://bdvalle-74d37-default-rtdb.firebaseio.com",
            projectId: "bdvalle-74d37",
            storageBucket: "bdvalle-74d37.appspot.com",
            messagingSenderId: "924924492592",
            appId: "1:924924492592:web:be7fb946f550714efc66f5",
            measurementId: "G-TDM5VF4400"
        });
    }

    const database = firebase.database();

    const { isAuthenticated, user } = useAuth();
    const [searchName, setSearchName] = useState('');
    const [firebaseData, setFirebaseData] = useState([]);

    // Función para buscar datos en Firebase
    const fetchFirebaseData = async (name) => {
        const cooperativaRef = database.ref('datos/1713493992529');

        cooperativaRef.once('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Filtrar datos según el nombre ingresado
                const filteredData = data.filter(item => {
                    const itemName = item['COOPERATIVA DE TRANSPORTE "SAN PEDRO DE AMAGUAÑA"'];
                    return itemName && itemName.toLowerCase().includes(name.toLowerCase());
                });
                setFirebaseData(filteredData);
            }
        });
    };

    // Manejador de cambios para la entrada de búsqueda
    const handleSearchChange = (event) => {
        setSearchName(event.target.value);
    };

    // Manejador para realizar la búsqueda
    const handleSearchSubmit = () => {
        fetchFirebaseData(searchName);
    };


    const generatePDF = (item) => {
        // Especifica el tamaño de la página en el constructor de jsPDF
        const doc = new jsPDF({
            format: [76, 200], // Ancho: 76mm (7.6cm), Alto: 127mm (12.7cm)
            unit: 'mm', // Establece las unidades a milímetros
            orientation: 'landscape'// Orientación en retrato
        });

        // Puedes personalizar el PDF con la información de `item`
        doc.text('COOPERATIVA DE AHORRO Y CREDITO LUZ DEL VALLE', 25, 15);
        doc.text('Ticket para cancelación de valor', 65, 22);
        doc.text(`Número de ticket: ${Math.floor(Math.random() * 100)}`, 75, 30);
        doc.text(`Nombre : ${item['COOPERATIVA DE TRANSPORTE "SAN PEDRO DE AMAGUAÑA"']}`, 20, 40);
        doc.text(`Valor a cancelar: ${item['__EMPTY_1']}`, 20, 50);
        doc.addImage('./luz.png', 'PNG', 165, 45, 30, 30);
        doc.text(`Fecha de generación de este ticket: ${new Date().toLocaleDateString()}`, 20, 60);
        doc.save('document.pdf');
    };

    return (
        <div className="custom-component-postulante">
            <h1 className="custom-title">{title}</h1>
            <hr className="custom-divider" />
            <div className="custom-content">
                <div className="custom-section-carusel">
                    <div className="custom-item">
                        {/* Entrada para buscar */}
                        <input
                            type="text"
                            value={searchName}
                            onChange={handleSearchChange}
                            placeholder="Ingrese el nombre "
                            className="custom-input" /* Aplica la clase CSS */
                        />
                            <button onClick={handleSearchSubmit} className="custom-button">Buscar</button>

                    </div>
                    <br></br>
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Valor</th>
                                <th>Ticket</th>
                                {/* Puedes agregar más encabezados de columna aquí */}
                            </tr>
                        </thead>
                        <tbody>
                            {firebaseData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item['COOPERATIVA DE TRANSPORTE "SAN PEDRO DE AMAGUAÑA"']}</td>
                                    <td>{item['__EMPTY_1']}</td>
                                    {/* Botón "Imprimir" en la celda */}
                                    <td>
                                        <button onClick={() => generatePDF(item)}>Imprimir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="custom-item"></div>
                </div>
            </div>
        </div>
    );
};

export default CustomComponent;
