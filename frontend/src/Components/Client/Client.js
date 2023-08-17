import React, {useEffect} from 'react';
import {connect, useSelector} from "react-redux";
import {clientActions} from "../../Redux/reducers/ClientsReducer";
import Table from "../Table/Table";
import YandexMap from "../YMap/YandexMap";
import UniversalModal from "../UniversalModal/UniversalModal";
import {useState} from "react";
import apiCall from "../Api/apiCall";
import axios from "axios";
import Rodal from "rodal";
import "rodal/lib/rodal.css"
import {YMaps} from "react-yandex-maps";
import ContentLoader from "../Loading/ContentLoaders";

function Client(props) {
    const [isOpen, setIsOpen] = useState(false)
    const [territories, setTerritories] = useState([])
    const [categories, setCategories] = useState([])
    const clientObj = useSelector(state => state.clientsReducer.clientObj);
    const [inputs, setInputs] = useState([
        {
            type: "select",
            desc: "Territory",
            required: true,
            action: territoryHandler,
            value: clientObj.territoryId,
            render: territories,
            key: "id",
            title: "title"
        },
        {
            type: "select",
            desc: "Category",
            required: true,
            action: categoryHandler,
            value: clientObj.categoryId,
            render: categories,
            key: "id",
            title: "name"
        },
        {type: "text", desc: "Name", required: true, action: nameHandler, value: clientObj.name},
    ])
    const [buttons, setButtons] = useState([])
    const [isVisible, setIsVisible] = useState(false)

    const [loading, setLoading] = useState(false)


    useEffect(() => {
        axios({
            url: "http://localhost:8080/api/customerCategory",
            method: "GET"
        }).then(res => {
            setCategories(res.data)
            inputs[0].render = res.data
            setInputs([...inputs])
        })
        apiCall({
            url: "/api/territory",
            method: "GET"
        }).then(res => {
            setTerritories(res.data.content)
            inputs[1].render = res.data.content
            setInputs([...inputs])
        })
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])


    function territoryHandler(e) {
        let s = inputs.map(input => {
            if (input.desc === "Territory") {
                input.value = e.target.value
            }
            return input
        })
        setInputs(s)
        props.setTerritory(e.target.value)
    }

    function categoryHandler(e) {
        let s = inputs.map(input => {
            if (input.desc === "Category") {
                input.value = e.target.value
            }
            return input
        })
        setInputs(s)
        props.setCategory(e.target.value)
    }

    function nameHandler(e) {
        let s = inputs.map(input => {
            if (input.desc === "Name") {
                input.value = e.target.value
            }
            return input
        })
        setInputs(s)
        props.setName(e.target.value)
    }


    function handleVisible(boolean) {
        // apiCall({
        //     url: "api/customerCategory",
        //     method: "GET"
        // }).then(res=>{
        //     setCategories(res.data)
        // })
        // apiCall({
        //     url: "api/territory",
        //     method: "GET"
        // }).then(res=>{
        //     setTerritories(res.data)
        // })
        props.clearObj();
        setIsVisible(boolean)
        setIsOpen(true)
        const s = inputs.map(input => {
            return {...input, value: ""}
        });
        setInputs(s);
    }


    useEffect(() => {
        props.getClients()
    }, [])

    function saveCategory(e) {
        e.preventDefault()
        props.saveClient({
            name: e.target[2].value,
            address: e.target[4].value,
            phone: e.target[6].value,
            tin: e.target[7].value,
            companyName: e.target[3].value,
            customerCategoryId: e.target[0].value,
            territoryId: e.target[1].value,
            active: true,
            longitude: props.currentLocation.longitude,
            latitude: props.currentLocation.latitude,
        })
        setIsOpen(false)

    }


    return (
        <div>
            {
                loading ? <div>
                        <ContentLoader/>
                    </div>
                    : <div className={"container p-4"}>
                        <Rodal height={400} width={800} visible={isOpen} onClose={() => setIsOpen(false)}>
                            <div className={"flex gap-2 h-full"}>
                                <div className={"w-1/2 h-full"}>
                                    <form onSubmit={saveCategory}
                                          className={"flex flex-col items-center justify-around h-full"}>
                                        <div className={"flex flex-wrap gap-3"}>
                                            <select className={"w-44 form-control my-1"}>
                                                {categories.map(category => (
                                                    <option key={category.id} value={category.id}>{category.name}</option>
                                                ))}
                                            </select>
                                            <select className={"w-44 form-control my-1"}>
                                                {territories.map(territory => (
                                                    <option key={territory.id}
                                                            value={territory.id}>{territory.title}</option>
                                                ))}
                                            </select>
                                            <input required={true} className={"w-44 form-control my-1"} placeholder={"Name"}
                                                   type="text"/>
                                            <input required={true} className={"w-44 form-control my-1"}
                                                   placeholder={"Company Name"} type="text"/>
                                            <input required={true} className={"w-44 form-control my-1"}
                                                   placeholder={"Address"} type="text"/>
                                            <input required={true} className={"w-44 form-control my-1"}
                                                   placeholder={"Reference point"} type="text"/>
                                            <input
                                                required={true}
                                                className={"w-44 form-control my-1"}
                                                placeholder={"Telephone"}
                                                type="number"
                                                minLength={12} // minLength ni 12 ga o'zgartiring
                                            />
                                            <input required={true} className={"w-44 form-control my-1"} placeholder={"TIN"}
                                                   type="text"/>

                                        </div>
                                        <button className={"bg-green-500 text-white w-4/5 py-2 rounded shadow mt-5"}>save
                                        </button>
                                    </form>
                                </div>
                                <div className={"w-1/2"}>
                                    <YandexMap action={clientActions.setLocation}/>
                                </div>
                            </div>
                        </Rodal>


                        {/*<UniversalModal width={800} height={400} visible={isVisible} inputs={inputs} yandexMap={<YandexMap />}*/}
                        {/*                setVisible={() => handleVisible(false)} buttons={buttons} saveButton={{formData: clientObj, action: props.saveClient}}/>*/}

                        <button onClick={() => handleVisible(true)}
                                className={"bg-green-500 shadow px-3 py-2 rounded text-white m-4 mt-0"}>Add Client
                        </button>
                        <Table
                            dataProps={props.data}
                            columnsProps={props.columns}
                            pagination={true}
                            changeSizeMode={true}
                            paginationApi={"/api/client?page={page}&size={limit}"}
                            columnOrderMode={true}
                            changeSizeModeOptions={[5, 10, 20, 30, 40, 50]}
                        />
                    </div>
            }
        </div>


    );
}

export default connect((state) => state.clientsReducer, clientActions)(Client);