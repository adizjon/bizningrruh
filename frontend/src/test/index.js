import React, {useEffect, useState} from 'react';
import axios from "axios";
import ApiCall from "../Components/Api/apiCall";

const App = () => {
    const [users, setUsers] = useState([{
        title:"12",
        region:"q",
        active:true,
        code:12,
        longitude:3.11,
        latitude:4.11,
    }])
    function convertToExcelFile(users) {
        ApiCall({
            url: "/api/territory/upload",
            method: "POST",
            data: users,
            responseType: "blob" // This is important to receive binary data (blob)
        }).then(res => {
            // Create a Blob from the response data
            const blob = new Blob([res.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

            // Create a temporary URL for the Blob
            const url = window.URL.createObjectURL(blob);

            // Create a link element to download the Excel file
            const a = document.createElement("a");
            a.href = url;
            a.download = "territory.xlsx";
            a.click();

            // Cleanup the temporary URL
            window.URL.revokeObjectURL(url);

            console.log("Excel file downloaded successfully!");
        }).catch(err => {
            console.error("Error downloading Excel file:", err);
        });
    }

    return (
        <div className={"mt-5"}>
            <table className="table w-75 text-center">
                <thead>
                <tr>
                    <th>title</th>
                    <th>region</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Buxoro</td>
                    <td>1</td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                    <td></td>
                    <td>
                        <button className="btn btn-outline-primary" onClick={()=>convertToExcelFile(users)}>convert to excel file</button>
                    </td>
                </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default App;







// import React from 'react';
// import axios from 'axios';
// import ApiCall from "../Components/Api/apiCall";
//
// const ExcelDownloadButton = () => {
//     const handleDownload = () => {
//         axios('http://localhost:8080/api/upload', { responseType: 'blob' })
//             .then(response => {
//                 const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/vnd.ms-excel' }));
//                 const link = document.createElement('a');
//                 link.href = url;
//                 link.setAttribute('download', 'your-filename.xlsx');
//                 document.body.appendChild(link);
//                 link.click();
//             })
//             .catch(error => {
//                 // Handle error, e.g., show a notification to the user
//                 console.error('Error downloading Excel file:', error);
//             });
//     };
//
//     return (
//         <button onClick={handleDownload}>Download Excel</button>
//     );
// };
//
// export default ExcelDownloadButton;
