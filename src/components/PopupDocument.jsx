import React from 'react';
import FilePreview from './FilePreview';

import documento from '../assets/Hola.pdf';

import './PopupDocument.css'; // Asegúrate de tener los estilos CSS en este archivo

const PopupDocument = ({ show, onClose, title, documentName, documentFormat, }) => {
    return show ? (
        <div className="popupdoc-overlay">
            <div className="popupdoc-container">
                <button className="popupdoc-button-close" onClick={onClose}>X</button>
                <h1 className="popupdoc-title">{title}</h1>
                <div className="popupdoc-content">
                    <div className="popupdoc-download-links">
                        <FilePreview
                            fileName="HOJA DE VIDA FORMATO ESPE"
                            pdfFile={documento}
                        />
                        <FilePreview
                            fileName="CERTIFICADOS EXPERIENCIA PROFESIONAL DOCENTE"
                            pdfFile={documento}
                        />
                        <FilePreview
                            fileName="CERTIFICADOS EXPERIENCIA PROFESIONAL"
                            pdfFile={documento}
                        />
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

const getIcon = (format) => {
    switch (format) {
        case 'pdf':
            return 'path/to/pdf/icon.png';
        case 'doc':
            return 'path/to/doc/icon.png';
        // Agrega aquí otros formatos si es necesario
        default:
            return '';
    }
};

export default PopupDocument;
