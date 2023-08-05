import React, {useEffect, useState} from 'react';
import logo from "../../Images/logo.jpg"
import location from "../../Images/location.png"
import request from "../../Images/request.png"
import rocked from "../../Images/rocket.png"
import basket from "../../Images/basket.png"
import books from "../../Images/books.png"
import android from "../../Images/android.jpg"
import settings from "../../Images/settings.png"
import diagram from "../../Images/diagram.png"
import bell from "../../Images/bell.png"
import clients from "../../Images/clients.png"
import user from "../../Images/user.png"
import money from "../../Images/money.png"
import key from "../../Images/key.png"
import shutdown from "../../Images/shutdown.png"
import {Link, Outlet, useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import {dashboardModel} from "../../Redux/reducers/DashboardReducer";
import apiCall from "../Api/apiCall";
import "./AdminStyleSheet.css"
import axios from "axios";
import MenuListComposition from "./MenuListCompositioon";

function Index(props) {
    const {dashboardReducer} = props
    const [nowtime, setNowtime] = useState("")
    const [phone, setPhone] = useState("")
    const [dashboard2, setDashboard] = useState([])
    const [pagee, setPagee] = useState(false)

    useEffect(() => {
        axios({
            url: "http://localhost:8080/dashboard", method: "get"
        }).then(res => {
            setDashboard([res.data.body])
        })

    }, [])
    return (<div>

        <div className="w-full pl-32 fixed h-[70px] bg-gray-600 text-white flex items-center z-50">

            <div>
                <img style={{borderRadius: "50%", position: "absolute", top: "20px", left: "25px"}}
                     className={"w-[70px] h-[60px]"} src={logo} alt=""/>
            </div>
            <div className={"justify-around  flex w-full "}>
                <div>
                    <ul className={"flex gap-4"} style={{
                        marginLeft: 300
                    }}>
                        <li className={"cool-link"}>Supervisor</li>
                        <li className={"cool-link"}>Sales</li>
                        <li className={"cool-link"}>Cash register</li>
                        <li className={"cool-link"}>GPS</li>
                        {/*<li className={"bg-green-500 rounded w-22"}>OnlineHelp</li>*/}
                        <button className="button-71 flex justify-content-center items-center"
                                role="button">OnlineHelp
                        </button>
                    </ul>
                </div>
                <div>

                </div>
                <div>
                    <ul className={"flex gap-2"}>
                        {/*<li className={"bg-blue-500 rounded w-20"}>12,AUGUST</li>*/}
                        {/*<li>+9989486668666</li>*/}
                        {/*{*/}
                        {dashboard2.map(item => (<div style={{display: "flex", gap: 10,}}>

                            <div>

                                <li style={{
                                    width: 140,
                                    height: 30,
                                    background: "#11bd00",
                                    paddingLeft: 8,
                                    paddingTop: 3,
                                    borderRadius: 56,
                                    gap: 10,
                                    cursor: "pointer",
                                    display: "inline-block",
                                    fontSize: 15,
                                    fontWeight: 600,
                                    outline: 0,
                                    position: "relative",
                                    textAlign: "center",
                                    textDecoration: "none",
                                    transition: "all 3.s",
                                    userSelect: "none",
                                    touchAction: "manipulation",
                                }}> 🗓️{item.localDate}</li>
                            </div>
                            <li>+{item.phone}</li>
                        </div>))}
                        <li className={"flex gap-1"}>
                            <img className={"w-16 h-8"} src={bell} alt=""/>
                           <MenuListComposition/>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div className={"flex w-[120px] h-[100%] gap-24"}>
            <div
                className="left-div h-full w-[120px] bg-gray-600 p-2  text-white text-center overflow-hidden fixed z-0">
                <ul className={"mt-20 w-full h-full flex flex-col items-center"}>
                    <li className={"mt-2 w-6 h-[12%] flex justify-center items-center flex-col"}>
                        <img src={rocked} alt=""/>
                        <div>Plans</div>
                    </li>
                    <li className={"w-6 h-[12%] flex justify-center items-center flex-col"}>
                        <img src={basket} alt=""/>
                        <div>Applications</div>
                    </li>
                    <li className={"w-6 h-[12%] flex justify-center items-center flex-col"}>
                        <img src={books} alt=""/>
                        <div>Stock</div>
                    </li>
                    <li className={"w-6 h-[12%] flex justify-center items-center flex-col"}>
                        <img src={clients} alt=""/>
                        <div>Clients</div>
                    </li>
                    <li className={"w-6 h-[12%] flex justify-center items-center flex-col"}>
                        <img src={android} alt=""/>
                        <div>Agents</div>
                    </li>
                    <li className={"w-6 h-[12%] flex justify-center items-center flex-col"}>
                        <img src={diagram} alt=""/>
                        <div>Reports</div>
                    </li>
                    <Link to={"/admin/settings"}
                          className={"w-6 h-[12%] flex justify-center items-center flex-col"}>
                        <img src={settings} alt=""/>
                        <div>Settings</div>
                    </Link>
                </ul>
            </div>
            <div className={"mt-20 h-full ml-[100px]"}>
                <Outlet/>
            </div>
        </div>
    </div>)
}

export default connect(state => state, dashboardModel)(Index);