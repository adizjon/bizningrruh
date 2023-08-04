import React from 'react';
import App from "./App";

function Index(props) {
    return (
        <div>
            <App columns={props.columns} />
        </div>
    );
}

export default Index;