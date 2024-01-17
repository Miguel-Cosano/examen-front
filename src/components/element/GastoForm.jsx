import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import NavBar from "../NavBar.jsx";
import "../../assets/css/Main.css"
import React, {useEffect, useState} from "react";
import {Row} from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import {useParams} from "react-router-dom";
import routerService from "../../service/routerService.js";
import UploadWidget from "../cloudinary/uploadWidget.jsx";
import gastoService from "../../service/gastoService.js";

export function GastoForm() {
    const params = useParams();

    const [imageURL, setImageURL] = useState("");
    const [nombre, setNombre] = useState("");
    const [lugar, setLugar] = useState("");
    const [timeStamp, setTimeStamp] = useState("");
    const [gasto, setGasto] = useState({});//[nombre, lugar, fecha


    if (localStorage.getItem("email") === null || localStorage.getItem("email") === undefined) {
        alert("Tienes que iniciar sesión para poder crear un gasto");
        routerService.moveToMainPage();
    }

    const handleImageUpload = (imageUrl) => {
        setImageURL(imageUrl);
    };

    useEffect(() => {
        console.log("URL IMAGENES: ", imageURL);
    }, [imageURL]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.persist();

        const gasto = {
            concepto: event.target.concepto.value,
            importe: event.target.importe.value,
            imagen: imageURL,
            localizacion: event.target.localizacion.value,
        }

        let result = await gastoService.addGasto(gasto);
        if (result.status === 201) {
            alert("Gasto creado correctamente");
            routerService.moveToMainPage();
        } else {
            alert("Error al crear el gasto");
        }


    };

    return (
        <>
            <NavBar/>
            <Container fluid>
                <Row>
                    <h1>Crear Gasto</h1>
                </Row>
                <Row className={"h-100 d-flex align-items-center justify-content-center"}>
                    <Form style={{width: "25%"}} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="concepto">
                            <Form.Label>Concepto</Form.Label>
                            <Form.Control type="text" name={"concepto"} required={true} placeholder="Introduzca concepto"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="importe">
                            <Form.Label>Importe</Form.Label>
                            <Form.Control type="number" name={"importe"} required={true} placeholder="Introduzca importe"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="localizacion">
                            <Form.Label>Localización</Form.Label>
                            <Form.Control type="text" name={"localizacion"} required={true} placeholder="Introduzca localizacion"/>
                        </Form.Group>
                        <Form.Group>
                            <div>
                                <UploadWidget setImageUrl={handleImageUpload}/>
                            </div>
                            {imageURL && (
                                <div>
                                    <img src={imageURL} alt="Producto" style={{ maxWidth: '100%', marginTop: '10px' }} />
                                </div>
                            )}
                        </Form.Group>
                        <Button className={"mt-5"} type="submit">Crear gasto</Button>

                    </Form>
                </Row>
                <Row className={"mt-5"}>



                </Row>
            </Container>
        </>

    );
}
