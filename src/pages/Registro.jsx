import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import './styles.css';
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import PopupCedula from "../components/PopUpCedula";
import Popup from "../components/Popup";
import PropTypes from "prop-types";
import emailjs from "./emailjsInit";

const Registro = () => {

  const [tipoIden, setTipoIden] = useState("cédula");
  const [identificacion, setIdentificacion] = useState("");
  const [sexo, setSexo] = useState("M");
  const [titulo, setTitulo] = useState('');
  const titulosM = ['Ingeniero', 'Licenciado', 'Doctor', 'Magister', 'Bachiller'];
  const titulosF = ['Ingeniera', 'Licenciada', 'Doctora', 'Magister', 'Bachiller'];
  const [fallos, setFallos] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [showEmailValidationPopup, setShowEmailValidationPopup] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const validateEmailFormat = (email) => {
    return email.endsWith("@gmail.com") ||
      email.endsWith("@outlook.com") ||
      email.endsWith("@hotmail.com") ||
      email.endsWith("@outlook.es");
  };

  const EmailValidationPopup = ({ onClose }) => {
    return (
      <Popup
        titulo="Error en el Correo Electrónico"
        mensaje="Debe ingresar un correo válido perteneciente dentro de los siguientes dominios: gmail.com, hotmail.com o outlook.com"
        onClose={onClose}
        ruta="#"
      />
    );
  };

  EmailValidationPopup.propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  const handleChangeEmail = (event) => {
    const email = event.target.value;
  };

  const onCaptchaVerify = () => {
    setIsCaptchaVerified(true);
  };

  const handleChange = (event) => {
    setTipoIden(event.target.value);
  };

  const handleChange1 = (event) => {
    setSexo(event.target.value);
  };

  const handleChange2 = (event) => {
    setTitulo(event.target.value);
  };
  const handleChange3 = (event) => {
    setIdentificacion(event.target.value);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  
  const navigate = useNavigate();
  const { signup, isAutheticated, errors: registerErrors } = useAuth();
  const onSubmit = handleSubmit(async (values) => {
    let nombre1 = values.nombreCompleto.split(" ")[0];
    let nombre2 = values.nombreCompleto.split(" ")[1];
    let apellido1 = values.nombreCompleto.split(" ")[2];
    let apellido2 = values.nombreCompleto.split(" ")[3];
    values.nombre1 = nombre1;
    values.nombre2 = nombre2;
    values.apellido1 = apellido1;
    values.apellido2 = apellido2;

    if (!validateEmailFormat(values.email)) {
      setShowEmailValidationPopup(true);
      return;
    }

    try {
      const res = await signup(values);

      if (res && res.status === 200) {

        const birthDate = new Date(values.fecha_nacimiento);
        birthDate.setDate(birthDate.getDate() + 1);
        const day = String(birthDate.getDate()).padStart(2, '0');
        const month = String(birthDate.getMonth() + 1).padStart(2, '0');
        const yearLastTwoDigits = String(birthDate.getFullYear()).slice(-2);
        const password = `${day}${month}${yearLastTwoDigits}`;

        const templateParams = {
          to_email: values.email,
          subject: 'Confirmación de Postulación',
          message: `Estimado(a) ${values.nombre1} ${values.apellido1},\n\n` +
            `Le extendemos nuestro cordial saludo y le confirmamos su postulación al proceso de selección.` +
            `\n\nA continuación, le proporcionamos los detalles de su postulación:\n\n` +
            `Nombre completo: ${values.nombre1} ${values.nombre2 ? values.nombre2 : ''} ${values.apellido1} ${values.apellido2}\n` +
            `Correo electrónico: ${values.email}\n` +
            `Contraseña temporal: ${password}\n\n` +
            `Le deseamos mucho éxito en el proceso de selección y quedamos a su disposición para cualquier consulta.\n\n` +
            `Atentamente,\n\n` +
            `El equipo de Recursos Humanos`,
        };

        if(values.email.endsWith("@gmail.com")){
        emailjs.send('SERVICEGMAIL_SBDA', 'template_l2kfb7n', templateParams).then(
          (response) => {
            console.log('Email sent:', response);
          },
          (error) => {
            console.error('Error sending email:', error);
          }
        );
        }else{
          emailjs.send('SERVICEOUTLOOK_SBDA', 'template_l2kfb7n', templateParams).then(
            (response) => {
              console.log('Email sent:', response);
            },
            (error) => {
              console.error('Error sending email:', error);
            }
          );
        }
        setShowPopup(true);
      }
    } catch (error) {
      console.log('Error:', error)
    }
  });

  useEffect(() => {
    if (isAutheticated) { navigate("/"); }
  }, [isAutheticated]);
  useEffect(() => {
    setFallos(registerErrors);
  }, [registerErrors]);

  const [showFormulario2, setShowFormulario2] = useState(false);

  function handleClick(e) {
    e.preventDefault();

    if (!isCaptchaVerified) {
      // Mostrar mensaje de error o bloquear el envío del formulario
      setAlertMessage("Por favor, completa el reCAPTCHA antes de enviar el formulario.");
      return;
    }

    if (tipoIden === 'cédula') {
      const var1 = parseInt(identificacion.slice(0, 2));
      const var2 = parseInt(identificacion.slice(2, 3));

      if (identificacion.length !== 10) {
        setAlertMessage('Cédula incorrecta: La cédula debe tener exactamente 10 caracteres.');
        return;
      } else if (isNaN(var1) || var1 < 1 || var1 > 24) {
        setAlertMessage('Cédula incorrecta: Los dos primeros dígitos deben estar entre 1 y 24.');
        return;
      } else if (isNaN(var2) || var2 > 6) {
        setAlertMessage('Cédula incorrecta: El tercer dígito debe ser mayor o igual a 6.');
        return;
      }

      let sum_par = 0;
      let sum_impar = 0;
      let sum;

      let i = 1;
      const digits = identificacion.slice(0, 9);
      for (let c of digits) {
        const digit = parseInt(c);
        if (i % 2 === 0) {
          sum_par += digit;
        } else {
          if (digit * 2 > 9) {
            sum_impar += digit * 2 - 9;
          } else {
            sum_impar += digit * 2;
          }
        }
        i++;
      }

      sum = sum_par + sum_impar;
      const verifier = parseInt(identificacion.charAt(9));

      if (sum % 10 === 0) {
        if (verifier !== 0) {
          setAlertMessage('Cédula incorrecta: El último dígito verificador debe ser 0.');
          return;
        }
      } else {
        const higher = 10 - (sum % 10) + sum;
        if (higher - sum !== verifier) {
          setAlertMessage('La cédula ingresada es inválida');
          return;
        }
      }
    }
    setShowFormulario2(true);
  }

  return (
    <div className="login-container" >
      <div className="login-image"></div>
      {!showFormulario2 && (
        <div className="login-form" id="login1">
          <h1>Registro</h1>
          {registerErrors.map((error, i) => (
            <div key={i} className="bg-red-500 p-2 text-white">
              {error}
            </div>
          ))}
          {alertMessage && (
          <PopupCedula
            titulo="Error"
            mensaje={alertMessage}
            onClose={() => setAlertMessage("")}
          />
          )}
          <h2>Tipo de Identificación</h2>
          <select
            {...register("tipoIden", { required: true })}
            onChange={handleChange}
            value={tipoIden}
            placeholder="Tipo de Identificación"
          >
            <option value="cédula">Cédula</option>
            <option value="pasaporte">Pasaporte</option>
          </select>
          {errors.tipoIden && (
            <h4 className="text-red-500">El tipo de identificación es requerido</h4>
          )}
          <input
            type="number"
            {...register("identificacion", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md border m-3"
            placeholder={tipoIden === "cédula" ? "Cédula" : "Pasaporte"}
            inputMode="numeric"
            maxLength="10"
            onChange={handleChange3}
          />
          {errors.identificacion && (
            <h4 className="text-red-500">La Identificación es requerida</h4>
          )}
          <div className="captcha-container">
            <ReCAPTCHA sitekey="6LdDDVonAAAAAJAr8uMJO4EhneySO80IqjF3Vt6x" onChange={onCaptchaVerify} />
          </div>
          <button type="submit" onClick={handleClick}>
            Registrarse
          </button>
          <div className="register-container">
            <h3>¿Ya te has registrado?</h3>
            <p onClick={() => window.location.href = '/login'}>Ir a Login</p>
          </div>

        </div>
      )}
      {showFormulario2 && (
        <div className="form-container" id='login2'>
          <div className="form-box">
            <h1>Información</h1>
            {registerErrors.map((error, i) => (
              <div key={i} className="bg-red-500 p-2 text-white">
                {error}
              </div>
            ))}
            <h2>Nombre Completo</h2>
            <input
              type="text"
              {...register("nombreCompleto", { required: true })}
            />
            {errors.nombreCompleto && (
              <h4 className="text-red-500">El Nombre Completo es requerido</h4>
            )}
            <h2>Género</h2>
            <select
              {...register("sexo", { required: true })}
              onChange={handleChange1}
              value={sexo}
            >
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
              <option value="O">Otro</option>
            </select>
            {errors.sexo && (
              <h4 className="text-red-500">El sexo es requerido</h4>
            )}
            <h2>Profesión/Título</h2>
            <select
              {...register("titulo", { required: true })}
              onChange={handleChange2}
            > {sexo === "M" ? (
              titulosM.map((titulo, i) => (
                <option key={i} value={titulo}>{titulo}</option>
              ))
            ) : (
              titulosF.map((titulo, i) => (
                <option key={i} value={titulo}>{titulo}</option>
              ))
            )}
            </select>
            {errors.titulo && (
              <h4 className="text-red-500">El título es requerido</h4>
            )}
            <h2>Fecha de Nacimiento</h2>
            <input
              type="date"
              {...register("fecha_nacimiento", { required: true })}
              max={`${new Date(new Date().getFullYear() - 18, 11, 31).toISOString().split('T')[0]}`}
            />
            {errors.fecha_nacimiento && (
              <h4 className="text-red-500">La fecha de nacimiento es requerido</h4>
            )}
            <h2>E-mail</h2>
            <input
              type="email"
              {...register("email", { required: true })}
              onChange={handleChangeEmail}
            />

            {errors.email && <h4 className="text-red-500">El correo es requerido</h4>}
            <button type="submit" onClick={() => { onSubmit(); }}>Enviar</button>
            {showEmailValidationPopup && (
              <EmailValidationPopup onClose={() => setShowEmailValidationPopup(false)} />
            )}
            {showPopup && (
              <Popup
                titulo="¡Su cuenta ha sido creada exitosamente!"
                mensaje="Accede a tu correo para recuperar tu clave y poder iniciar sesión. Recuerda cambiar tu contraseña para mentener tu cuenta segura."
                ruta="/login" // Ajusta la ruta de redirección que deseas
                onClose={() => setShowPopup(false)} // Función para cerrar el Popup
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Registro;
