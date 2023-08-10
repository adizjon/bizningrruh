import {createSlice} from '@reduxjs/toolkit';

const filter = createFiler({
    name: "filter",
    initialState: {
        phone: "",
        username: "",
        password: "",
        active: false,
        navigateTo: ""
    },
    reducers: {
        changePhone: (state, action) => {
            state.phone = action.payload
        }
    }
})
export default filter
export const filter = filter.actions