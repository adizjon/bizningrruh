import React, {useEffect, useState} from 'react';
import UniversalModal from "../UniversalModal/UniversalModal";
import Table from "../Table/Table";
import {connect, useSelector} from "react-redux";
import {territoryActions} from "../../Redux/reducers/TerritoryReducer";
import YandexMap from "../YMap/YandexMap";

function Index(props) {
    const territoryObj = useSelector(state => state.territoryReducer.territoryObj);

    const [identifier, setIdentifier] = useState({title: "", code: "", sorting: 0, active: false})

    const [isVisible, setIsVisible] = useState(false)

    const [inputs, setInputs] = useState([
        {type: "text", desc: "Title*", required: true, action: TitleValueHandler, value: identifier.title},
        {type: "text", desc: "Code", required: false, action: CodeValueHandler, value: identifier.code},
        {type: "number", desc: "Sorting", required: false, action: SortingValueHandler, value: identifier.sorting},
        {
            type: "checkbox",
            desc: "Active",
            required: false,
            action: ActiveHandler,
            value: "",
            checked: identifier.active
        }
    ])
    const [buttons, setButtons] = useState([])





    function TitleValueHandler(e) {
        identifier.title = e.target.value
        setIdentifier({...identifier,title:e.target.value})
        let state = inputs.map(input => {
            if (input.desc === "Title*") {
                input.value = e.target.value
            }
            return input
        })
        setInputs(state)
        props.setTerritoryTitle(e.target.value)
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
        props.setTerritoryCode( e.target.value)
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
        props.setTerritorySorting(e.target.value)
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
        props.setTerritoryActive( e.target.checked)
    }



    function handleVisible(boolean) {
        setIdentifier({title: "", code: "", sorting: 0, active: false})
        setIsVisible(boolean)
    }

    useEffect(() => {
        props.getTerritory();
    }, [])


    return (
        <div style={{maxWidth:"120%",maxHeight:"100%",overflow:"scroll"}}>


            <UniversalModal width={800} height={400} visible={isVisible} inputs={inputs} yandexMap={<YandexMap action={territoryActions.setTerritoryLocation} />}
                            setVisible={() => handleVisible(false)} buttons={buttons} saveButton={{formData: territoryObj, action: props.saveTerritory}}/>


            <button style={{marginLeft:850,marginTop:20}} onClick={() => handleVisible(true)}
                    className={"bg-green-600 text-white rounded-md px-1 py-2 "}>add territory
            </button>
            <div style={{marginLeft:20,marginTop:-40}}>
                {/*<select  onChange={(e) => searching(e.target.value)} name="" id="" className="form-select w-25">*/}
                {/*    <option value="true">Active</option>*/}
                {/*    <option value="false">In Active</option>*/}
                {/*</select>*/}
            </div>



            <div style={{marginTop:50}}>
                <Table
                    dataProps={props.data}
                    columnsProps={props.columns}
                    pagination={true}
                    changeSizeMode={true}
                    paginationApi={"/api/territory?page={page}&size={limit}"}
                    columnOrderMode={true}
                    changeSizeModeOptions={[5, 10, 20, 30, 40, 50]}
                />

            </div>

        </div>
    );
}

export default connect(state=>state.territoryReducer, territoryActions)(Index);