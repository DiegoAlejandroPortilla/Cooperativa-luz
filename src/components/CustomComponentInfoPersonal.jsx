import React, { useState } from 'react';
import './CustomComponentInfoPersonal2.css'
import ChangePasswordRRHH from './ChangePasswordRRHH';
import {Card, CardHeader, CardBody, Image, Chip} from "@nextui-org/react";
import { useAuth } from "../context/AuthContext";


const CustomComponentInfoPersonal = ({ title }) => {
    const [mostrarCambioContraseña, setMostrarCambioContraseña] = useState(false);

    const { isAuthenticated, user } = useAuth();
  
  
    const handlePopupToggle = () => {
        setMostrarCambioContraseña(!mostrarCambioContraseña);
    };
  
    function capitalizeFirstLetter(inputString) {
        if (typeof inputString !== 'string') {
          return ''; // Return an empty string for non-string inputs
        }
        
        return inputString.charAt(0).toUpperCase() + inputString.slice(1);
      }
      console.log(user);
  
    return (
        <div className="custom-component-postulante">
            <h1 className="custom-title">{title}</h1>
            <hr className="custom-divider" />
            <div className="flex justify-between items-center p-2">
                <div className="w-full md:w-1/2 ml-40">
  
                <Card className="py-4">
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <p className="text-tiny uppercase font-bold">{isAuthenticated ? (
                        <>
                            {user && user.name1 ? (
                                <div>{user.name1} {user.name2} {user.lastname1} {user.lastname2}</div>
                            ) : (
                                <li>Loading...</li>
                            )}
                        </>
                    ) : (
                        null
                    )}</p>
                        <small className="text-default-500">{isAuthenticated ? (
                        <>
                            {user && user.email ? (
                                <div>{user.email}</div>
                            ) : (
                                <li>Loading...</li>
                            )}
                        </>
                    ) : (
                        null
                    )}</small>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                        <Image
                        alt="Card background"
                        className="object-cover rounded-xl"
                        src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                        width={270}
                        />
                    </CardBody>
                </Card>
                </div>
  
                <div className="flex w-full gap-2 ml-5"  style={{ flexDirection: 'column' }}>
  
                    <div className="flex w-full gap-3">
                        <Chip color="success" variant="dot">Tipo de identificacion: </Chip>
                        <p>{isAuthenticated ? (
                        <>
                            {user && user.name1 ? (
                                <div>Recursos Humano</div>
                            ) : (
                                <li>Loading...</li>
                            )}
                        </>
                    ) : (
                        null
                    )}</p>
                    </div>
  
                    <div className="flex w-full gap-3">
                        <Chip color="success" variant="dot">Nombres Completos: </Chip>
                        <p>{isAuthenticated ? (
                        <>
                            {user && user.name1 ? (
                                <div>{user.name1} {user.name2} {user.lastname1} {user.lastname2}</div>
                            ) : (
                                <li>Loading...</li>
                            )}
                        </>
                    ) : (
                        null
                    )}</p>
                    </div>
                    
                    
                    <div className="flex w-full gap-3">
                        <Chip color="success" variant="dot">Email institucional </Chip>
                        <p>{isAuthenticated ? (
                        <>
                            {user && user.email ? (
                                <div>{user.email}</div>
                            ) : (
                                <li>Loading...</li>
                            )}
                        </>
                    ) : (
                        null
                    )}</p>
                    </div>
  
  
  
  
                    <button className="password-button" onClick={handlePopupToggle}>
                        Cambiar contraseña
                    </button>
                </div>
            </div>
  
  
            {mostrarCambioContraseña && <ChangePasswordRRHH onClose={handlePopupToggle} />}
        </div>
    );
  }
  
export default CustomComponentInfoPersonal;