import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '400px',
};

const center = {
    lat: 37.7749,
    lng: -122.4194,
};

const MapContainer = ({ position, onPositionChange }) => {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyBtCTd9IM7T6pbp0Xg-JG1txCK1OF0EY7c',
    });

    const handleMapClick = (e) => {
        onPositionChange({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        });
    };

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading...</div>;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onClick={handleMapClick}
        >
            <Marker position={position} />
        </GoogleMap>
    );
};

export default MapContainer;
