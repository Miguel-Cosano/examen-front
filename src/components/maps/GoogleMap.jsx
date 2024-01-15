import React from "react";
import { GoogleMap, MarkerF, useLoadScript, InfoWindow } from '@react-google-maps/api';
import { useMemo } from "react";
import '../../assets/css/map.css'

export default function GMap({ locations }) {
    const { isLoaded } = useLoadScript({ googleMapsApiKey: `${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}` })
    if (!isLoaded) return <div>Loading...</div>
    return (
        <>
            {locations[0].length === undefined ?
                <Map locations={locations} />
                :
                <Map locations={locations[0]} />
            }
        </>
    );
}

function Map({ locations }) {
    const center = useMemo(() => {
        // Calcula el centro en base a las ubicaciones
        if (locations.length === 0) {
            return {lat: 0, lng: 0}; // Valor por defecto si no hay ubicaciones
        }
        console.log(locations)
        // Calcula el centro promedio de todas las ubicaciones
        if (locations === 1) {
            locations = locations[0]
        }

        const sumLat = locations.reduce((acc, location) => acc + Number(location.lat), 0);
        const sumLng = locations.reduce((acc, location) => acc + Number(location.long), 0);

        return {
            lat: Number(sumLat) / locations.length,
            lng: Number(sumLng) / locations.length
        };
    }, [locations]);


    return (
        <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
            {locations.map((location, index) => (
                <MarkerF
                    key={index} // Add a unique key for each marker
                    position={{lat: Number(location.lat), lng: Number(location.long)}}
                    label={{
                        text: location.nombre,
                        className: "marker-label"
                    }}
                />
            ))}
        </GoogleMap>
    );
}