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

const getCoordenadas = async (direccion) => {
    let response = await fromAddress(direccion).catch(console.error);
    return {"lat": response.results[0].geometry.location.lat, "lng": response.results[0].geometry.location.lng, "codPostal": response.results[0].address_components[6].long_name}
}
const getGastos = async (setGastos,setLocations) => {
    let res = await axios.get(import.meta.env.VITE_BACKEND_URL+"/gasto", {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }

    }).catch(
        error => {
            if(error.status === 401){
                alert("Token de sesion no valido");
                logOut();
            } });
    setGastos(res.data.gastos);

    let newLocations = [];
    for(let i = 0; i < res.data.gastos.length; i++){
        if(res.data.gastos[i].lat !== undefined && res.data.gastos[i].long !== undefined){
            newLocations.push({"lat": res.data.gastos[i].lat, "long": res.data.gastos[i].long, "nombre": res.data.gastos[i].concepto})
    }}

    setLocations(newLocations);
}

const getGastoById = async (idGasto, setGasto) => {
    let res = await axios.get(import.meta.env.VITE_BACKEND_URL+"/gasto/" + idGasto, {
        headers: {
            'Access-Control-Allow-Origin': '*'
        }

    });
    setGasto(res.data.gasto);
}

const addGasto = async (gasto) => {
    try{
        let direccion = await gastoService.getCoordenadas(gasto.localizacion);

        let lat = direccion.lat;
        let long = direccion.lng;
        let codPostal = direccion.codPostal;
        
        gasto.lat = lat;
        gasto.long = long;
        gasto.codPostal = codPostal;
        gasto.eMail = localStorage.getItem("email");
        gasto.token = localStorage.getItem("token");
        
        console.log("ENVIANDO ESTE GASTO "+ gasto)
        let res = await axios.post(import.meta.env.VITE_BACKEND_URL+"/gasto",
            {
                gasto
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

const deleteGasto = async (idGasto) => {
    try{
        let res = await axios.delete(import.meta.env.VITE_BACKEND_URL+"/gasto/" + idGasto, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                "authorization": localStorage.getItem("token")
            }
        });

        if(res.status === 200){
            alert("Gasto eliminado correctamente")
            routerService.moveToMainPage();
        }else{
            alert("Error al eliminar el gasto")
        }
    }catch (error){
        if(error.response && error.response.status === 401){
            alert("Token de sesión no válido");
            logOut();
        }
    }

}

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

const getSaldo = async (eMail,setSaldo) => {
    try{
        let res = await axios.get(import.meta.env.VITE_BACKEND_URL+"/gasto/saldo/"+eMail, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                "authorization": localStorage.getItem("token")
            }
        });
        return res.data.saldo;
    }catch (error){
        if(error.response && error.response.status === 401){
            alert("Token de sesión no válido");
            logOut();
        }
    }
}

const gastoService = {
    getGastos,
    logOut,
    getGastoById,
    addGasto,
    getCoordenadas,
    deleteGasto,
    getSaldo
}

export default gastoService;