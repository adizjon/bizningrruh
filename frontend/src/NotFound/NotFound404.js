import React from 'react';
import './NotFound.css'
import {useNavigate} from "react-router-dom";
function NotFound404(props) {
    const navigate=useNavigate()

    function throwToLoginPage() {
        navigate("/")
    }

    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>4<span></span>4</h1>
                </div>
                <h2>Oops! Page Not Be Found</h2>
                <p>Sorry but the page you are looking for does not exist, have been removed. name changed or is
                    temporarily unavailable</p>
                <p onClick={throwToLoginPage}>Back to homepage</p>
            </div>
        </div>
    );
}

export default NotFound404;