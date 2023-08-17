import {takeEvery, put} from "redux-saga/effects"
import {loginModel} from "../reducers/LoginReducer";
import axios from "axios";
import {select} from "redux-saga/effects"

function* watchLoginUser(action) {
    const currentState = yield select((state) => state.loginReducer);
    try {
        if (currentState.phone!=="" && currentState.password!=="") {
            const res = yield axios({
                url: "https://localhost/api/auth/login",
                method: "POST",
                data: action.payload
            })
            const resString = JSON.stringify(res);
            if (res.data === "BAD_CREDENTIALS") {
                alert("parol yoki login xato")
            } else {
                yield put(loginModel.navigateToAdmin({res: resString}))
            }
        } else {
            alert("iltimos login va parolni to'ldiring")
        }
    } catch (err) {
       alert("parol yoki login xato")
        console.clear()
    }
}

export function* loginSaga() {
    yield takeEvery("login/loginUser", watchLoginUser)
}