import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import {Map, Placemark} from "react-yandex-maps";
import apiCall from "../Api/apiCall";
import ApiCall from "../Api/apiCall";
import ContentLoader from "../Loading/ContentLoaders";
import Rodal from "rodal";
import YandexMap from "../YMap/YandexMap";
import {clientActions} from "../../Redux/reducers/ClientsReducer";
import Table from "../Table/Table";

function ClientMap(props) {
    const [template, setTemplate] = useState(null);
    const [mapState, setMapState] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        ApiCall({
            url: "/api/territory/get",
            method: "GET"
        }).then(res => {
            console.log(res.data)
            setMapState(res.data)
        })
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

    const handleMapClick = (event) => {
        const coords = event.get('coords');
        const latitude = coords[0];
        const longitude = coords[1];

        setTemplate([longitude, latitude])

        console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);
        setMapState(
            {center: [latitude, longitude], zoom: 10}
        );
    };

    return (
        <div>
            {
                loading ? <div>
                        <ContentLoader/>
                    </div>
                    : <div>
                        <h1 style={{marginLeft:100,marginTop:50}}>Clients Map</h1>
                        <Map

                            state={{ center: [64.3291696289062, 39.82758596427712], zoom: 5 }}
                            modules={['templateLayoutFactory']}
                            style={{ width: '1200px', height: '580px',marginLeft:100 }} // 800 piksel kengligida va 400 piksel bo'yligida
                        >
                            {mapState.map((item) => {
                                return (
                                    <Placemark
                                        key={item.id}
                                        geometry={[item.latitude, item.longitude]}
                                        options={{ balloonContentLayout: template }}
                                        modules={['geoObject.addon.balloon']}
                                    />
                                );
                            })}
                        </Map>
                    </div>
            }


        </div>
    );
};

export default ClientMap;
