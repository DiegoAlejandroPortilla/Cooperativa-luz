import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
function RegisterPage() {
  const [tipoIden, setTipoIden] = useState("cédula");
  const [sexo, setSexo] = useState("M");
  const [titulo, setTitulo] = useState('');
  const titulos = ['Ingeniero', 'Licenciado', 'Doctor', 'Magister', 'Bachiller'];

  const handleChange = (event) => {
    setTipoIden(event.target.value);
  };
  const handleChange1 = (event) => {
    setSexo(event.target.value);
  };
  const handleChange2 = (event) => {
    setTitulo(event.target.value);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const navigate = useNavigate();
  const { signup, isAutheticated, errors: registerErrors } = useAuth();
  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  useEffect(() => {
    if (isAutheticated) { navigate("/"); }
  }, [isAutheticated]);



  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      {registerErrors.map((error, i) => (
        <div key={i} className="bg-red-500 p-2 text-white">
          {error}
        </div>
      ))}
      <form onSubmit={onSubmit}>
        <select
          {...register("tipoIden", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md border m-3"
          onChange={handleChange}
          value={tipoIden}
        >
          <option value="cédula">Cédula</option>
          <option value="pasaporte">Pasaporte</option>
        </select>
        {errors.tipoIden && (
          <p className="text-red-500">El tipo de identificación es requerido</p>
        )}

        <input
          type="number"
          {...register("identificacion", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md border m-3"
          placeholder={tipoIden === "cédula" ? "Cédula" : "Pasaporte"
          }
          inputMode="numeric"
          maxLength="10"
        />
        {errors.identificacion && (
          <p className="text-red-500">La Identificación es requerida</p>
        )}

        <select
          {...register("sexo", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md border m-3"
          onChange={handleChange1}
          value={sexo}
        >
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
          <option value="O">Otro</option>
        </select>
        {errors.sexo && (
          <p className="text-red-500">El sexo es requerido</p>
        )}

        <select
          {...register("titulo", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md border m-3"
          onChange={handleChange2}
          placeholder="Seleccione el título con el que desea postular"
        >
          {titulos.map((titulo, i) => (
            <option key={i} value={titulo}>{titulo}</option>
          ))}
        </select>
        {errors.titulo && (
          <p className="text-red-500">El título es requerido</p>
        )}
        <input
          type="text"
          {...register("nombre1", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md border m-3 "
          placeholder="Primer Nombre"
        />
        {errors.nombre1 && (
          <p className="text-red-500">El Primer Nombre es requerido</p>
        )}
        <input
          type="text"
          {...register("nombre2", { required: false })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md border m-3 "
          placeholder="Segundo Nombre"
        />
        <input
          type="text"
          {...register("apellido1", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md border m-3 "
          placeholder="Primer Apellido"
        />
        {errors.apellido1 && (
          <p className="text-red-500">El Primer Apellido es requerido</p>
        )}
        <input
          type="text"
          {...register("apellido2", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md border m-3 "
          placeholder="Segundo Apellido"
        />
        {errors.apellido2 && (
          <p className="text-red-500">El Segundo Apellido es requerido</p>
        )}
        <input
          type="date"
          {...register("fecha_nacimiento", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md border m-3 "
          placeholder="Fecha de Nacimiento"
        />
        {errors.fecha_nacimiento && (
          <p className="text-red-500">La fecha de nacimiento es requerido</p>
        )}
        <input
          type="email"
          {...register("email", { required: true })}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md border m-3"
          placeholder="Email"
        />
        {errors.email && <p className="text-red-500">El correo es requerido</p>}
        <button type="submit" className="px-4 py-2 rounded-md border m-3">Registrar</button>
      </form>
    </div>
  );
}

export default RegisterPage;
