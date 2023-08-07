// import React, {useEffect, useState} from 'react';
// import CircleImage from "../../Images/logo.jpg"
// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'
// import {connect} from "react-redux";
// import {loginModel} from "../../Redux/reducers/LoginReducer";
// import {useLocation, useNavigate} from "react-router-dom";
// import axios from "axios";
//
// function Index(props) {
//     const {loginReducer} = props
//     const navigate = useNavigate()
//     const location = useLocation()
//     const [dashboard, setDashboard] = useState([])
//     useEffect(() => {
//         if (loginReducer.navigateTo !== "" && location.pathname !== loginReducer.navigateTo) {
//             navigate(loginReducer.navigateTo)
//         }
//         axios({
//             url: "http://localhost:8080/dashboard", method: "get"
//         }).then(res => {
//             setDashboard([res.data.body])
//         })
//     },[])
//     return (
//         <div className="flex justify-center items-center h-screen bg-gray-100">
//             <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full sm:w-1/2">
//                 {/* Circular image container */}
//                 <div
//                     className="relative w-24 h-24 mx-auto mb-4 -mt-16 rounded-full overflow-hidden border-4 border-green-500">
//                     <img src={CircleImage} alt="User Avatar" className="object-cover object-center w-full h-full"/>
//                 </div>
//                 {/* First input */}
//                 <form action="" onSubmit={(event) => (event.preventDefault(),
//                     props.loginUser())}>
//                     <div className="mb-4">
//                         <div
//                             className="placeholder:text-gray-600 border bg-green-200 text-black border-green-900 focus:border-green-600 rounded-md px-5 py-2 h-15 w-full focus:outline-none">We
//                             Destination Admin Page
//                         </div>
//                     </div>
//                     {/* Second input */}
//                     <div className="mb-4 text-green-800">
//                         {/*<input*/}
//                         {/*    type="text"*/}
//                         {/*    placeholder="Enter your name"*/}
//                         {/*    className=" placeholder:text-gray-600 border bg-blue-400 border-    green-500 focus:border-green-600 rounded-md px-4 py-2 w-full focus:outline-none"*/}
//                         {/*/>*/}
//                     </div>
//                     <div className="mb-6 relative">
//                         <PhoneInput
//                             placeholder={"enter your phone"}
//                             inputStyle={{width: "100%", height: "50px"}}
//                             country="us"
//                             value={loginReducer.phone}
//                             onChange={phone => props.changePhone(phone)}
//                         />
//                     </div>
//                     <div className="mb-6">
//                         <input
//                             value={loginReducer.password}
//                             onChange={e => props.changePassword(e.target.value)}
//                             type="password"
//                             placeholder="Enter your password"
//                             minLength={8}
//                             className="placeholder:text-gray-600 border  text-black border-green-500   rounded-md px-5 py-2 h-15 w-full focus:outline-none"
//                         />
//                     </div>
//                     <div className={"flex gap-8"}>
//                         <div className="flex items-center mb-4">
//                             <label className="text-gray-600">
//                                 <input checked={loginReducer.active}
//                                        onChange={e => props.changeActive(e.target.checked)}
//                                        type="checkbox" className="form-checkbox mr-2"/>Remember me</label>
//                         </div>
//                         <button
//                             className="bg-green-500  hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline w-1/2"
//                             style={{fontSize: '18px'}}
//                         >
//                             To come in >
//                         </button>
//                     </div>
//                     <div className={"mt-6"}>
//                         <hr/>
//                         {
//                             dashboard.map(item=><h4>Support Service:+{item.phone}</h4>)
//                         }
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };
// console.clear()
//
// export default connect(state => state, {...loginModel})(Index);


import React, {useEffect, useState} from 'react';
import CircleImage from "../../Images/logo.jpg"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {connect} from "react-redux";
import {loginModel} from "../../Redux/reducers/LoginReducer";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
function Index(props) {
    const {loginReducer} = props
    const navigate = useNavigate()
    const location = useLocation()
    const [supportPhone,setSupportPhone]=useState()
    const [dashboard, setDashboard] = useState([])


    useEffect(() => {
        if (loginReducer.navigateTo !== "" && location.pathname !== loginReducer.navigateTo) {
            navigate(loginReducer.navigateTo)
            console.clear()
        }
        axios({
            url: "http://localhost:8080/dashboard", method: "get"
        }).then(res => {
            setSupportPhone(res.data.body.phone)
        })
    })
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full sm:w-1/2">
                {/* Circular image container */}
                <div
                    className="relative w-24 h-24 mx-auto mb-4 -mt-16 rounded-full overflow-hidden border-4 border-green-500">
                    <img src={CircleImage} alt="User Avatar" className="object-cover object-center w-full h-full"/>
                </div>
                {/* First input */}
                <form action="" onSubmit={(event) => (event.preventDefault(),
                    props.loginUser())}>
                    <div className="mb-4">
                        <div
                            className="placeholder:text-gray-600 border bg-green-200 text-black border-green-900 focus:border-green-600 rounded-md px-5 py-2 h-15 w-full focus:outline-none">We
                            Destination Admin Page
                        </div>
                    </div>
                    {/* Second input */}
                    <div className="mb-4 text-green-800">
                        {/*<input*/}
                        {/*    type="text"*/}
                        {/*    placeholder="Enter your name"*/}
                        {/*    className=" placeholder:text-gray-600 border bg-blue-400 border-    green-500 focus:border-green-600 rounded-md px-4 py-2 w-full focus:outline-none"*/}
                        {/*/>*/}
                    </div>
                    <div className="mb-6 relative">
                        <PhoneInput
                            placeholder={"enter your phone"}
                            inputStyle={{width: "100%", height: "50px"}}
                            country="us"
                            value={loginReducer.phone}
                            onChange={phone => props.changePhone(phone)}
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            value={loginReducer.password}
                            onChange={e => props.changePassword(e.target.value)}
                            type="password"
                            minLength={8}
                            placeholder="Enter your password"
                            className="placeholder:text-gray-600 border  text-black border-green-500   rounded-md px-5 py-2 h-15 w-full focus:outline-none"
                        />
                    </div>
                    <div className={"flex gap-8"}>
                        <div className="flex items-center mb-4">
                            <label className="text-gray-600">
                                <input checked={loginReducer.active} onChange={e => props.changeActive(e.target.checked)}
                                       type="checkbox" className="form-checkbox mr-2"/>Remember me</label>
                        </div>
                        <button
                            className="bg-green-500  hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline w-1/2"
                            style={{fontSize: '18px'}}
                        >
                            To come in >
                        </button>
                    </div>
                    <div className={"mt-6"}>
                        <hr/>
                        <h4>Support Service: {supportPhone}</h4>

                        {
                            dashboard.map(item=><h4>Support Service:+{item.phone}</h4>)
                        }
                    </div>
                </form>
            </div>
        </div>
    );
};
console.clear()

export default connect(state => state, {...loginModel})(Index);