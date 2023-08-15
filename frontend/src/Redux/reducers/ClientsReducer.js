import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {YMaps} from "react-yandex-maps";

const clientsReducer = createSlice({
    name: "client",
    initialState: {
        data: [],
        columns: [
            {
                id: 1,
                title: "",
                key: "active",
                type: "checkbox",
                show: true,
            },
            {
                id: 2,
                title: "Client name",
                key: "name",
                type: "text",
                show: true,
            },
            {
                id: 3,
                title: "Company name",
                key: "companyName",
                type: "text",
                show: true,
            },
            {
                id: 4,
                title: "Telephone",
                key: "phone",
                type: "text",
                show: true,
            },
            {
                id: 5,
                title: "Address",
                key: "address",
                type: "text",
                show: true,
            },
            {
                id: 6,
                title: "Category",
                key: "category",
                type: "text",
                show: true,
            },
        ],
        clientObj: {
            territoryId: "",
            categoryId: "",
            name: "",
            companyName: "",
            address: 0,
            point: 0,
            telephone: "",
            TIN: ""
        },
        isLoading: false,
        error: null,
        currentLocation: {
            longitude: 0,
            latitude: 0
        }
    },
    reducers: {
        getClients: (state, action) => {},
        getClientsSuccess: (state, action)=>{
            state.data = action.payload
        },
        getClientsFailure: ()=>{},
        setTerritory: (state, action)=>{state.clientObj.territoryId=action.payload},
        setCategory: (state, action)=>{state.clientObj.categoryId=action.payload},
        setName: (state, action)=>{state.clientObj.name=action.payload},
        setCompanyName: (state, action)=>{state.clientObj.companyName=action.payload},
        setAddress: (state, action)=>{state.clientObj.address=action.payload},
        setPoint: (state, action)=>{state.clientObj.point=action.payload},
        setTelephone: (state, action)=>{state.clientObj.telephone=action.payload},
        setTIN: (state, action)=>{state.clientObj.TIN=action.payload},
        setLocation: (state, action)=>{
            state.currentLocation = action.payload
        },
        clearObj: (state)=>{
            state.clientObj = {
                territoryId: "",
                categoryId: "",
                name: "",
                companyName: "",
                address: 0,
                point: 0,
                telephone: "",
                TIN: ""
            }
        },
        saveClient: (state, action)=>{}
    },
});

export const clientActions = { ...clientsReducer.actions };
export default clientsReducer.reducer;
