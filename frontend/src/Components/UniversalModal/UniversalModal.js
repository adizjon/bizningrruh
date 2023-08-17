import React,{useEffect} from 'react';
import Rodal from "rodal";
import {connect} from "react-redux";


function UniversalModal({visible, inputs, setVisible, buttons, yandexMap, width, height, saveButton}) {

    // console.log(inputs)

    function drawInput(element, index) {
        // console.log(element)
        switch (element.type) {
            case "text":
                return <input
                    // required={element.required}
                    key={index}
                    className={"my-2 form-control"}
                    placeholder={element.desc}
                    type={element.type}
                    value={element.value}
                    onChange={element.action}/>
            case "checkbox":
                return <input
                    key={index}
                    className={"my-2"}
                    type={element.type}
                    onChange={element.action}/>
            case "select":
                // console.log("render",element.render[0])
                // console.log(element.title)
                return <select className={"form-control my-2"} onChange={element.action} key={index} value={element.value}>
                    <option value="">select</option>
                    {element.render.map((item, i)=> {
                        return <option key={i} value={element.title}>
                            {item[element.title]}
                        </option>
                    })}
                </select>
        }
    }

    return (
        <Rodal width={width} height={height} visible={visible} onClose={setVisible}>
            <div className={"d-flex"}>
                <div className={"w-1/2"}>
                    <form onSubmit={(e) => e.preventDefault()} className={"container"}>
                        {inputs.map((element, index) => (
                            drawInput(element, index)
                            ))}
                        {buttons?
                            <div className={"mt-5"}>
                        {buttons.map((btn, index) =>
                            <button key={index} onClick={btn.action} className={btn.style}>{btn.text}</button>)}
                            </div>
                            :
                            ""}
                            <button className={"px-3 py-2 text-white shadow bg-green-500 rounded"} onClick={()=>saveButton.action(saveButton.formData)}>save</button>
                            </form>
                            </div>
                        {yandexMap!==undefined?
                            <div className={"w-1/2"}>
                        {yandexMap}
                            </div>
                            :
                            ""}
                            </div>

                            </Rodal>)
}

export default UniversalModal;