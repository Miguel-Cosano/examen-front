import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import {GoogleOAuthProvider} from "@react-oauth/google";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {LoginPage} from "./components/LoginPage.jsx";
import "./assets/css/Main.css"
import {MainPage} from "./components/MainPage.jsx";
import {EventoForm} from "./components/element/EventoForm.jsx";
import NavBar from "./components/NavBar.jsx";
import {EventoInfo} from "./components/element/EventoInfo.jsx";
import {UserInfo} from "./components/oauth/UserInfo.jsx";


const   router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage />
    },
    {
        path: '/main',
        element: <MainPage />
    },
    {
        path: '/form/',
        element: <EventoForm />
    },
    {
      path: '/updateEvento/:idEvento',
      element: <EventoForm />
    },
    {
        path: '/evento/:idEvento',
        element: <EventoInfo />
    },
    {
        path: '/infoUser',
        element: <UserInfo />
    }

])


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
            integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
            crossOrigin="anonymous"
        />
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <RouterProvider router={router} />
        </GoogleOAuthProvider>
    </React.StrictMode>,
)
