import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Popup from "../components/PopupLeyDatos";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  // Función para manejar el envío del formulario
  const onSubmit = handleSubmit((data) => {
    // Verificar si las credenciales ingresadas son las requeridas para RRHH
    if (data.email === "amrea@gmail.com" && data.password === "amrea2024") {
      navigate('/inicioAdministrador'); // Redireccionar al inicio de RRHH
    } else if (data.email === "consultor@gmail.com" && data.password === "consultor2024") {
      navigate('/inicioConsultor'); // Redireccionar al inicio de RRHH{
    } else {
      {registerErrors.map((error, i) => (
        <div key={i} className="bg-red-500 p-2 text-white">
          {error}
        </div>
      ))}
    }
  });

  useEffect(() => {
    if (isAuthenticated) {
      setShowPopup(true);
    }
  }, [isAuthenticated]);

  const [showPopup, setShowPopup] = useState(false);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        {registerErrors.map((error, i) => (
          <div key={i} className="bg-red-500 p-2 text-white">
            {error}
          </div>
        ))}
        <h1>Inicio Sesión</h1>
        <form onSubmit={onSubmit}>
          <h2>Correo</h2>
          <input
            type="text"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md border m-3 "
          />
          {errors.email && (
            <h4 className="text-red-500">El correo es requerido</h4>
          )}
          <h2>Contraseña</h2>
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md border m-3"
          />
          {errors.password && (
            <h4 className="text-red-500">La contraseña es requerida</h4>
          )}
          <button type="submit">Ingresar</button>
        </form>
        {showPopup && (
          <Popup
            mensaje="Tu información será manipulada conforme a la necesidad de la institución sin lugar a reclamos, conforme a la ley de protección de datos, etc."
            ruta="/inicioPostulante" // Aquí pasa la ruta que desees redireccionar desde el componente Login
            onClose={handleClosePopup}
          />
        )}
      </div>
      <div className="login-image"></div>
    </div>
  );
};

export default Login;
