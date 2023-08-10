import React, {useEffect} from 'react';
import UniversalTable from "../UniversalTable";
import {useState} from "react";
import axios from "axios";
import UniversalModal from "../UniversalModal/UniversalModal";
import {Map, Placemark, SearchControl, YMaps} from "react-yandex-maps";
import Table from "../Table/Table";
import {Route} from "react-router-dom";

function Index(props) {

    const [data, setData] = useState([]);

    let columns2 = [
        {
            id: 1,
            title: "Name",
            key: "name",
            type: "text",
            show: true,
        },
        {
            id: 2,
            title: "Email",
            key: "email",
            type: "text",
            show: true,
        },
        {
            id: 3,
            title: "Body",
            key: "body",
            type: "text",
            show: true,
        },
    ];

    useEffect(() => {
        axios
            .get("https://jsonplaceholder.typicode.com/comments")
            .then(({data}) => {
                setData(data);
            });
        searching()
    }, []);


    function searching(val) {
        console.log(typeof val)
        let myBool = Boolean(val)
        if (val!==undefined){
            axios({
                url: "http://localhost:8080/api/territory/hello/" + myBool
            }).then(res => {
                console.log(res.data)
                setData(res.data)
            })
        }

    }


    const [identifier, setIdentifier] = useState({title: "", code: "", sorting: 0, active: false})
    const [isVisible, setIsVisible] = useState(false)


    const [inputs, setInputs] = useState([
        {type: "text", desc: "Title*", required: true, action: TitleValueHandler, value: identifier.title},
        {type: "text", desc: "Code", required: false, action: CodeValueHandler, value: identifier.code},
        {type: "text", desc: "Sorting", required: false, action: SortingValueHandler, value: identifier.sorting},
        {
            type: "checkbox",
            desc: "Active",
            required: false,
            action: ActiveHandler,
            value: "",
            checked: identifier.active
        }
    ])
    const [buttons, setButtons] = useState([
        // {style:"btn btn-danger mt-5",text:"EXIT",action:()=>handleVisible(false)},
        {style: "btn btn-success mt-5", text: "SAVE", action: saveUser}
    ])
    console.log(identifier)

    function TitleValueHandler(e) {
        identifier.title = e.target.value
        setIdentifier({...identifier})
        let state = inputs.map(input => {
            if (input.desc === "Title*") {
                input.value = e.target.value
            }
            return input
        })
        setInputs(state)
    }

    function CodeValueHandler(e) {
        identifier.code = e.target.value
        setIdentifier({...identifier})
        let state = inputs.map(input => {
            if (input.desc === "Code") {
                input.value = e.target.value
            }
            return input
        })
        setInputs(state)
    }

    function SortingValueHandler(e) {
        identifier.sorting = e.target.value
        setIdentifier({...identifier})
        let state = inputs.map(input => {
            if (input.desc === "Sorting") {
                input.value = e.target.value
            }
            return input
        })
        setInputs(state)
    }

    function ActiveHandler(e) {
        identifier.active = e.target.checked
        setIdentifier({...identifier})
        let state = inputs.map(input => {
            if (input.desc === "Active") {
                input.checked = e.target.checked
            }
            return input
        })
        setInputs(state)
    }


    const [exampleArray, setExampleArray] = useState([])

    function saveUser() {
        exampleArray.push(identifier)
        setExampleArray([...exampleArray])
        handleVisible(false)
    }

    function handleVisible(boolean) {
        setIdentifier({firstName: "", lastName: ""})
        setIsVisible(boolean)
        console.log(exampleArray)
    }

    function YMap() {
        return <YMaps>
            <Map defaultState={{
                center: [55.751574, 37.573856],
                zoom: 5
            }}>
                <SearchControl options={{
                    float: 'right'
                }}/>
                <Placemark geometry={[55.684758, 37.738521]}/>
            </Map>
        </YMaps>
    }


    const [testData, setTestData] = useState([])
    let columns = [
        {
            title: "ID",
            key: "id",
            dataType: "number",
            show: true,
            tint: 1
        },
        {
            title: "NAME",
            key: "name",
            dataType: "text",
            show: true,
            tint: 2
        },
        {
            title: "EMAIL",
            key: "email",
            dataType: "text",
            show: true,
            tint: 3
        }
    ]

    function getTestData() {
        axios({
            url: "https://jsonplaceholder.typicode.com/users",
            method: "get"
        }).then(res => {
            setTestData(res.data)
        })
    }


    useEffect(() => {
        getTestData()
    }, [])


    return (
        <div style={{maxWidth:"120%",maxHeight:"100%",overflow:"scroll"}}>


            <UniversalModal width={700} height={400} visible={isVisible} inputs={inputs} yandexMap={YMap}
                            setVisible={() => handleVisible(false)} buttons={buttons}/>

            {/*<UniversalTable data={testData} columns1={columns}*/}
            {/*                api={"https://jsonplaceholder.typicode.com/users?_page={page}&_limit={limit}"}/>}*/}

            <button style={{marginLeft:850,marginTop:20}} onClick={() => handleVisible(true)}
                    className={"bg-green-600 text-white rounded-md px-1 py-2 "}>add territory
            </button>
               <div style={{marginLeft:20,marginTop:-40}}>
                   <select  onChange={(e) => searching(e.target.value)} name="" id="" className="form-select w-25">
                       <option value="true">Active</option>
                       <option value="false">In Active</option>
                   </select>
               </div>



           <div style={{marginTop:50}}>
               <Table
                   dataProps={data}
                   columnsProps={columns2}
                   pagination={true}
                   changeSizeMode={true}
                   paginationApi={"https://jsonplaceholder.typicode.com/comments?_page={page}&_limit={limit}"}
                   columnOrderMode={true}
                   changeSizeModeOptions={[5, 10, 20, 30, 40, 50]}
               />

           </div>

        </div>
    );
}

export default Index;