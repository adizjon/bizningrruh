import React, {useEffect, useState} from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import apiCall from "../Api/apiCall";
import {useNavigate} from "react-router-dom";

function SettingPanel(props) {
    const navigate = useNavigate()
    const [settings, setSettings] = useState([])
    useEffect(() => {
        getSettings()
    }, [])

    function getSettings() {
        apiCall({url: "/api/setting", method: "GET"}).then(({data}) => {
            console.log(data)
            setSettings(data)
        })
    }

    function nextPagee(page) {

        navigate(page)
    }

    return (
        <div className={"w-52 py-7 px-10 bg-white"}>
            <div>
                <ul>
                    <li className={"text-center bg-amber-500 w-52 h-9"}>SETTINGS</li>
                    {settings.map((item, index) => <li onClick={() => nextPagee(item.navigation)} key={index}
                                                       className={"text-center bg-gray-700 mt-2 text-white w-52 h-9"}>{item.settingCategory}</li>)}
                </ul>
            </div>
        </div>
    );
}

export default SettingPanel;