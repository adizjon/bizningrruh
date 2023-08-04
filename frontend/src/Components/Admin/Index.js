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

function Index(props) {
    console.log(props)
    const {dashboardReducer} = props
    useEffect(()=>{
        console.log(dashboardReducer)
    },[])
    const [nowtime,setNowtime] = useState("")
    const [phone,setPhone] = useState("")
        apiCall({url:"/dashboard",method:"GET"}).then((res)=> {
            console.log(res.data)
            setPhone(res.data.body.phone)
            setNowtime(res.data.body.localDate)
        })
    return (
        <div>
            <div className={"my-account bg-gray-700 w-[300px] h-[200px] rounded absolute top-10 right-0 text-white "+dashboardReducer.hideShow}>
                <div className={"mt-10 flex gap-2 ml-2"}><img className={"w-7 "} src={key}/>Change login and password</div>
                <h4 className={"mt-4 flex gap-2 ml-2"}><img className={"w-10 -mt-1"} src={money} alt=""/> Billing</h4>
                <h4 className={"mt-4  flex gap-3 ml-2"}><img className={"w-7"} src={shutdown}/> Exit</h4>
            </div>
            {/*<div className="w-full pl-32 fixed h-[70px] bg-gray-600 text-white flex justify-center items-center z-50">*/}
            {/*    <div className="1-work">*/}
            {/*        <img style={{borderRadius: "50%", position: "absolute", top: "20px", left: "25px"}}*/}
            {/*             className={"w-[60px] h-[60px]"} src={logo} alt=""/>*/}
            {/*    </div>*/}
            {/*    <div className="2-work flex justify-between w-full gap-10">*/}
            {/*        <div className={"flex gap-4 items-center"}>*/}
            {/*            <div>supervisor</div>*/}
            {/*            <div>sales</div>*/}
            {/*            <div>*/}
            {/*                <select className={"bg-gray-600"} name="" id="">*/}
            {/*                    <option value="">cash register</option>*/}
            {/*                </select>*/}
            {/*            </div>*/}
            {/*            <div>*/}
            {/*                <div className={"flex"}>*/}
            {/*                    <img className={"w-5"} src={location}/>*/}
            {/*                    <select className={"bg-gray-600"} name="" id="">*/}
            {/*                        <option value="">GPS</option>*/}
            {/*                    </select>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div className={"bg-green-500 w-[150px] rounded p-2 h-min text-center"}>*/}
            {/*                OnlineHelp*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*            <div className={"h-[70px] flex items-center justify-between w-2/5"}>*/}
            {/*                <div className={"ml-18 flex"}>*/}
            {/*                    <div className={"ml-2"}>*/}
            {/*                        <div className="w-32 bg-blue-400 rounded p-[9px] -mt-2 ">*/}
            {/*                            <div>{nowtime}</div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*                <h5>+{phone}</h5>*/}
            {/*                <div className={"w-16"}>*/}
            {/*                    <img width={60} height={70} src={bell} alt=""/>*/}
            {/*                </div>*/}
            {/*                <div className={"w-16"} onClick={()=>props.changeHideShow()}>*/}
            {/*                    <img width={20} height={20} src={user} alt=""/>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*</div>*/}
            <div className="w-full pl-32 fixed h-[70px] bg-gray-600 text-white flex items-center z-50">
                <div>
                    <img style={{borderRadius: "50%", position: "absolute", top: "20px", left: "25px"}}
                         className={"w-[70px] h-[60px]"} src={logo} alt=""/>
                </div>
                <div className={"justify-around  flex w-full "}>
                    <div>
                        <ul className={"flex gap-4"} style={{
                            marginLeft:300
                        }}>
                            <li>Supervisor</li>
                            <li>Sales</li>
                            <li>Cash register</li>
                            <li>GPS</li>
                            <li className={"bg-green-500 rounded w-22"}>OnlineHelp</li>
                        </ul>
                    </div>
                    <div>

                    </div>
                    <div>
                        <ul className={"flex gap-2"}>
                            <li className={"bg-blue-500 rounded w-20"}>12,AUGUST</li>
                            <li>+9989486668666</li>
                            <li className={"flex gap-1"}>
                                <img className={"w-16 h-8"} src={bell} alt=""/>
                                <img className={"w-6 h-6"} src={user} alt=""/>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={"flex w-[120px] h-[100%] gap-24"}>
                <div className="left-div h-full w-[120px] bg-gray-600 p-2  text-white text-center overflow-hidden absolute z-0">
                    <ul className={"mt-20 w-full h-full flex flex-col items-center"}>
                        <li className={"mt-2 w-6 h-[12%] flex justify-center items-center flex-col"}>
                            <img src={rocked} alt=""/>
                            <div>Plans</div>
                        </li> <li className={"w-6 h-[12%] flex justify-center items-center flex-col"}>
                            <img src={basket} alt=""/>
                            <div>Applications</div>
                        </li> <li className={"w-6 h-[12%] flex justify-center items-center flex-col"}>
                            <img src={books} alt=""/>
                            <div>Stock</div>
                        </li> <li className={"w-6 h-[12%] flex justify-center items-center flex-col"}>
                            <img src={clients} alt=""/>
                            <div>Clients</div>
                        </li> <li className={"w-6 h-[12%] flex justify-center items-center flex-col"}>
                            <img src={android} alt=""/>
                            <div>Agents</div>
                        </li> <li className={"w-6 h-[12%] flex justify-center items-center flex-col"}>
                            <img src={diagram} alt=""/>
                            <div>Reports</div>
                        </li> <Link to={"/admin/settings"} className={"w-6 h-[12%] flex justify-center items-center flex-col"}>
                            <img src={settings} alt=""/>
                            <div>Settings</div>
                        </Link>
                    </ul>
                </div>
                <div className={"mt-20 h-full ml-[100px]"}>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default connect(state=>state,dashboardModel)(Index);