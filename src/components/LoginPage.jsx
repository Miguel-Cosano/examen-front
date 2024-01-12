import React, {useEffect, useState} from 'react'
import Container from "react-bootstrap/Container";
import GoogleOAuth from "./oauth/GoogleOauth.jsx";
export function LoginPage() {

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
            <GoogleOAuth/>
        </Container>
    )
}