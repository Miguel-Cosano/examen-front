import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import {GoogleOAuthProvider} from "@react-oauth/google";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import "./assets/css/Main.css"
import {MainPage} from "./components/MainPage.jsx";
import NavBar from "./components/NavBar.jsx";
import {GastoForm} from "./components/element/GastoForm.jsx";
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
        element: <GastoForm />
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
