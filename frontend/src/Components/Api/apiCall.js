import React from 'react';
import axios from "axios";

function Index({url, method, data}) {
    let s = localStorage.getItem("accessToken");
    return axios({
        url: "http://localhost:8080" + url,
        method,
        data,
        headers: {
            "accessToken": s
        }
    })
}
export default Index;