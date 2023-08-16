import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {Map, Placemark} from "react-yandex-maps";
import apiCall from "../Api/apiCall";
import ApiCall from "../Api/apiCall";

function ClientMap(props) {
    const [template, setTemplate] = useState(null);
    const [mapState, setMapState] = useState([]);

    useEffect(() => {

        ApiCall({
            url: "/api/territory/get",
            method: "GET"
        }).then(res => {
            // console.log(res.data)
            setMapState(res.data)
        })
    }, [])

    const handleMapClick = (event) => {
        const coords = event.get('coords');
        const latitude = coords[0];
        const longitude = coords[1];

        setTemplate([longitude, latitude])

        // console.log('Latitude:', latitude);
        // console.log('Longitude:', longitude);
        setMapState(
            {center: [latitude, longitude], zoom: 10}
        );
    };

    return (
        <div>

            <Map

                onLoad={(e) => {
                    console.log()
                }}
                onClick={handleMapClick} // Add the click event listener
                state={{center: [64.3291696289062, 39.82758596427712], zoom: 5}}
                modules={['templateLayoutFactory']}
            >

                {
                    mapState.map((item) => {
                        return <Placemark
                            geometry={[item.latitude, item.longitude]}
                            options={{balloonContentLayout: template}}
                            modules={['geoObject.addon.balloon']}
                        />
                    })
                }
            </Map>

        </div>
    );
};

export default ClientMap;
