import React, { useState, useEffect } from 'react';
import './ChangePasswordPopup.css';
import { useAuth } from '../context/AuthContext';
import bcrypt from 'bcryptjs';
import { Button } from '@nextui-org/react';

const ChangePasswordRechum = ({ onClose }) => {
    const { user } = useAuth();
    const [rechums, setRechums] = useState([]);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
    const [enableNewPasswordInputs, setEnableNewPasswordInputs] = useState(false);
    const [passwordChangeMessage, setPasswordChangeMessage] = useState('');
    const [infoMessage, setInfoMessage] = useState('');

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/v1/procesocontratacion/rechum")
            .then(response => response.json())
            .then(data => setRechums(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const compararContrasena = () => {
        const rechumEncontrado = rechums.find(rechum => rechum.rh_id === user.id);
        if (rechumEncontrado) {
            const isCorrect = bcrypt.compareSync(oldPassword, rechumEncontrado.rh_password);

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
            const rechumEncontrado = rechums.find(rechum => rechum.rh_id === user.id);
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(newPassword, salt);
            rechumEncontrado.rh_password = hash;

            // Aquí tendrás que hacer la llamada para actualizar el usuario en el backend.
            // Puede que necesites adaptar el método 'editarCandidato' o crear uno nuevo para gestionar este update.

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
                        <Button className="password-button" onClick={onClose}>
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

export default ChangePasswordRechum;
