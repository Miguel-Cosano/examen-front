import axios from "axios";
import {
    setKey,
    setDefaults,
    setLanguage,
    setRegion,
    fromAddress,
    fromLatLng,
    fromPlaceId,
    setLocationType,
    geocode,
    RequestType,
} from "react-geocode";

import routerService from "./routerService.js";

setDefaults({
    key: "AIzaSyAC19b_P5mghLXPfbcmk-nn4luaONE8T0Q", // Your API key here.
    language: "es", // Default language for responses.
    region: "es", // Default region for responses.
});

const getCoordenadas = async (direccion,setCoordeandas) => {
    let response = await fromAddress(direccion).catch(console.error);
    console.log("Coordenadas: " + response.results[0].geometry.location)
    return response.results[0].geometry.location;
}
const getEventos = async (setEventos) => {
    let res = await axios.get(import.meta.env.VITE_BACKEND_URL+"/evento", {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }

    }).catch(
        error => {
            if(error.status === 401){
                alert("Token de sesion no valido");
                logOut();
            } });
    setEventos(res.data.eventos);
}

const filterEventos = async (nombre, organizador, cp) => {
    let coordenadas = {};
    if(cp !== undefined && cp !== null && cp !== ""){
        coordenadas = await getCoordenadas(cp);
    }
    let lat = coordenadas? coordenadas.lat : undefined;
    let long = coordenadas? coordenadas.lng : undefined;
    let res = await axios.post(import.meta.env.VITE_BACKEND_URL+"/evento/filter",
    {
        nombre: nombre,
        organizador: organizador,
        lat: lat,
        long: long
        }
    ,{
        headers: {
            'Access-Control-Allow-Origin': '*'
        }}).catch(
        error => {
            if(error.status === 401){
                alert("Token de sesion no valido");
                logOut();
            } });
    return res.data.eventos;

}

const getEventoById = async (idEvento, setEvento) => {
    let res = await axios.get(import.meta.env.VITE_BACKEND_URL+"/evento/" + idEvento, {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }

    });
    setEvento(res.data.evento);
}

const getLogs = async (setLogs) => {
    let res = await axios.get(import.meta.env.VITE_BACKEND_URL+"/log", {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }

    });
    setLogs(res.data.logs);
}


const addEvento = async (evento) => {
    try{
        let coordenadas = await eventoService.getCoordenadas(evento.lugar);
        evento.lat = coordenadas.lat;
        evento.long = coordenadas.lng;

        let res = await axios.post(import.meta.env.VITE_BACKEND_URL+"/evento",
            {
                evento
            },{
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "authorization": localStorage.getItem("token")
                }
            }).catch(
            error => {
                if(error.status === 401){
                    alert("Token de sesion no valido");
                    logOut();
                } });;
        return res;
    }catch (error){
        console.log(error);
    }
}

const updateEvento = async (evento) => {
    try{
        let res = await axios.put(import.meta.env.VITE_BACKEND_URL+"/evento", evento, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                "authorization": localStorage.getItem("token")
            }
        }).catch(
            error => {
                if(error.status === 401){
                    alert("Token de sesion no valido");
                    logOut();
                } });;
        return res;
    }catch (error){
        console.log(error);
    }
}

const deleteEvento = async (idEvento) => {
    try{
        let res = await axios.delete(import.meta.env.VITE_BACKEND_URL+"/evento/" + idEvento, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                "authorization": localStorage.getItem("token")
            }
        });

        if(res.status === 200){
            alert("Evento eliminado correctamente")
            routerService.moveToMainPage();
        }else{
            alert("Error al eliminar el evento")
        }
    }catch (error){
        if(error.response && error.response.status === 401){
            alert("Token de sesión no válido");
            logOut();
        }
    }

}

const getUserInfo = async (setUserInfo) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user`, {
            headers: {
                'authorization': localStorage.getItem("token")
            }
        });

        if (response.status === 200) {
            setUserInfo(response.data.user);
        } else {
            console.error(`Unexpected status code: ${response.status}`);
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            alert("Token de sesión no válido");
            logOut();
        } else {
            console.error("An unexpected error occurred:", error);
            alert("Error al obtener la información del usuario");
        }
    }
};


const logOut = async () => {
        const token = localStorage.getItem("token");
        localStorage.clear();
        routerService.moveToMainPage();
        let res = await axios.post(import.meta.env.VITE_BACKEND_URL+"/user/logOutUser",{}, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                "authorization": localStorage.getItem("token")
            }
        });
}

const eventoService = {
    getEventos,
    logOut,
    getEventoById,
    addEvento,
    updateEvento,
    getCoordenadas,
    getLogs,
    deleteEvento,
    filterEventos,
    getUserInfo
}

export default eventoService;