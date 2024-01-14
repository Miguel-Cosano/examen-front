import GoogleOAuth from "./oauth/GoogleOauth.jsx";
import Container from "react-bootstrap/Container";
import React, {useEffect, useState} from "react";
import NavBar from "./NavBar.jsx";
import "../assets/css/Main.css"
import {Evento} from "./element/Evento.jsx";
import eventoService from "../service/eventoService.js";
import {Col, ListGroup, Row, Stack, Form,FormSelect, ListGroupItem} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import GMap from "./maps/GoogleMap.jsx";

export function MainPage() {
    const [eventos, setEventos] = useState([]);
    const [logs, setLogs] = useState([]);
    const [logsVisible, setLogsVisible] = useState(false);
    const [mapVisible, setMapVisible] = useState(false);
    const [locations, setLocations] = useState([]);
    useEffect(() => {
        eventoService.getEventos(setEventos)
    },[])

    useEffect(() => {
        eventoService.getLogs(setLogs)
    },[])


    const showLogsClick = () => {
        setLogsVisible(!logsVisible);
    }

    const handleFiltro = async (event) => {
        event.preventDefault();
        event.persist();

        const cp = event.target[0].value;
        const nombre = event.target[1].value;
        const organizador = event.target[2].value;
        await eventoService.filterEventos(nombre, organizador, cp ,setEventos);

        if(cp != ""){
            setMapVisible(true);

            for(let i = 0; i < eventos.length; i++){
                setLocations(locations => [...locations, {nombre: eventos[i].nombre,lat: eventos[i].lat, long: eventos[i].long}])
            }
        }

    }


    return (
        <>
            <NavBar/>
            <Row>
                <Button onClick={showLogsClick}>{!logsVisible ? ("Show Logs") : ("Hide Logs")}</Button>
                    {logsVisible && logs ? (
                        <>
                            <h1>Logs</h1>
                            <Container>
                                <ListGroup>
                                    {logs.map((log, key) => (
                                        <ListGroup.Item
                                            key={log.timeStamp}
                                            style={{ whiteSpace: "nowrap", overflow: "auto" }}
                                        >
                                            {log.timeStamp + ": " + log.message}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Container>
                        </>
                    ) : (<></>)}
            </Row>
            <Row xs="auto" className={"mb-5"}>
                <Form className={"d-flex"} onSubmit={handleFiltro}>
                    <Col xs="auto" className={"d-flex align-content-center"}>
                        <p className={"m-0 ms-3 me-3 align-self-center"}>Filtro</p>
                    </Col>
                    <Col xs="auto">
                        <Form.Control
                            type="text"
                            placeholder="Código postal"
                            className=" mr-sm-2"
                        />
                    </Col>
                    <Col xs="auto">
                        <Form.Control
                            type="text"
                            placeholder="Nombre"
                            className=" mr-sm-2"
                        />
                    </Col>
                    <Col xs="auto">
                        <Form.Control
                            type="text"
                            placeholder="Organizador"
                            className=" mr-sm-2"
                        />
                    </Col>
                    <Button xs="auto" type="submit">Aplicar filtro</Button>
                </Form>
            </Row>

            <Row>
                {eventos.length === 0 ? (
                    <h1>No hay eventos disponibles</h1>
                ) : (<h1>Eventos</h1>)}
            </Row>
            <Row>

                <Container fluid>
                    <Row>
                        {eventos.map((evento) => (
                            <Evento key={evento._id} evento={evento}/>
                        ))}
                    </Row>
                </Container>
            </Row>


                {mapVisible?
                    <>
                        <GMap locations={[locations]}/>
                    </>
                    :
                    <></>
                }


        </>
    );
}