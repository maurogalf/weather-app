import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import * as L from 'leaflet';
import 'leaflet-defaulticon-compatibility';

const RecenterAutomatically = (ubi) => {
    const map = useMap();
    useEffect(() => {
        map.setView(ubi);
    }, [ubi]);
    return null;
};

const MapView = ({ ubication }) => {

    useEffect(() => {
    }, [ubication]);

    return (
        <MapContainer center={ubication} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={ubication}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            <RecenterAutomatically lat={ubication[0]} lon={ubication[1]}/>
        </MapContainer>
    );
};

export default MapView;
