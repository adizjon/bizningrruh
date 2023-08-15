import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css"
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./Redux/store";
import {YMaps} from "react-yandex-maps";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <YMaps query={{lang: 'en_US', load: 'package.full', apikey: "00cb879a-9b10-4d54-86c9-8afdc78b833d"}}>

                <App/>
            </YMaps>
        </BrowserRouter>
    </Provider>
);