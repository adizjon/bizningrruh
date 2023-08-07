import {BrowserRouter, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Login from "./Components/Login";
import {useEffect, useState} from "react";
import axios from "axios";
// import PageNotFound from "./Components/PageNotFound/PageNotFound";
import SettingPanel from "./Components/Settings/SettingPanel";
import UniversalTable from "./Components/UniversalTable";
import Admin from "./Components/Admin/Index"
import NotFound404 from "./NotFound/NotFound404";
import Territory from "./Components/Territory";
import Table from "./Components/Table/Table";
import Test from "./test";
import MenuListComposition from "./Components/Admin/MenuListCompositioon";
import Client from "./Components/Client/Client";
import CustomerCategory from "./Components/CustomerCategory/CustomerCategory";

function App() {
    const [data, setData] = useState([]);

    let columns2 = [
        {
            id: 1,
            title: "Name",
            key: "name",
            type: "text",
            show: true,
        },
        {
            id: 2,
            title: "Email",
            key: "email",
            type: "text",
            show: true,
        },
        {
            id: 3,
            title: "Body",
            key: "body",
            type: "text",
            show: true,
        },
    ];

    useEffect(() => {
        axios
            .get("https://jsonplaceholder.typicode.com/comments")
            .then(({data}) => {
                setData(data);
            });
    }, []);


    const [testData, setTestData] = useState([])
    let columns = [
        {
            title: "ID",
            key: "id",
            dataType: "number",
            show: true
        },
        {
            title: "NAME",
            key: "name",
            dataType: "text",
            show: true
        },
        {
            title: "EMAIL",
            key: "email",
            dataType: "text",
            show: true
        }
    ]
    const [user, setUser] = useState("")
    const location = useLocation();
    const permissions = [
        {url: "/admin", role: "ROLE_SUPER_ADMIN"},
        {url: "/admin/settings", role: "ROLE_SUPER_ADMIN"},
        {url: "/admin/settings/territory", role: "ROLE_SUPER_ADMIN"},
    ]
    const navigate = useNavigate()

    function checkFree() {
        let arr = []
        permissions.map(item => {
            if (item.url === location.pathname) {
                arr.push(item.role)
            }
        })
        if (arr.length === 0) {
            return ["FREE"]
        }
        return arr;
    }

    useEffect(() => {
        getTestData()
        getRefreshToken()

    }, [location.pathname])

    function getRefreshToken() {
        axios({
            url: "http://localhost:8080/api/auth/getMe?accessToken=" + localStorage.getItem("accessToken"),
            method: "get"
        }).then(res => {
            let user = res.data.user.roles
            let permittedRoles = checkFree()
            if (permittedRoles[0] !== "FREE") {
                let a = 0
                user.map(item => {
                    if (permittedRoles.includes(item.name)) {
                        a = 1
                    }
                })
                if (a === 1) {
                    navigate(location.pathname)
                } else {
                    navigate("/404")
                }
            }
            setUser(res.data)
        }).catch(err => {
            let checkPath = checkFree()
            if (checkPath[0] !== "FREE") {
                if (localStorage.getItem("refreshToken")) {
                    axios({
                        url: "http://localhost:8080/api/auth/refresh?refreshToken=" + localStorage.getItem("refreshToken"),
                        method: "POST"
                    }).then((res) => {
                        localStorage.setItem("accessToken", res.data)
                    }).catch(() => {
                        navigate("/")
                    })
                } else {
                    navigate("/")
                }
            }
        })
    }

    function getTestData() {
        axios({
            url: "https://jsonplaceholder.typicode.com/users",
            method: "get"
        }).then(res => {
            setTestData(res.data)
        })
    }


    return (
        <Routes>
            <Route path={"/"} element={<Login/>}/>
            <Route path={"/aa"} element={<MenuListComposition/>}/>
            <Route path={"/admin"} element={<Admin/>}>
                <Route path={"/admin/settings"} element={<SettingPanel/>}>
                    <Route path={"/admin/settings/territory"} element={<Territory/>}/>
                    <Route path={"/admin/settings/clientType"} element={<Client/>}/>

                    <Route path={"/admin/settings/customerCategory"} element={<CustomerCategory/>}/>

                </Route>
            </Route>
            <Route path={"*"} element={<NotFound404/>}/>
            <Route path={"/territory"} element={<Territory/>}/>
            <Route path={"/test"} element={<Test/>}/>
            <Route path={"/table"} element={
                <UniversalTable
                    data={testData}
                    columns1={columns}
                    api={"https://jsonplaceholder.typicode.com/users"}/>}
            />

            <Route path={"/table2"} element={<Table
                dataProps={data}
                columnsProps={columns2}
                pagination={true}
                changeSizeMode={true}
                paginationApi={"https://jsonplaceholder.typicode.com/comments?_page={page}&_limit={limit}"}
                columnOrderMode={true}
                changeSizeModeOptions={[5, 10, 20, 30, 40, 50]}
            />}/>
        </Routes>
    );
}

export default App;