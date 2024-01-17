import GoogleOAuth from "./oauth/GoogleOauth.jsx";
import Container from "react-bootstrap/Container";
import React, {useEffect, useState} from "react";
import NavBar from "./NavBar.jsx";
import "../assets/css/Main.css"
import {Gasto} from "./element/Gasto.jsx";
import gastoService from "../service/gastoService.js";
import {Col, ListGroup, Row, Stack, Form,FormSelect, ListGroupItem} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import GMap from "./maps/GoogleMap.jsx";

export function MainPage() {
    const [gastos, setGastos] = useState([]);
    const [locations, setLocations] = useState([]);
    const [saldo, setSaldo] = useState(0);
    useEffect(() => {
        if(gastos.length === 0){
            gastoService.getGastos(setGastos,setLocations);
        }
        
    },[])

    useEffect(() => {
        if(localStorage.getItem("email") !== null || localStorage.getItem("email") !== undefined) {
            const fetchSaldo = async () => {
                
                let result = await gastoService.getSaldo(localStorage.getItem("email"));
                setSaldo(result);
            }
            fetchSaldo();
        }
        

    },[gastos])
    
    return (
        <>
            <NavBar/>

            <Row>
                {localStorage.getItem("email") !== null ?
                    ( <h1>Saldo: {saldo} </h1>)
                    :
                    (<> </>)}

            </Row>

            <Row>
                {gastos.length === 0 ? (
                    <h1>No hay gastos disponibles</h1>
                ) : (<h1>Gastos</h1>)}
            </Row>
            <Row className={"mt-5"}>
                <Container fluid>
                    <Row>
                        {gastos.map((gasto) => (
                            <Gasto key={gasto._id} gasto={gasto}/>
                        ))}
                    </Row>
                </Container>
            </Row>





            <GMap locations={[locations]}/>




        </>
    );
}