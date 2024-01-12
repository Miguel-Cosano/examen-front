import NavBar from "../NavBar.jsx";
import Button from "react-bootstrap/Button";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import eventoService from "../../service/eventoService.js";
import routerService from "../../service/routerService.js";
import imageNotFound from "../../assets/image/no-image.png";
export function UserInfo() {
    let token = localStorage.getItem('token');
    if(!token){
        alert("Tienes que iniciar sesion para ver tus datos")
        routerService.moveToMainPage();
    }

    const [userInfo, setUserInfo] = useState({});

    let imagenUsuario = new Image();
    imagenUsuario.src = userInfo.imagen;

    useEffect(() => {
        const fetchData = async() => {
            await eventoService.getUserInfo(setUserInfo);
        }

        fetchData();


    }, [])
    return (
        <>

            <NavBar></NavBar>
            <h1>Informacion de usuario</h1>
            <img className="card-img-top mb-5 mb-md-0"
                 src={userInfo.imagen !== undefined ? userInfo.imagen : imageNotFound} alt="..."
                 style={imagenUsuario.height > imagenUsuario.width ? {
                     height: '150px',
                     width: 'auto'
                 } : {height: '150', width: 'auto'}}/>

            <p>Nombre: {userInfo.nombre}</p>
            <p>Email: {userInfo.email}</p>

        </>
    )
}