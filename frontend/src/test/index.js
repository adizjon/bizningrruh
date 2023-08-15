import React, {useEffect, useState} from 'react';
import axios from "axios";
import ApiCall from "../Components/Api/apiCall";

const App = (props) => {
    const [users, setUsers] = useState([{
        title: "12",
        region: "q",
        active: true,
        code: 12,
        longitude: 3.11,
        latitude: 4.11,
    }])

    const handleDownload = async () => {
        try {
            const response = await axios.get(props.url, {
                responseType: 'arraybuffer',
                headers:{
                    Authorization:localStorage.getItem("accessToken")
                }
            });

            const blob = new Blob([response.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'territories.xlsx';
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading Excel file:', error);
        }
    };

    return (
        <button className="btn btn-outline-primary" onClick={handleDownload}>excel</button>
    );
};

export default App;

