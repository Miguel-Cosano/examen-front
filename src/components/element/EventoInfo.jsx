import NavBar from "../NavBar.jsx";
import Button from "react-bootstrap/Button";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import eventoService from "../../service/eventoService.js";
import routerService from "../../service/routerService.js";
import imageNotFound from "../../assets/image/no-image.png";
export function EventoInfo() {
    let param = useParams();
    let idEvento = param.idEvento;

    const [evento, setEvento] = useState({});

    let imagenEvento = new Image();
    imagenEvento.src = evento.imagen;

    useEffect(() => {
        const fetchData = async() => {
            await eventoService.getEventoById(idEvento,setEvento);
        }

            fetchData();


    }, [])
    return (
        <>

            <NavBar></NavBar>
            <h1>Evento</h1>
            <img className="card-img-top mb-5 mb-md-0"
                 src={evento.imagen !== undefined ? evento.imagen : imageNotFound} alt="..."
                 style={imagenEvento.height > imagenEvento.width ? {
                     height: '500px',
                     width: 'auto'
                 } : {height: 'auto', width: '500px'}}/>

            <p>Nombre: {evento.nombre}</p>
            <p>Lugar: {evento.lugar}</p>
            <p>Fecha: {evento.timeStamp}</p>
            <p>Organizador: {evento.organizador}</p>
            <p>Coordenadas: latitud:{evento.lat} longitud: {evento.long}</p>

            <Button variant="primary" className={"me-3"}
                    onClick={() => eventoService.deleteEvento(idEvento)}>Eliminar</Button>
            <Button variant="secondary" onClick={() => routerService.moveToUpdateEvento(evento._id)}>Modificar</Button>

        </>
    )
}