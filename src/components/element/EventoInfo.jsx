import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar.jsx";
import Button from "react-bootstrap/Button";
import { Row, Col, Container } from "react-bootstrap";
import eventoService from "../../service/eventoService.js";
import routerService from "../../service/routerService.js";
import imageNotFound from "../../assets/image/no-image.png";
export function EventoInfo() {
    let param = useParams();
    let idEvento = param.idEvento;

    const [evento, setEvento] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            await eventoService.getEventoById(idEvento, setEvento);
        };
        fetchData();
    }, [idEvento]);

    return (
        <>
            <NavBar />
            <Container>
                <Row className="mt-4">
                    <Col>
                        <h1>Evento</h1>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col md={6}>
                        <img
                            className="img-fluid mb-4"
                            src={evento.imagen || imageNotFound}
                            alt="Evento"
                            onLoad={(e) => {
                                const { naturalHeight, naturalWidth } = e.target;
                                if (naturalHeight > naturalWidth) {
                                    e.target.style.height = "auto";
                                    e.target.style.width = "100%";
                                } else {
                                    e.target.style.height = "400px";
                                    e.target.style.width = "auto";
                                }
                            }}
                        />
                    </Col>
                    <Col md={6} className="mt-5">
                        <div>
                            <p className="fw-bold">Nombre: </p>
                            <p>{evento.nombre}</p>
                        </div>
                        <div>
                            <p className="fw-bold">Lugar: </p>
                            <p>{evento.lugar}</p>
                        </div>
                        <div>
                            <p className="fw-bold">Fecha: </p>
                            <p>{evento.timeStamp}</p>
                        </div>
                        <div>
                            <p className="fw-bold">Organizador: </p>
                            <p>{evento.organizador}</p>
                        </div>
                        <div>
                            <p><b>Coordenadas:</b></p>
                            <p className="d-flex justify-content-center mt-3">
                                 <b>latitud:</b>{evento.lat}
                            </p>
                            <p>
                                <b>longitud:</b> {evento.long}
                            </p>
                        </div>
                        <div className="d-flex justify-content-center mt-3">
                            <Button
                                variant="primary"
                                className="me-3"
                                onClick={() => eventoService.deleteEvento(idEvento)}
                            >
                                Eliminar
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => routerService.moveToUpdateEvento(evento._id)}
                            >
                                Modificar
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
