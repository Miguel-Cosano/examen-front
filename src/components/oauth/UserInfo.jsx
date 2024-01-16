import NavBar from "../NavBar.jsx";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import eventoService from "../../service/eventoService.js";
import routerService from "../../service/routerService.js";
import imageNotFound from "../../assets/image/no-image.png";
export function UserInfo() {
    let token = localStorage.getItem('token');
    if (!token) {
        alert("Tienes que iniciar sesión para ver tus datos");
        routerService.moveToMainPage();
    }

    const [userInfo, setUserInfo] = useState({});

    let imagenUsuario = new Image();
    imagenUsuario.src = userInfo.imagen;

    useEffect(() => {
        const fetchData = async () => {
            await eventoService.getUserInfo(setUserInfo);
        };

        fetchData();
    }, []);

    return (
        <>
            <NavBar />

            <div className="container mt-5">
                <h1>Información de usuario</h1>

                <div className="text-center mb-4">
                    <img
                        className="img-fluid mb-3"
                        src={userInfo.imagen !== undefined ? userInfo.imagen : imageNotFound}
                        alt="Usuario"
                        style={
                            imagenUsuario.height > imagenUsuario.width
                                ? { maxHeight: '150px', width: 'auto' }
                                : { maxWidth: '150px', height: 'auto' }
                        }
                    />
                </div>

                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <p className="lead">Nombre: {userInfo.nombre}</p>
                        <p className="lead">Email: {userInfo.email}</p>
                    </div>
                </div>
            </div>
        </>
    );
}
