import React, { useState, useEffect } from 'react';
import './ChangePasswordPopup.css';
import { useAuth } from '../context/AuthContext';
import bcrypt from 'bcryptjs';
import { Button } from '@nextui-org/react';
import { editarCandidato } from '../api/auth.js';

const ChangePasswordPopup = ({ onClose }) => {
    const { user, getUsuarios } = useAuth();
    const [usuarios, setUsuarios] = useState([]);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
    const [enableNewPasswordInputs, setEnableNewPasswordInputs] = useState(false);
    const [passwordChangeMessage, setPasswordChangeMessage] = useState('');
    const [infoMessage, setInfoMessage] = useState('');

    useEffect(() => {
        getUsuarios()
            .then((response) => {
                const usuariosData = response.data;
                const formattedData = usuariosData.map((item) => ({
                    cand_id: item[5],
                    cand_password: item[7],
                    cand_tipo_identificaccion: item[0],
                    cand_num_identificacion: item[1],
                    cand_nombre1: item[8],
                    cand_nombre2: item[9],
                    cand_apellido1: item[10],
                    cand_apellido2: item[11],
                    cand_fecha_nacimiento: item[4],
                    cand_titulo: item[3],
                    cand_correo: item[6],
                    cand_sexo: item[2],

                }));
                setUsuarios(formattedData);
            })
            .catch((error) => {
                console.error('Error al obtener contrato:', error);
            });
    }, []);

    const compararContrasena = () => {
        if (usuarios.length > 0) {
            const usuarioEncontrado = usuarios.find(
                (usuario) => usuario.cand_id === user.id
            );
            const isCorrect = bcrypt.compareSync(
                oldPassword,
                usuarioEncontrado.cand_password
            );

            if (isCorrect) {
                setIsPasswordCorrect(true);
                setEnableNewPasswordInputs(true);
                setInfoMessage('Contraseña Anterior Verificada. Por favor, ingrese una nueva contraseña y confírmela al repetirla.');
            } else {
                setIsPasswordCorrect(false);
                setEnableNewPasswordInputs(false);
                setInfoMessage('');
                setPasswordChangeMessage('La contraseña antigua no es correcta. Por favor, intenta de nuevo.');
            }
        }
    };

    const handleComprobarClick = () => {
        compararContrasena();
    };

    const handleEnviarClick = () => {
        if (newPassword === repeatNewPassword) {
            setPasswordChangeMessage('Contraseña cambiada correctamente');
            const usuarioEncontrado = usuarios.find(
                (usuario) => usuario.cand_id === user.id
            );
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(newPassword, salt);
            usuarioEncontrado.cand_password = hash;
            console.log('Usuario encontrado:', usuarioEncontrado);
            editarCandidato(user.id, usuarioEncontrado)
        } else {
            setPasswordChangeMessage('Las contraseñas no coinciden. Por favor, intenta de nuevo.');
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup">
                <h2>Cambio de contraseña</h2>
                <form>
                    <label>Contraseña antigua:</label>
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        disabled={isPasswordCorrect}
                    />
                    <Button className="password-button" onClick={handleComprobarClick}>
                        Comprobar
                    </Button>
                    {infoMessage && (
                        <div className="info-message">
                            <p>{infoMessage}</p>
                        </div>
                    )}
                    <label>Contraseña nueva:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        disabled={!enableNewPasswordInputs}
                    />
                    <label>Repetir nueva contraseña:</label>
                    <input
                        type="password"
                        value={repeatNewPassword}
                        onChange={(e) => setRepeatNewPassword(e.target.value)}
                        disabled={!enableNewPasswordInputs}
                    />
                    {passwordChangeMessage && (
                        <div className={passwordChangeMessage.includes('correctamente') ? 'success-message' : 'error-message'}>
                            <p>{passwordChangeMessage}</p>
                        </div>
                    )}
                    <div className="popup-buttons">
                        <Button className="password-button" onClick={handleEnviarClick}>
                            Enviar
                        </Button>
                        <button className="password-button" onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordPopup;
