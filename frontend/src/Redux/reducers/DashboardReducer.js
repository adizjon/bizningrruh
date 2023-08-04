import {createSlice} from "@reduxjs/toolkit";

const slice = createSlice({
    name: "dashboard",
    initialState: {
        dashboardData: {},
        hideShow: "hidden",
        error: null
    }, reducers: {
        getDashboardData: (state, action) => {
        },
        getDashboardDataSuccess: (state, action) => {
            state.dashboardData = action.payload
            console.log(action.payload)
        },
        getDashboardDataFailure: (state, action) => {
            state.error = action.payload
        },
        changeHideShow: (state, action) => {
            if (state.hideShow === "hidden") {
                state.hideShow = "block"
            } else {
                state.hideShow = "hidden"
            }
        }
    }
})
export default slice.reducer
export const dashboardModel = slice.actions