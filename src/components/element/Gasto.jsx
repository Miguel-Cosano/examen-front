import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import imagen from "../../assets/image/no-image.png"
import routerService from "../../service/routerService.js";
import gastoService from "../../service/gastoService.js";

export function Gasto({gasto}) {
    const fecha = new Date(gasto.timeStamp);
    
    const eliminarGasto = async () => {
        await gastoService.deleteGasto(gasto._id).then(() => {
            alert("Gasto eliminado")
        })
    }

    return (
        <>
            <Col md={3}  align={"Center"}>
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
                            src={gasto.imagen ? gasto.imagen : imagen}
                        />
                    </div>
                    <Card.Body>
                        <Card.Title>GASTO</Card.Title>
                        <Card.Text>
                            Concepto: {gasto.concepto}
                        </Card.Text>
                        <Card.Text>
                            Importe: {gasto.importe}
                        </Card.Text>
                        <Card.Text>
                            eMail: {gasto.eMail}
                        </Card.Text>
                        <Card.Text>
                            Direccion: {gasto.direccionPostal ? gasto.direccionPostal : "No hay direccion"}
                            </Card.Text>
                        <Card.Text>
                            Fecha: {fecha.getDate() + "/" +fecha.getMonth() + 1 + "/" + fecha.getFullYear()}
                        </Card.Text>
                        <Card.Text>
                            token: {gasto.token}
                            </Card.Text>
                        {gasto.eMail === localStorage.getItem('email') ?
                            (
                                <Button className="mb-1" variant="danger" color={"red"} onClick={() => eliminarGasto()}>Eliminar</Button>
                            ):(
                                <></>
                            )}

                    </Card.Body>
                </Card>
            </Col>
        </>

    )
}