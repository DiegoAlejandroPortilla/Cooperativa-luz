import axios from "axios";

const API = "http://localhost:8800/api";


export const extraerTituloExpPorPaId = (pa_id) => {axios.get(`${API}/titulo_exp_por_pa_id/${pa_id}`, {
    withCredentials: true,
}); console.log(pa_id)};

export const  extraerInfoProcesoCandidato = (pa_id) => {axios.get(`${API}/info_candidato_por_pa_id/${pa_id}`, {
    withCredentials: true,
}); console.log(pa_id)};


export const extraerOferta = () => axios.get(`${API}/oferta`, {
    withCredentials: true,
});

export const agregarOferta = (oferta) => axios.post(`${API}/oferta`, oferta, {
    withCredentials: true,
});

export const editarOferta = (id, oferta) => {axios.put(`${API}/oferta/${id}`, oferta, {
    withCredentials: true,
}); console.log(id, oferta)}

export const eliminarOferta = (id) => {axios.delete(`${API}/oferta/${id}`, {id: id}, {
    withCredentials: true,
}); console.log(id)}

export const extraerContrato = () => axios.get(`${API}/contrato`, {
    withCredentials: true,
});

export const agregarContrato = (contrato) => axios.post(`${API}/contrato`, contrato, {
    withCredentials: true,
});

export const editarContrato = (id, contrato) => {axios.put(`${API}/contrato/${id}`, contrato, {
    withCredentials: true,
}); console.log(id, contrato)}

export const eliminarContrato = (id) => {axios.delete(`${API}/contrato/${id}`, {id: id}, {
    withCredentials: true,
}); console.log(id)}

export const extraerTipoContrato = () => axios.get(`${API}/tipo_contrato`, {
    withCredentials: true,
});

export const agregarTipoContrato = (tipo_contrato) => axios.post(`${API}/tipo_contrato`, tipo_contrato, {
    withCredentials: true,
});

export const editarTipoContrato = (id, tipo_contrato) => {axios.put(`${API}/tipo_contrato/${id}`, tipo_contrato, {
    withCredentials: true,
}); console.log(id, tipo_contrato)}

export const eliminarTipoContrato = (id) => {axios.delete(`${API}/tipo_contrato/${id}`, {id: id}, {
    withCredentials: true,
}); console.log(id)}

export const extraerPersonalAcademico = () => axios.get(`${API}/personal_academico`, {
    withCredentials: true,
});

export const agregarPersonalAcademico = (personal_academico) => axios.post(`${API}/personal_academico`, personal_academico, {
    withCredentials: true,
});

export const editarPersonalAcademico = (id, personal_academico) => {axios.put(`${API}/personal_academico/${id}`, personal_academico, {
    withCredentials: true,
}); console.log(id, personal_academico)}

export const eliminarPersonalAcademico = (id) => {axios.delete(`${API}/personal_academico/${id}`, {id: id}, {
    withCredentials: true,
}); console.log(id)}

export const extraercampoAmplio = () => axios.get(`${API}/campo_amplio`, {
    withCredentials: true,
});

export const agregarcampoAmplio = (campo_amplio) => axios.post(`${API}/campo_amplio`, campo_amplio, {
    withCredentials: true,
});

export const editarcampoAmplio = (id, campo_amplio) => {axios.put(`${API}/campo_amplio/${id}`, campo_amplio, {
    withCredentials: true,
}); console.log(id, campo_amplio)}

export const eliminarcampoAmplio = (id) => {axios.delete(`${API}/campo_amplio/${id}`, {id: id}, {
    withCredentials: true,
}); console.log(id)}

export const extraercampoEspecifico = () => axios.get(`${API}/campo_especifico`, {
    withCredentials: true,
});

export const agregarcampoEspecifico = (campo_especifico) => axios.post(`${API}/campo_especifico`, campo_especifico, {
    withCredentials: true,
});

export const editarcampoEspecifico = (id, campo_especifico) => {axios.put(`${API}/campo_especifico/${id}`, campo_especifico, {
    withCredentials: true,
}); console.log(id, campo_especifico)}

export const eliminarcampoEspecifico = (id) => {axios.delete(`${API}/campo_especifico/${id}`, {id: id}, {
    withCredentials: true,
}); console.log(id)}

export const extraerSede = () => axios.get(`${API}/sede`, {
    withCredentials: true,
});

export const agregarSede = (sede) => axios.post(`${API}/sede`, sede, {
    withCredentials: true,
});

export const editarSede = (id, sede) => {axios.put(`${API}/sede/${id}`, sede, {
    withCredentials: true,
}); console.log(id, sede)}

export const eliminarSede = (id) => {axios.delete(`${API}/sede/${id}`, {id: id}, {
    withCredentials: true,
}); console.log(id)}

export const extraerDepartamento = () => axios.get(`${API}/departamento`, {
    withCredentials: true,
});

export const agregarDepartamento = (departamento) => axios.post(`${API}/departamento`, departamento, {
    withCredentials: true,
});

export const editarDepartamento = (id, departamento) => {axios.put(`${API}/departamento/${id}`, departamento, {
    withCredentials: true,
}); console.log(id, departamento)}

export const eliminarDepartamento = (id) => {axios.delete(`${API}/departamento/${id}`, {id: id}, {
    withCredentials: true,
}); console.log(id)}

export const extraerActividad = () => axios.get(`${API}/actividad`, {
    withCredentials: true,
});

export const agregarActividad = (actividad) => axios.post(`${API}/actividad`, actividad, {
    withCredentials: true,
});

export const editarActividad = (id, actividad) => {axios.put(`${API}/actividad/${id}`, actividad, {
    withCredentials: true,
}); console.log(id, actividad)}

export const eliminarActividad = (id) => {axios.delete(`${API}/actividad/${id}`, {id: id}, {
    withCredentials: true,
}); console.log(id)}

export const extraerSolicitud = () => axios.get(`${API}/solicitud`, {
    withCredentials: true,
});

export const agregarSolicitud = (solicitud) => axios.post(`${API}/solicitud`, solicitud, {
    withCredentials: true,
});

export const editarSolicitud = (id, solicitud) => {axios.put(`${API}/solicitud/${id}`, solicitud, {
    withCredentials: true,
}); console.log(id, solicitud)}

export const eliminarSolicitud = (id) => {axios.delete(`${API}/solicitud/${id}`, {id: id}, {
    withCredentials: true,
}); console.log(id)}