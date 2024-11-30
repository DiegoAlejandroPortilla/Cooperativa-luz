import React, { useState, useEffect } from "react";
import { Input } from "@nextui-org/react";
import "./CustomComponentCali.css";
import PopupCalificacion from './PopupCalificacion';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Chip } from "@nextui-org/react";
import { AddNoteIcon } from "../assets/AddNoteIcon";
import { EditDocumentIcon } from "../assets/EditDocumentIcon";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import axios from 'axios';
import { set } from "react-hook-form";

const CustomComponentCalificacion = ({ title, parametros, candidato }) => {

  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["Item"]));
  const [selectedButton, setSelectedButton] = useState("");

  const [items, setItems] = useState([]);
  const [requisitos, setRequisitos] = useState([]);
  const [titulos, setTitulos] = useState([]);
  const [completo, setCompleto] = useState([]);

  //Titulos
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/procesocontratacion/titulo_exp")
        .then(response => response.json())
        .then(data => {
            const transformedData = data.map(item => ({
                tx_id: item[0],
                rq_id: item[1],
                tx_descripcion: item[2],
                tx_datalle: item[3],
                tx_puntaje_min: item[4],
                tx_puntaje_max: item[5],
                tx_puntaje_asignado: item[6],
                tx_observacion: item[7]
            }));
            setTitulos(transformedData);
        })
        .catch(error => {
            console.error("Hubo un error al recuperar los datos:", error);
        });
}, [setTitulos, titulos]);

//Requisitos
useEffect(() => {
  fetch("http://127.0.0.1:8000/api/v1/procesocontratacion/requisito")
      .then(response => response.json())
      .then(data => {
          const transformedData = data.map(item => ({
              rq_id: item[0],
              it_id: item[1],
              descripcion: item[2],

          }));
          setRequisitos(transformedData);
      })
      .catch(error => {
          console.error("Hubo un error al recuperar los datos:", error);
      });
}, [setRequisitos, requisitos]);

//Items
useEffect(() => {
  fetch("http://127.0.0.1:8000/api/v1/procesocontratacion/item")
      .then(response => response.json())
      .then(data => {
          const transformedData = data.map(item => ({
              it_id: item[0],
              nombre: item[2],

          }));
          setItems(transformedData);
      })
      .catch(error => {
          console.error("Hubo un error al recuperar los datos:", error);
      });
}, [setItems, items]);


function transformarAObjetosItems(){
  const itemsObject = {};

  for (const item of items) {
    itemsObject[item.it_id] = { nombre: item.nombre };
  }

  return itemsObject;
}

function transformarAObjetosRequisitos(){
  const requisitosObject = {};

  for (const requisito of requisitos) {
    requisitosObject[requisito.rq_id] = requisito;
  }

  return requisitosObject;
}

function transformarObjetosTitulos(){

  const titulosObject = {};
  for (const titulo of titulos) {
    titulosObject[titulo.tx_id] = titulo;
  }

  return titulosObject;
}

function getUniqueRqIdsByNombre(data, nombre) {
  const uniqueRqIds = new Set();

  for (const obj of data) {
    if (obj.nombre === nombre) {
      uniqueRqIds.add(obj.rq_id);
    }
  }

  return Array.from(uniqueRqIds);
}

function getMatchingTxIds(data, nombre, rq_id) {
  const matchingTxIds = new Set();

  for (const obj of data) {
    if (obj.nombre === nombre && obj.rq_id === rq_id) {
      matchingTxIds.add(obj.tx_id);
    }
  }

  return Array.from(matchingTxIds);
}

useEffect(() => {


  if (completo.length > 0) return;

  const itemsObject = transformarAObjetosItems();
  const requisitosObject = transformarAObjetosRequisitos();
  const titulosObject = transformarObjetosTitulos();

  console.log("items", itemsObject);
  console.log("requisitos", requisitosObject);
  console.log("titulos", titulosObject);

  for (const tx_id in titulosObject) {
    const titulo = titulosObject[tx_id];
    const rq_id = titulo.rq_id;
    const requisito = requisitosObject[rq_id];
    
    if (requisito) { // Check if requisito exists
      const it_id = requisito.it_id;
      const item = itemsObject[it_id];
  
      if (item) { // Check if item exists
        const mergedObject = {
          ...item,
          ...requisito,
          ...titulo,
        };
  
        completo.push(mergedObject);
      }
    }
  }
  
  console.log("completo", completo);
  setCompleto(completo);

  const nombreToSearch = 'Formación';
  const uniqueRqIds = getUniqueRqIdsByNombre(completo, nombreToSearch);

  console.log(uniqueRqIds); // Array of unique rq_id values for the given nombre

  const rqIdToSearch = 1;
  const matchingTxIds = getMatchingTxIds(completo, nombreToSearch, rqIdToSearch);
  console.log(matchingTxIds); // Array of matching tx_id values for the given nombre and rq_id
  
}, [completo, setCompleto, items, requisitos, titulos]);


  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  const value = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const renderRequisito1 = () => {
    if (selectedButton === "Maestria") {
      return (
        <Card className="carta">
          <CardBody>
            <h2>Puntaje:</h2>
            <p>Mínimo: 18.00  -  Máximo: 20.00</p>
          </CardBody>
        </Card>
      );
    } else if (selectedButton === "Doctorado") {
      return (
        <Card className="carta">
          <CardBody>
            <h2>Puntaje:</h2>
            <p>Mínimo: 0.00  -  Máximo: 3.00</p>
          </CardBody>
        </Card>
      );
    } else if (selectedButton === "Adicional") {
      return (
        <Card className="carta">
          <CardBody>
            <h2>Puntaje:</h2>
            <p>Mínimo: 0.00  -  Máximo: 1.50</p>
          </CardBody>
        </Card>
      );
    } else {
      return null; // Default content when no button is selected
    }
  };

  const renderRequisito2 = () => {

    if (selectedButton === "B1") {
      return (
        <Card className="carta">
          <CardBody>
            <h2>Puntaje:</h2>
            <p>Mínimo: 3  -  Máximo: 3.50</p>
          </CardBody>
        </Card>
      );
    } else if (selectedButton === "Int") {
      return (
        <Card className="Internacional">
          <CardBody>
            <h2>Puntaje:</h2>
            <p>Mínimo: 3  -  Máximo: 3.50</p>
          </CardBody>
        </Card>
      );
    } else if (selectedButton === "Ancestrales") {
      return (
        <Card className="carta">
          <CardBody>
            <h2>Puntaje:</h2>
            <p>Mínimo: 3  -  Máximo: 3.50</p>
          </CardBody>
        </Card>
      );
    } else {
      return null; // Default content when no button is selected
    }
  };

  return (
    <div className="custom-component-postulante">
      <h1 className="custom-title">{title}</h1>
      <hr className="custom-divider" />

      <div className="contenedorContratacion">
        <div className="etiquetas">
          <Chip color="success" className="mb-5" variant="bordered">Seleccionar item</Chip>

          {/* <Dropdown>
            <DropdownTrigger>
              <Button
                variant="flat"
                className="capitalize"
              >
                {selectedValue}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Single selection actions"
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys}
            >
              {statusOptions.map((column) => (
                <DropdownItem key={column.name} className="capitalize">
                  {capitalize(column.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown> */}

          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="flat"
                className="capitalize"
              >
                {value}
              </Button>
            </DropdownTrigger>
            <DropdownMenu variant="faded"
              aria-label="Dropdown menu with description"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys}
            >
              {items.map((column) => (
                <DropdownItem key={column.nombre} className="capitalize" startContent={<AddNoteIcon className={iconClasses} />}>
                  {column.nombre}
                </DropdownItem>
              ))}

            </DropdownMenu>
          </Dropdown>
        </div>

        <div className="requisitos">

          <Card className="carta1">
            <CardHeader className="flex gap-3">
              <div className="flex flex-col">
                <p className="text-md">Requisito 1</p>
                <p className="text-small text-default-500">Formación</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>Tener al menos grado académico de maestría reconocido y registrado por el Órgano
                Rector de la Política Pública de Educación Superior, en el campo amplio de reconocimiento
                vinculado a sus actividades de docencia o investigación, o vinculación con la sociedad.
                La Universidad dará preferencia a los perfiles que tengan adicionalmente el título de
                grado con afinidad al campo amplio del conocimiento de su formación de cuarto nivel.
              </p>
            </CardBody>
            <Divider />
            <CardFooter className="card-footer-container">
              <Button color="success" variant="bordered" onClick={() => handleButtonClick("Maestria")}>
                Maestria
              </Button>
              <Button color="success" variant="bordered" onClick={() => handleButtonClick("Doctorado")}>
                Doctorado
              </Button>
              <Button color="success" variant="bordered" onClick={() => handleButtonClick("Adicional")}>
                Adicional
              </Button>
              <div className="selected-card">
                {renderRequisito1()}
              </div>
              <div className="input-card">
                <Card className="input-card-content">
                  <CardBody>
                    <div className="input-row">
                      <p>Maestria:</p>
                      <Input type="number" placeholder="Ingrese el puntaje" />
                    </div>
                    <div className="input-row">
                      <p>Doctorado:</p>
                      <Input type="number" placeholder="Ingrese el puntaje" />
                    </div>
                    <div className="input-row">
                      <p>Adicional:</p>
                      <Input type="number" placeholder="Ingrese el puntaje" />
                    </div>
                  </CardBody>
                  <CardFooter>
                  <div className="btn-container">
                    <Button color="success" variant="bordered">
                      Enviar
                    </Button>
                  </div>
                  </CardFooter>
                </Card>
              </div>
            </CardFooter>

          </Card>

          <Card className="carta">
            <CardHeader className="flex gap-3">
              <div className="flex flex-col">
                <p className="text-md">Requisito 2</p>
                <p className="text-small text-default-500">Formación</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>Acreditar competencia con nivel B1 o equivalente en una lengua diferente al castellano;
                en una lengua diferente al castellano; o haber obtenido su título académico de tercer o cuarto
                nivel en un país con una lengua diferente al castellano. Los idiomas ancestrales serán considerados
                como lengua diferente al castellano.
              </p>
            </CardBody>
            <Divider />
            <CardFooter className="card-footer-container">
              <Button color="success" variant="bordered" onClick={() => handleButtonClick("B1")}>
                B1
              </Button>
              <Button color="success" variant="bordered" onClick={() => handleButtonClick("Int")}>
                Int
              </Button>
              <Button color="success" variant="bordered" onClick={() => handleButtonClick("Ancestrales")}>
                Ancestrales
              </Button>
              <div className="selected-card">
                {renderRequisito2()}
              </div>
              <div className="input-card">
                <Card className="input-card-content">
                  <CardBody>
                    <div className="input-row">
                      <p>B1:</p>
                      <Input type="number" placeholder="Ingrese el puntaje" />
                    </div>
                    <div className="input-row">
                      <p>Internacional:</p>
                      <Input type="number" placeholder="Ingrese el puntaje" />
                    </div>
                    <div className="input-row">
                      <p>Ancestrales:</p>
                      <Input type="number" placeholder="Ingrese el puntaje" />
                    </div>
                  </CardBody>
                  <CardFooter>
                  <div className="btn-container">
                    <Button color="success" variant="bordered">
                      Enviar
                    </Button>
                  </div>
                  </CardFooter>
                </Card>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Render the selected button's content */}

    </div>
  );
};

export default CustomComponentCalificacion;
