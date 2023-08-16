import React, { useState } from 'react';

function ContentLoader() {
    const [content, setContent] = useState('');

    const loadContent = () => {
        // You can fetch data from an API or set your desired content here
        const loadedContent = 'Content has been loaded!';
        setContent(loadedContent);
    };

    return (
        <div>
            <img style={{marginLeft:500,marginTop:200}} src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921000000" alt=""/>
        </div>
    );
}

export default ContentLoader;
