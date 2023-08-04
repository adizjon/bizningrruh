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
            <div className={"panel"}>
                <nav>
                    <ul>
                        <div className={"text-center settingDiv bg-amber-500 w-52 h-9"}><h2 className={"p-2 text-white"}>SETTINGS</h2></div>
                        {settings.map((item, index) => <button onClick={() => nextPage(item.navigation)} key={index}
                                                           className={"text-center button "}><p >{item.settingCategory}</p></button>)}
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