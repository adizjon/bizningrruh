import {createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
    name: "login",
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
        }, changeUsername: (state, action) => {
            state.username = action.payload
        }, changePassword: (state, action) => {
            state.password = action.payload
        },
        changeActive: (state, action) => {
            state.active = !state.active
        },
        loginUser: (state, action) => {
            action.payload = {
                phone: state.phone,
                password: state.password,
                rememberMe: state.active
            }

        },
        navigateToAdmin: (state, action) => {
            let x = JSON.parse(action.payload.res)
            let data = x.data
            let accessToken = data.access_token;
            let refreshToken = data.refresh_token;
            if (state.active) {
                localStorage.setItem("accessToken", accessToken)
                localStorage.setItem("refreshToken", refreshToken)
            } else {
                localStorage.setItem("accessToken", data)
                localStorage.removeItem("refreshToken")
            }
            if(localStorage.getItem("accessToken")!=="BAD_CREDENTIALS"){
                state.navigateTo = "/admin"
            }
        }
    }
})
export default slice.reducer
export const loginModel = slice.actions