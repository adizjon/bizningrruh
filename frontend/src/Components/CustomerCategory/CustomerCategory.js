import React, {useEffect, useState} from 'react';
import Rodal from "rodal";
import 'rodal/lib/rodal.css';
import {useForm} from "react-hook-form";
import apiCall from "../Api/apiCall";
import axios from "axios";
import img from "./353430-checkbox-edit-pen-pencil_107516.png"

function CustomerCategory(props) {
    const [rodal, setRodal] = useState(false)
    const {handleSubmit, reset, register} = useForm()
    const [currentItem, setCurrentItem] = useState(null)
    const [category, setCategory] = useState([])
    const [button, setButton] = useState(false)

    function getCustomerCategory() {
        axios({
            url: "http://localhost:8080/customerCategory", method: "get"
        }).then(res => {
            setCategory(res.data)
        })
    }

    useEffect(() => {
        getCustomerCategory()
    }, [])

    function mySubmit(data) {
        if (currentItem !== null) {
            axios({
                url: "http://localhost:8080/customerCategory/put/" + currentItem, method: "put", data: data
            }).then(res => {
                getCustomerCategory()
            })
            setButton(true)
            setCurrentItem("")
            reset({
                code: "", name: "", description: "", active: false
            })
        } else {
            axios({
                url: "http://localhost:8080/customerCategory", method: "post", data: data
            }).then(res => {
                getCustomerCategory()
            })
            reset({
                code: "", name: "", description: "", active: false
            })
        }

        setRodal(false)
    }

    function editCustomerCategry(item) {
        setRodal(true)
        reset(item)
        setCurrentItem(item.id)


    }

    function closedModal() {
        setRodal(false)
        reset({
            code: "", name: "", description: "", active: false
        })
    }

    function getInActive(type ) {
        axios({
            url: "http://localhost:8080/customerCategory/getInActive/" + type,
            method: "get"
        }).then(res => {
            setCategory(res.data)
        })
    }

    return (<div>
        <button onClick={() => setRodal(true)} className={"btn btn-success mx-3 my-3"}>+Add Client Category</button>
        <div className="d-flex gap-1 mx-4 my-3">
            <button onClick={() => getInActive("true")} className="btn btn-outline-dark ">active</button>
            <button onClick={() => getInActive("false")} className="btn btn-outline-dark ">in active</button>
        </div>
        <Rodal height={500} visible={rodal} onClose={() => closedModal()}>
            <form onSubmit={handleSubmit(mySubmit)}>
                <div>
                    <input required={true}  {...register("code")} type="text" placeholder={"code"}
                           className={"form-control my-5 mx-1"}/>
                    <input required={true} {...register("name")} type="text" placeholder={"name"}
                           className={"form-control my-5 mx-1"}/>
                    <input required={true} {...register("description")} type="text" placeholder={"description"}
                           className={"form-control my-5 mx-1"}/>
                    <div className="d-flex gap-1 ">
                        <p>active:</p><input {...register("active")} type="checkbox"/>
                    </div>
                </div>
                {button ? <button className="btn btn-outline-dark my-3">edit</button> :
                    <button className="btn btn-outline-dark my-3">add</button>}

            </form>
        </Rodal>
        <table className={"table "} style={{width: 950, marginLeft: 20}}>
            <thead>
            <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Description</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {category.map(item => <tr>
                <td>{item.code}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>
                    <button onClick={() => editCustomerCategry(item)} className="btn btn-info"><img src={img}
                                                                                                    width={20}
                                                                                                    alt=""/>
                    </button>
                </td>
            </tr>)}
            </tbody>
        </table>
    </div>);
}

export default CustomerCategory;
