import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios'
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import routerService from "../../service/routerService";
import Button from "react-bootstrap/Button";
import gastoService from "../../service/gastoService";
export default function GoogleOAuth() {
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);

    let email = localStorage.getItem('email');

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login failed: ', error)
    });

    const logOut = async () => {
        setProfile([]);
        setUser([]);
        await gastoService.logOut()
        
    };

    useEffect(() => {
        if (user.length !== 0) {
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    Accept: 'application/json'
                }
            }).then((res) => {
                setProfile(res.data);
                localStorage.setItem('email', res.data.email)
                localStorage.setItem('token', user.access_token)
            }).catch((err) => console.log(err));

            axios.post(import.meta.env.VITE_BACKEND_URL+'/user/logUser', {}, {
                headers: {
                    Authorization: `${user.access_token}`,
                    Accept: 'application/json'
                }
            }).then((res) => {
                console.log(res)
                window.location.reload();
            })
        }
    }, [user]);

    return(
        <>
            {(profile !== undefined && profile.length !== 0) || (email !== null && email.length !== 0)? (
                <div>
                    <Button className={"btn-dark btn-outline-light"} onClick={async () => {await logOut()}}>Log out</Button>
                </div>
            ) : (
                <Button className={"btn-dark btn-outline-light"} onClick={() => {
                    login();
                }}>Sign in with Google </Button>
            )}
        </>
    )
}