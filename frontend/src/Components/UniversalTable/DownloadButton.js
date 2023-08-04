import React from 'react';
import axios from 'axios';

const ExcelDownloadButton = () => {
    const handleDownload = () => {
        axios.get('your-backend-api-endpoint', { responseType: 'blob' })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/vnd.ms-excel' }));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'your-filename.xlsx');
                document.body.appendChild(link);
                link.click();
            })
            .catch(error => {
                // Handle error, e.g., show a notification to the user
                console.error('Error downloading Excel file:', error);
            });
    };

    return (
        <button onClick={handleDownload}>Download Excel</button>
    );
};

export default ExcelDownloadButton;
