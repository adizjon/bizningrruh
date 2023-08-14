import React, { useState } from 'react';
import MapContainer from './MapConteiner';

const App = () => {
    const [position, setPosition] = useState({ lat: 37.7749, lng: -122.4194 });

    const handlePositionChange = (newPosition) => {
        setPosition(newPosition);
    };

    return (
        <div>
            <h1>Google Map Example</h1>
            <MapContainer position={position} onPositionChange={handlePositionChange} />
            <p>Latitude: {position.lat}</p>
            <p>Longitude: {position.lng}</p>
        </div>
    );
};

export default App;
