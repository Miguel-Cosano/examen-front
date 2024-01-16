import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import imagen from "../../assets/image/no-image.png"
import routerService from "../../service/routerService.js";

export function Evento({evento}) {
    const fecha = new Date(evento.timeStamp);

    return (
        <>
            <Col md={3} align={"Center"}>
                <Card style={{
                    width: '18rem',
                    marginLeft: '1rem',
                    marginRight: '1rem',
                    marginBottom: '5rem',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // Add box shadow here
                }}>
                    <div style={{ position: 'relative', overflow: 'hidden', paddingTop: '75%' }}>
                        <Card.Img
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                            variant={"top"}
                            src={evento.imagen ? evento.imagen : imagen}
                        />
                    </div>
                    <Card.Body>
                        <Card.Title>{evento.nombre}</Card.Title>
                        <Card.Text>
                            Organizador: {evento.organizador}
                        </Card.Text>
                        <Card.Text>
                            Lugar: {evento.lugar}
                        </Card.Text>
                        <Card.Text>
                            Fecha: {fecha.getDate() + "/" +fecha.getMonth() + 1 + "/" + fecha.getFullYear()}
                        </Card.Text>
                        <Button className="mb-1" variant="primary" onClick={() => routerService.moveToInfoEvento(evento._id)}>Ver evento</Button>
                    </Card.Body>
                </Card>
            </Col>
        </>

    )
}