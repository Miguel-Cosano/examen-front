import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import NavBar from "../NavBar.jsx";
import "../../assets/css/Main.css"
import React, {useEffect, useState} from "react";
import {Row} from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import eventoService from "../../service/eventoService.js";
import {useParams} from "react-router-dom";
import routerService from "../../service/routerService.js";
import UploadWidget from "../cloudinary/uploadWidget.jsx";

export function EventoForm() {
    const params = useParams();
    const idEvento = params.idEvento;

    const [imageURL, setImageURL] = useState("");
    const [nombre, setNombre] = useState("");
    const [lugar, setLugar] = useState("");
    const [timeStamp, setTimeStamp] = useState("");
    const [evento, setEvento] = useState({});//[nombre, lugar, fecha



    if(localStorage.getItem("email") === null || localStorage.getItem("email") === undefined){
        alert("Tienes que iniciar sesión para poder crear un evento");
        routerService.moveToMainPage();
    }

    const handleImageUpload = (imageUrl) => {
        setImageURL(imageUrl);
    };

    useEffect(() => {
        if(idEvento) {
            eventoService.getEventoById(idEvento, setEvento);
        }
    }, [idEvento]);

    useEffect(() => {
        if(evento){
            if (evento.nombre === undefined){evento.nombre = "";}else{setNombre(evento.nombre);}
            document.getElementById("nombre").value = evento.nombre;

            if (evento.lugar === undefined){evento.lugar = "";}else{setLugar(evento.lugar);}
            document.getElementById("lugar").value = evento.lugar;

            if(evento.timeStamp){
                const fechaEventoFormateada = new Date(evento.timeStamp).toISOString().split('T')[0];
                setTimeStamp(fechaEventoFormateada);
                document.getElementById("timeStamp").value = fechaEventoFormateada;
            }else{
                setTimeStamp("");
            }

        }
    }, [evento]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.persist();

        if(idEvento){
            const evento = {
                _id: idEvento,
                nombre: document.getElementById("nombre").value,
                lugar: document.getElementById("lugar").value,
                timeStamp: document.getElementById("timeStamp").value,
                organizador: localStorage.getItem("email"),
                imagen: imageURL,
                lat: undefined,
                long: undefined
            }

            let result = await eventoService.updateEvento(evento);
            if(result.status === 200){
                alert("Evento actualizado correctamente");
                routerService.moveToInfoEvento(result.data.evento._id);
            }else{
                alert("Error al actualizar el evento");
            }

        }else{
            const evento = {
                nombre: document.getElementById("nombre").value,
                lugar: document.getElementById("lugar").value,
                timeStamp: document.getElementById("timeStamp").value,
                organizador: localStorage.getItem("email"),
                imagen: imageURL,
                lat: undefined,
                long: undefined
            }

            let result = await eventoService.addEvento(evento);
            if(result.status === 201){
                alert("Evento creado correctamente");
                routerService.moveToInfoEvento(result.data.evento._id);
            }else{
                alert("Error al crear el evento");
            }

        }




    };

    return (
        <>
        <NavBar/>
        <Container fluid>
            <Row>
                <h1>Crear Evento</h1>
            </Row>
            <Row className={"h-100 d-flex align-items-center justify-content-center"}>
                <Form style={{width:"25%"}} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="nombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control  type="text"  name={"nombre"} required={true} placeholder="Introduzca nombre" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="lugar">
                        <Form.Label>Lugar</Form.Label>
                        <Form.Control type="number"  name={"lugar"} required={true} placeholder="Introduzca código postal" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="timeStamp">
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control type="date" name="timeStamp" required={true}/>
                    </Form.Group>
                    <Form.Group>
                        <div>
                        <UploadWidget setImageUrl={handleImageUpload} />
                        </div>
                        {imageURL && (
                            <div>
                                <img src={imageURL} alt="Producto" style={{ maxWidth: '100%', marginTop: '10px' }} />
                            </div>
                        )}
                    </Form.Group>
                    <Button className={"mt-5"} type="submit">Submit form</Button>

                </Form>
            </Row>

        </Container>
        </>

    );
}
