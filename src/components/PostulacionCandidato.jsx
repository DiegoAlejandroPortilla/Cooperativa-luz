import React, { useEffect, useState,  useCallback, useMemo } from 'react';
import { extraerOferta, extraerContrato, extraerTipoContrato, extraerPersonalAcademico, extraercampoAmplio, extraercampoEspecifico, extraerSede, extraerDepartamento, extraerActividad, agregarSolicitud} from "../api/contratacion";
import PopupDocument from './PopupDocument';
import Popup from './Popup';
import './CustomComponentForm.css'
import {Snippet} from "@nextui-org/react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import { set } from 'react-hook-form';
import { useAuth } from "../context/AuthContext";

const PostulacionCandidato = ({ title }) => {
    const { user } = useAuth();
    const [contratos, setContratos] = useState([]);
    const [ofertas, setOfertas] = useState([]);
    const [sofertas, setSOfertas] = useState([]);
    const [personalAcademico, setPersonalAcademico] = useState([]);
    const [campoAmplio, setCampoAmplio] = useState([]);
    const [campoEspecifico, setCampoEspecifico] = useState([]);
    const [sede, setSede] = useState([]);
    const [departamento, setDepartamento] = useState([]);
    const [actividad, setActividad] = useState([]);
    const [tipoContrato, setTipoContrato] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [showPopup2, setShowPopup2] = useState(false);
    const [vacantes, setVacantes] = useState(0);
    const [horas, setHoras] = useState(0);

    const [selectedValuesArray, setSelectedValuesArray] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [valores, setValores] = useState([]);
    const [noVacancies, setNoVacancies] = useState(false);
    const [showSelections, setShowSelections] = useState(false);

    useEffect(() => {
        Promise.all([
            extraerContrato(),
            extraerOferta(),
            extraerTipoContrato(),
            extraerPersonalAcademico(),
            extraercampoAmplio(),
            extraercampoEspecifico(),
            extraerSede(),
            extraerDepartamento(),
            extraerActividad(),
        ])
            .then((responses) => {
                const [
                    contratoRes,
                    ofertaRes,
                    tipoContratoRes,
                    personalAcademicoRes,
                    campoAmplioRes,
                    campoEspecificoRes,
                    sedeRes,
                    departamentoRes,
                    actividadRes,
                ] = responses;

                if (contratoRes.data && contratoRes.data.contrato) {
                    setContratos(contratoRes.data.contrato); //POSTULACION
                    console.log("contratosss", contratoRes.data.contrato);
                } else {
                    console.log("Datos de contratos no encontrados en la respuesta.");
                }

                if (ofertaRes.data && ofertaRes.data.oferta) {
                    setSOfertas(ofertaRes.data);
                    setOfertas(ofertaRes.data.oferta);
                    console.log("ofertasss", ofertaRes.data.oferta);
                    console.log("ofertas seleccion", ofertaRes.data);
                } else {
                    console.log("Datos de ofertas no encontrados en la respuesta.");
                }

                if (tipoContratoRes.data && tipoContratoRes.data.tipoContrato) {
                    setTipoContrato(tipoContratoRes.data.tipoContrato); //CONTRATO
                    console.log("tipoContrato", tipoContratoRes.data.tipoContrato);
                } else {
                    console.log("Datos de tipo de contratos no encontrados en la respuesta.");
                }

                if (personalAcademicoRes.data && personalAcademicoRes.data.personalAcademico) {
                    setPersonalAcademico(personalAcademicoRes.data.personalAcademico);
                    console.log("personalAcademico", personalAcademicoRes.data.personalAcademico);
                } else {
                    console.log("Datos de personal académico no encontrados en la respuesta.");
                }

                if (campoAmplioRes.data && campoAmplioRes.data.campoAmplio) {
                    setCampoAmplio(campoAmplioRes.data.campoAmplio);
                } else {
                    console.log("Datos de campo amplio no encontrados en la respuesta.");
                }

                if (campoEspecificoRes.data && campoEspecificoRes.data.campoEspecifico) {
                    setCampoEspecifico(campoEspecificoRes.data.campoEspecifico);
                } else {
                    console.log("Datos de campo especifico no encontrados en la respuesta.");
                }

                if (sedeRes.data && sedeRes.data.sede) {
                    setSede(sedeRes.data.sede);
                } else {
                    console.log("Datos de sede no encontrados en la respuesta.");
                }

                if (departamentoRes.data && departamentoRes.data.departamento) {
                    setDepartamento(departamentoRes.data.departamento);
                } else {
                    console.log("Datos de departamento no encontrados en la respuesta.");
                }

                if(actividadRes.data && actividadRes.data.actividad){
                    setActividad(actividadRes.data.actividad);
                } else {
                    console.log("Datos de actividad no encontrados en la respuesta.");
                }

            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    const handleOpenPopup = () => {
        setShowPopup(true);
    };

    function findMatchingSubstrings(data, value, index) {
        const matchingData = {};
      
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const subArray = data[key];
            if (subArray[index] === value) {
              matchingData[key] = subArray;
            }
          }
        }
      
        return matchingData;
    }

    //Mapeo la posicion con la BD
    // public.oferta (
    //     ofe_id integer NOT NULL, [0]
    //     post_id integer, [1]
    //     con_id integer, [2]
    //     ce_id integer, [3]
    //     ca_id integer, [4]
    //     sede_id integer, [5]
    //     dept_id integer, [6]
    //     pa_id integer, [7]
    //     act_id integer, [8]
    //     ofe_vacantes integer, [9]
    //     ofe_horas integer [10]
    // );

    //Post_id = contratos 
    const fieldIndexMapping = useMemo(() => ({
        actividad: 8,
        campoAmplio: 4,
        campoEspecifico: 3,
        contratos: 1,
        departamento: 6,
        personalAcademico: 7,
        tipoContrato: 2,
        sede: 5
    }), []);

    //Funcion para encontrar las coincidencias una por una
    const filterData = useCallback((data, filters) => {
        let result = { ...data };
        const propertyCount = Object.keys(filters).length;
        if(propertyCount < 8) return {};
        for (const field in filters) {
          if (filters.hasOwnProperty(field)) {
            const value = filters[field];
            const index = fieldIndexMapping[field];
    
            result = findMatchingSubstrings(result, value, index);
    
            if (Object.keys(result).length === 0) {
              console.log("No matching object found.");
              return {};
            }
          }
        }
        return result;
      }, [fieldIndexMapping]);

    const handleSeleccionar = useCallback(() => {
        console.log("selectedValuesArray", selectedValuesArray)
        for (const key in selectedValuesArray) {
            if (selectedValuesArray.hasOwnProperty(key)) {
            valores[key] = selectedValuesArray[key][0];
            }
        }
        
        console.log("valores: ", valores);
        console.log("ofertas: ", ofertas);
        const combinedArray =  filterData(ofertas, valores);
        const coincidencia = Object.values(combinedArray).flat();
        console.log("coincidencia", coincidencia);
        const propertyCount = Object.keys(coincidencia).length;
        console.log(propertyCount);
  

        if (propertyCount === 0) {
            setNoVacancies(true);
            setShowTable(false);
        } else {
            setNoVacancies(false);
            setSelectedOffer(coincidencia);
            setShowTable(true);
        }
        setShowSelections(true);

        setVacantes(coincidencia[9]);
        setHoras(coincidencia[10]);

        console.log(vacantes, horas);

    }, [selectedValuesArray, filterData, ofertas, setSelectedOffer, valores, vacantes, horas]);

    useEffect(() => {
        handleSeleccionar();
    }, [handleSeleccionar]);

    const handleAgregar = (info) => {
        let infoasubir = {
            cand_id: user.id,
            rh_id: 6,
            sol_aprobacion: null,
            ofe_id: info[0],
            sol_notafinal: null,
        }
        console.log("infoasubir", infoasubir);
        agregarSolicitud(infoasubir);
            
        setShowPopup2(true);
    }

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const [selectedIDs, setSelectedIDs] = useState({
        contratos: "",
        actividad: "",
        tipoContrato: "",
        personalAcademico: "",
        campoAmplio: "",
        campoEspecifico: "",
        sede: "",
        departamento: "",
    });

    const [dropdownDisabled, setDropdownDisabled] = useState({
        actividad: true,
        tipoContrato: true,
        personalAcademico: true,
        campoAmplio: true,
        campoEspecifico: true,
        sede: true,
        departamento: true,
    });

    const handleSelectChange = (key, selectedValue, selectedMapping) => {

        console.log("key", key);
        console.log("selectecValue",selectedValue);
        console.log("selectedMapping", selectedMapping);

        setSelectedIDs(prevSelectedIDs => ({
            ...prevSelectedIDs,
            [key]: selectedValue,
        }));

        setSelectedValuesArray(prevSelectedValues => {
            const updatedValues = {
                ...prevSelectedValues,
                [key]: selectedMapping
            };
            return updatedValues;
        });

        console.log(selectedIDs);
        console.log(selectedValuesArray);
    };

    useEffect(() => {
        setDropdownDisabled({
            actividad: false,
        });
    }, [selectedIDs]);

    return (
        <div className="custom-component-postulante">
            <h1 className="custom-title">{title}</h1>
            <hr className="custom-divider" />
            
            {showSelections && (
                <div className='form-line-container'>
                    <div className="form-line">
                        <div>
                            <h1>Proceso:</h1>
                            <select
                                onChange={(e) => handleSelectChange("contratos", e.target.value, contratos.find(item => item[1] === e.target.value))}
                                disabled={dropdownDisabled.contratos}
                            >
                                <option value="">Seleccionar Proceso</option>
                                {contratos.map((item) => (
                                    <option key={item[0]} value={item[1]}>
                                        {item[1]}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <h1>Actividad:</h1>
                            <select
                                onChange={(e) => handleSelectChange("actividad", e.target.value, actividad.find(item => item[1] === e.target.value))}
                                disabled={dropdownDisabled.actividad}
                            >
                                <option value="">Seleccionar Actividad</option>
                                {actividad.map((item) => (
                                    <option key={item[0]} value={item[1]}>
                                        {item[1]}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <h1>Tipo de Contrato:</h1>
                            <select
                                onChange={(e) => handleSelectChange("tipoContrato", e.target.value, tipoContrato.find(item => item[1] === e.target.value))}
                                disabled={dropdownDisabled.tipoContrato}
                            >
                                <option value="">Seleccionar Tipo de Contrato</option>
                                {tipoContrato.map((item) => (
                                    <option key={item[0]} value={item[1]}>
                                        {item[1]}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-line">
                        <div>
                            <h1>Tipo de personal académico:</h1>
                            <select
                                onChange={(e) => handleSelectChange("personalAcademico", e.target.value, personalAcademico.find(item => item[2] === e.target.value))}
                                disabled={dropdownDisabled.personalAcademico}
                            >
                                <option value="">Seleccionar Tipo de Personal Académico</option>
                                {personalAcademico.map((item) => (
                                    <option key={item[0]} value={item[2]}>
                                        {item[2]}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <h1>Campo Amplio:</h1>
                            <select
                                onChange={(e) => handleSelectChange("campoAmplio", e.target.value, campoAmplio.find(item => item[2] === e.target.value))}
                                disabled={dropdownDisabled.campoAmplio}
                            >
                                <option value="">Seleccionar Campo Amplio</option>
                                {campoAmplio.map((item) => (
                                    <option key={item[0]} value={item[2]}>
                                        {item[2]}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>



                    <div className="form-line">
                        <div>
                            <h1>Campo específico:</h1>
                            <select
                                onChange={(e) => handleSelectChange("campoEspecifico", e.target.value, campoEspecifico.find(item => item[2] === e.target.value))}
                                disabled={dropdownDisabled.campoEspecifico}
                            >
                                <option value="">Seleccionar Campo Específico</option>
                                {campoEspecifico.map((item) => (
                                    <option key={item[0]} value={item[2]}>
                                        {item[2]}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <h1>Sede:</h1>
                            <select
                                onChange={(e) => handleSelectChange("sede", e.target.value, sede.find(item => item[2] === e.target.value))}
                                disabled={dropdownDisabled.sede}
                            >
                                <option value="">Seleccionar Sede</option>
                                {sede.map((item) => (
                                    <option key={item[0]} value={item[2]}>
                                        {item[2]}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <h1>Departamento:</h1>
                            <select
                                onChange={(e) => handleSelectChange("departamento", e.target.value, departamento.find(item => item[2] === e.target.value))}
                                disabled={dropdownDisabled.departamento}
                            >
                                <option value="">Seleccionar Departamento</option>
                                {departamento.map((item) => (
                                    <option key={item[0]} value={item[2]}>
                                        {item[2]}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            )}
            {/* <div className='buttons-container'>
                <button className='button-enviar-info' onClick={handleSeleccionar}>Seleccionar Campos</button>
                {showPopup2 && (
                    <Popup
                        mensaje="DATOS SUBIDOS CORRECTAMENTE"
                        ruta="/inicioPostulante"
                        onClose={handleClosePopup}
                    />
                )}
            </div> */}
            {showTable ? (
                <>
                    <div className="table-container m-8">
                        <Snippet symbol="" hideCopyButton color="success" variant="bordered">
                            Información de la oferta seleccionada
                        </Snippet>

                        <div className='tablaN'>
                            <Table aria-label="Example static collection table">
                                <TableHeader>
                                    <TableColumn>VACANTES DISPONIBLES</TableColumn>
                                    <TableColumn>HORAS A TRABAJAR</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    <TableRow key="1">
                                        <TableCell>{vacantes}</TableCell>
                                        <TableCell>{horas}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                    <div className='buttons-container'>
                        <button className='button-enviar-info' onClick={() => handleAgregar(selectedOffer)}>Enviar Información</button>
                        {showPopup2 && (
                            <Popup
                                mensaje="DATOS SUBIDOS CORRECTAMENTE"
                                ruta="/inicioPostulante"
                                onClose={handleClosePopup}
                            />
                        )}
                    </div>
                </>
            ) : (
                
                <div className='no-vacancies-message'>
                    <Snippet symbol="" hideCopyButton color="danger" variant="bordered">
                        {noVacancies ? "No existen vacantes disponibles" : null}
                    </Snippet>
                </div>

            )}

        </div>
    );
};

export default PostulacionCandidato;