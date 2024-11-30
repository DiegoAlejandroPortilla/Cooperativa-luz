import React, { useContext, useEffect } from 'react';
import './styles.css';
import MenuRRHH from '../components/MenuRRHH';
import TopBar from '../components/TopBar';
import CustomComponentPrueba from '../components/customPrueba'
import { useAuth } from "../context/AuthContext";



import styles from "../styles/Solicitud.module.css";
// import Boton from "../components/Boton.jsx"
import Tabla from "../components/Tabla.jsx"
import Actividad from "../components/CRUD/Actividad.jsx"
import CAmplio from "../components/CRUD/CAmplio.jsx"
import CInicio from "../components/CustomComponentInfo"

const InfoPostRRHH = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="parent-container">
      <div className="plataforma-container">
        <div className="top-item">
          <TopBar>
          </TopBar>
        </div>
        <div className="left-item">
          <MenuRRHH
            title='Usuario'
            subtitle1='Solicitudes'
            subtitle2='Postulación'
            subtitle3='Información personal'
          ></MenuRRHH>
        </div>
        <div className="right-item">
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
                    <CInicio />
                  </CardBody>
                </Card>
              </Tab>

              <Tab key="candidato" title="Candidato">
                <Card>
                  <CardBody>
                    <Tabla />
                  </CardBody>
                </Card>
              </Tab>

              <Tab key="actividad" title="Actividad">
                <Card>
                  <CardBody>
                    <Actividad />
                  </CardBody>
                </Card>
              </Tab>

              <Tab key="campoAmplio" title="Campo Amplio">
                <Card>
                  <CardBody>
                    <CAmplio />
                  </CardBody>
                </Card>
              </Tab>

              <Tab key="campoEspecifico" title="Campo Especifico">
                <Card>
                  <CardBody>
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </CardBody>
                </Card>
              </Tab>

              <Tab key="sede" title="Sede">
                <Card>
                  <CardBody>
                    <div>
                      <h1>Introduzca su pagina aqui. (Tildes omitidas intencionalmente)</h1>
                    </div>
                  </CardBody>
                </Card>
              </Tab>

              <Tab key="departamento" title="Departamento">
                <Card>
                  <CardBody>
                    <div>
                      <h1>Introduzca su pagina aqui. (Tildes omitidas intencionalmente)</h1>
                    </div>
                  </CardBody>
                </Card>
              </Tab>

              <Tab key="item" title="Item">
                <Card>
                  <CardBody>
                    <div>
                      <h1>Introduzca su pagina aqui. (Tildes omitidas intencionalmente)</h1>
                    </div>
                  </CardBody>
                </Card>
              </Tab>

              <Tab key="contratación" title="Contratación">
                <Card>
                  <CardBody>
                    <div>
                      <h1>Introduzca su pagina aqui. (Tildes omitidas intencionalmente)</h1>
                    </div>
                  </CardBody>
                </Card>
              </Tab>

              <Tab key="solicitud" title="Solicitud">
                <Card>
                  <CardBody>
                    <div>
                      <h1>Introduzca su pagina aqui. (Tildes omitidas intencionalmente)</h1>
                    </div>
                  </CardBody>
                </Card>
              </Tab>

              <Tab key="postulación" title="Postulación">
                <Card>
                  <CardBody>
                    <div>
                      <h1>Introduzca su pagina aqui. (Tildes omitidas intencionalmente)</h1>
                    </div>
                  </CardBody>
                </Card>
              </Tab>

              <Tab key="requisito" title="Requisito">
                <Card>
                  <CardBody>
                    <div>
                      <h1>Introduzca su pagina aqui. (Tildes omitidas intencionalmente)</h1>
                    </div>
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
        </div>
        <video className="background-video" autoPlay loop muted>
          <source src={require('../assets/inicio.mp4')} type="video/mp4" />
          Tu navegador no admite la reproducción de videos.
        </video>
      </div>
    </div>
  );
};

export default InfoPostRRHH;