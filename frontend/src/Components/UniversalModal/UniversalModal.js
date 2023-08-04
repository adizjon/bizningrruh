import React from 'react';
import Rodal from "rodal";

function UniversalModal({visible, inputs, setVisible,buttons,yandexMap,width,height}) {
    return (
        <Rodal width={width} height={height} visible={visible} onClose={setVisible}>
            <div className={"d-flex"}>
                <div className={"w-1/2"}>
                    <form className={"container"}>
                        {inputs.map((it,index)=>
                            <input
                                required={it.required}
                                key={index}
                                className={"my-2 "+(it.type==="checkbox"||it.type==="radio"?"":"form-control")}
                                placeholder={it.desc}
                                type={it.type}
                                value={it.value}
                                checked={it.checked}
                                onChange={it.action}/>)}
                        {buttons?
                            <div className={"mt-5"}>
                                {buttons.map((btn, index) =>
                                <button key={index} onClick={btn.action} className={btn.style}>{btn.text}</button>)}
                            </div>
                            :
                            ""}
                    </form>
                </div>
                {yandexMap!==undefined?
                    <div className={"w-1/2"}>
                        {yandexMap()}
                    </div>
                    :
                    ""}
            </div>

        </Rodal>
    );
}

export default UniversalModal;