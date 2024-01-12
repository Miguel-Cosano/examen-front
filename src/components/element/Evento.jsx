import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import imagen from "../../assets/image/no-image.png"
import routerService from "../../service/routerService.js";

export function Evento({evento}) {

    return (
        <>
            <Col md={3} align={"Center"}>
            <Card style={{ width: '18rem', marginLeft: '1rem', marginRight: '1rem', marginBottom: '5rem' }} >
                <Card.Img variant={"top"} src={evento.imagen ? evento.imagen : imagen} />
                <Card.Body>
                    <Card.Title>{evento.nombre}</Card.Title>
                    <Card.Text>
                        Organizador: {evento.organizador}
                    </Card.Text>
                    <Card.Text>
                        Lugar: {evento.lugar}
                    </Card.Text>
                    <Card.Text>
                        Fecha: {evento.timeStamp}
                    </Card.Text>
                    <Button className="mb-1" variant="primary" onClick={() => routerService.moveToInfoEvento(evento._id)} >Ver evento</Button>
                </Card.Body>
            </Card>
            </Col>
        </>
    )
}