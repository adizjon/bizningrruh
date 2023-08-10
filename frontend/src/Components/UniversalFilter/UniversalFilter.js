import React, {useState} from 'react';
import Select from "react-select";

function UniversalFilter(props) {
    const [backendReq, setBackendReq] = useState([]);

    function handleCityChange(param) {
        const existingValues = [backendReq];
        existingValues.push(param);
        setBackendReq(existingValues);
        localStorage.setItem("arr", JSON.stringify(existingValues));
    }

    const customStyles = {
        control: (base) => ({
            ...base,
            width: 200,
        }),
    };

    return (
        <div className={"d-flex gap-2 mx-5"} style={{width: 1000, flexWrap: "wrap"}}>
            {props.multiple.map(item => (
                <Select
                    key={item.name}
                    name={item.name}
                    options={item.value}
                    isMulti
                    onChange={(selectedOptions) => handleCityChange({name: item.name, value: selectedOptions})}
                    placeholder={item.defaultValue}
                    styles={customStyles}
                />
            ))}
            {props.select.map(item =>
                <Select
                    key={item.name}
                    name={item.name}
                    options={item.value}
                    onChange={(e) => handleCityChange({name: item.name, value: e})}
                    style={{width: 70}}
                    placeholder={item.defaultValue}
                    styles={customStyles}
                />
            )}
        </div>
    );
}

export default UniversalFilter;