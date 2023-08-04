import React, {useEffect, useState} from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import apiCall from "../Api/apiCall";
import {Outlet, useNavigate} from "react-router-dom";
import "./SettingStyle.css"
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

    function nextPage(page) {
        navigate("/admin/settings"+page)
    }

    return (
        <div className={"biggestDiv w-52 py-7 px-10 bg-white"}>
            <div>
                <nav>
                    <ul>
                        <div className={"text-center bg-amber-500 w-52 h-9"}>SETTINGS</div>
                        {settings.map((item, index) => <li onClick={() => nextPage(item.navigation)} key={index}
                                                           className={"text-center bg-gray-700 mt-2 text-white w-52 h-9"}><p >{item.settingCategory}</p></li>)}
                    </ul>
                </nav>
            </div>
            <div className={"rightDivFlex"}>
                <Outlet/>
            </div>
        </div>
    );
}

export default SettingPanel;