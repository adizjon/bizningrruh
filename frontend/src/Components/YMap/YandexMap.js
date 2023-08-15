import React, {useState} from 'react';
import {Map, Placemark, SearchControl, YMaps} from "react-yandex-maps";
import {useDispatch, useSelector} from "react-redux";
import territoryReducer, {territoryActions} from "../../Redux/reducers/TerritoryReducer"

function YandexMap(props) {
    const dispatch = useDispatch()
    const territoryObj = useSelector(state=> state.territoryReducer.territoryObj)
    const [coordinate, setCoordinate] = useState({
        longitude: 0,
        latitude: 0,
    })

    const handlePlacemarkLoad = (e) => {
        // if (e && e.originalEvent && e.originalEvent.target) {
        //     const placemark = e.originalEvent.target;
        //     const coordinates = placemark.geometry.getCoordinates();
        // } else {
        //     console.error('Unable to get placemark coordinates.');
        // }
    };

    const handleMapClick = (event) => {
        const coords = event.get('coords');
        const latitude = coords[0];
        const longitude = coords[1];

        setCoordinate({longitude, latitude})
        dispatch(props.action({longitude, latitude}))
        // setMapState(
        //     {center: [latitude, longitude], zoom: 5}
        // );
    };

    return <div>
        <YMaps query={{ apikey: "00cb879a-9b10-4d54-86c9-8afdc78b833d" }}>
            <Map defaultState={{
                center: [coordinate.latitude, coordinate.longitude ],
                zoom: 5
            }}
                 onLoad={handlePlacemarkLoad}
                 onClick={handleMapClick}
            >
                <SearchControl options={{
                    float: 'right'
                }}/>
                <Placemark geometry={[coordinate.latitude, coordinate.longitude]} />
            </Map>
        </YMaps>
        <div>
            <input value={coordinate.longitude} disabled placeholder={"longitude"} type="number" />
            <input value={coordinate.latitude} disabled placeholder={"latitude"} type="number" />
        </div>
    </div>
}

export default YandexMap;