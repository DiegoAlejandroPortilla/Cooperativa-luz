import React from 'react';
import {Tabs, 
        Tab, 
        Card, 
        CardBody,
        } from "@nextui-org/react";

import styles from "./stylesCRUD.module.css";
// import Boton from "../components/Boton.jsx"
import Tabla from "../components/Tabla.jsx"
import Actividad from "../components/CRUD/Actividad.jsx"
import CAmplio from "../components/CRUD/CAmplio.jsx"
import CInicio from "../components/CustomComponentInfo"
import CEspecifico from "../components/CRUD/CEspecifico.jsx"
import Sede from "../components/CRUD/Sede.jsx"
import Departamento from "../components/CRUD/Departamento.jsx"
import Item from "../components/CRUD/Item.jsx"
import Contratacion from "../components/CRUD/Contratacion.jsx"
import PersonalA from "../components/CRUD/PersonalA.jsx"
import Tituloexp from "../components/CRUD/Tituloexp.jsx"
import Postulacion from "../components/CRUD/Postulacion.jsx"
import Requisito from "../components/CRUD/Requisito.jsx"
import SolicitudCrud from '../components/CRUD/SolicitudCrud.jsx';


const Solicitud = () => {

  return (
    <div className={styles.container}>


    <Tabs
      classNames={{
        tabList: styles.tabList,
        tab: styles.tab,
        tabContent: styles.tabContent,
        base: styles.base,
        panel: styles.panel,
      }} 
      aria-label="Options">

      <Tab key="inicio" title="Inicio">
        <Card>
          <CardBody>
            <CInicio/>
          </CardBody>
        </Card>  
      </Tab>

      <Tab key="candidato" title="Candidato">
        <Card>
          <CardBody>
            <Tabla/>
          </CardBody>
        </Card>  
      </Tab>
        
      <Tab key="actividad" title="Actividad">
        <Card>
          <CardBody>
            <Actividad/>
          </CardBody>
        </Card>  
      </Tab>

      <Tab key="campoAmplio" title="Campo Amplio">
        <Card>
          <CardBody>
            <CAmplio/>
          </CardBody>
        </Card>  
      </Tab>

      <Tab key="campoEspecifico" title="Campo Especifico">
        <Card>
          <CardBody>
            <CEspecifico/>
          </CardBody>
        </Card>  
      </Tab>

      <Tab key="sede" title="Sede">
        <Card>
          <CardBody>
            <Sede/>
          </CardBody>
        </Card>  
      </Tab>

      <Tab key="departamento" title="Departamento">
        <Card>
          <CardBody>
            <Departamento/>
          </CardBody>
        </Card>  
      </Tab>

      <Tab key="personalA" title="Personal Académico">
        <Card>
          <CardBody>
            <PersonalA/>
          </CardBody>
        </Card>
      </Tab>

      <Tab key="item" title="Item">
        <Card>
          <CardBody>
            <Item/>
          </CardBody>
        </Card>  
      </Tab>

      <Tab key="contratación" title="Contratación">
        <Card>
          <CardBody>
            <Contratacion/>
          </CardBody>
        </Card>  
      </Tab>

      <Tab key="solicitud" title="Solicitud">
        <Card>
          <CardBody>
            <SolicitudCrud/>
          </CardBody>
        </Card>  
      </Tab>

      <Tab key="postulación" title="Postulación">
        <Card>
          <CardBody>
            <Postulacion/>
          </CardBody>
        </Card>  
      </Tab>

      <Tab key="requisito" title="Requisito">
        <Card>
          <CardBody>
            <Requisito/>
          </CardBody>
        </Card>  
      </Tab>

      <Tab key="tituloexp" title="Título Experiencia">
        <Card>
          <CardBody>
            <Tituloexp/>
          </CardBody>
        </Card>
      </Tab>

      <Tab key="oferta" title="Oferta">
        <Card>
          <CardBody>
            <div>
              <h1>Introduzca su pagina aqui. (Tildes omitidas intencionalmente)</h1>
            </div>
          </CardBody>
        </Card>  
      </Tab>

    </Tabs>

  </div>  
  );
};

export default Solicitud;
