import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {YMaps} from "react-yandex-maps";

const tableReducer = createSlice({
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
                title: "Title",
                key: "title",
                type: "text",
                show: true,
            },
            {
                id: 3,
                title: "Region",
                key: "region",
                type: "text",
                show: true,
            },
            {
                id: 4,
                title: "Code",
                key: "code",
                type: "text",
                show: true,
            },
        ],
        territoryObj: {
            title: "",
            code: "",
            sorting: 0,
            active: false,
            longitude: 0,
            latitude: 0
        },
        isLoading: false,
        error: null,
    },
    name: "territory",
    reducers: {
        getTerritory: (state, action) => {},
        getTerritorySuccess: (state, action)=>{
            state.data = action.payload.content
        },
        getTerritoryFailure: ()=>{},
        setTerritoryLocation: (state, action) => {
            state.territoryObj.longitude = action.payload.longitude
            state.territoryObj.latitude = action.payload.latitude
        },
        setTerritoryTitle: (state, action) => {
            state.territoryObj.title = action.payload
        },
        setTerritoryCode: (state, action) => {
            state.territoryObj.code = action.payload
        },
        setTerritorySorting: (state, action) => {
            state.territoryObj.sorting = action.payload
        },
        setTerritoryActive: (state, action) => {
            state.territoryObj.active = action.payload
        },
        saveTerritory: (state, action) => {},
        saveTerritorySuccess: (state, action)=>{
            state.data = action.payload.content
        },
        saveTerritoryFailure: ()=>{},
    },
});

export const territoryActions = { ...tableReducer.actions };
export default tableReducer.reducer;
