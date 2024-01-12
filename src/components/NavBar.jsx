import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import RouterService from "../service/routerService.js";
import {Col, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import GoogleOAuth from "./oauth/GoogleOauth.jsx";

function BasicExample() {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
                <Col className={"d-flex ps-3"} xs={14} md={7}>
                <Navbar.Brand href="">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="" onClick={RouterService.moveToMainPage}>Home</Nav.Link>
                    <Nav.Link href="" onClick={RouterService.moveToForm}>Crear Evento</Nav.Link>
                    <Nav.Link href="" onClick={RouterService.moveToUserInfo}>Info Usuario</Nav.Link>
                </Nav>
                </Col>
                <Col className={"d-flex"} xs={"auto"}>
                    <Form className={"me-5"}>
                        <Row>

                            <Col xs="auto">
                                <Form.Control
                                    type="text"
                                    placeholder="Search"
                                    className=" mr-sm-2"
                                />
                            </Col>
                            <Col xs="auto">
                                <Button type="submit">Buscar</Button>
                            </Col>

                        </Row>
                    </Form>
                    <GoogleOAuth/>
                </Col>

        </Navbar>)
}

export default BasicExample;