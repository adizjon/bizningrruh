import React, {useState} from 'react';
import Select from 'react-select';
import axios from "axios";

function UniversalFilter(props) {
    const [backendReq, setBackendReq] = useState([]);
    const [data, setData] = useState([])
    let city = ""
    let customerCategory = ""
    let active = ""
    let tin = ""
    const handleCityChange = (param) => {

        let index = data.findIndex(item => item.name === param.name)

        if (param.name === "city") {
            param.value.map(item => {
                city = item.value
            })
        }
        if (param.name === "customer category") {
            param.value.map(item => {
                customerCategory = item.value
            })
        }
        if (param.name === "active") {
            param.value.map(item => {
                active = item.value
            })
        }
        if (param.name === "tin") {
            param.value.map(item => {
                tin = item.value
            })
        }

        axios({
            url: props.url,
            method: "get",
            params: {
                city,
                customerCategory,
                active,
                tin
            }
        }).then(res => {
            console.log(res.data.content)
        })
    };
    const customStyles = {
        control: (base) => ({
            ...base,
            width: 200,
        }),
    };

    return (
        <div className="d-flex gap-2 mx-5" style={{width: 1000, flexWrap: 'wrap'}}>
            {props.multiple.map((item) => (
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
            {props.select.map((item) => (
                <Select
                    key={item.name}
                    name={item.name}
                    options={item.value}
                    onChange={(e) => handleCityChange({name: item.name, value: e})}
                    style={{width: 70}}
                    placeholder={item.defaultValue}
                    styles={customStyles}
                />
            ))}
        </div>
    );
}

export default UniversalFilter;
