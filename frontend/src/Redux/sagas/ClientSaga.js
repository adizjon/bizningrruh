import {clientActions} from "../reducers/ClientsReducer";
import {takeEvery, select, put, call} from "redux-saga/effects"
import ApiCall from "../../Components/Api/apiCall";

function* getClientsSaga() {
    try {
        const res = yield ApiCall({
            url: "/api/client?page=1&size=10",
            method: "GET"
        })
        console.log(res)
        yield put(clientActions.getClientsSuccess(res.data))
    } catch (e) {
        console.log("error")
        yield put(clientActions.getClientsFailure(e.data))
    }
}

function* saveTerritorySaga(action) {
    // try {
        yield call(() => ApiCall({
            url: "/api/client",
            method: "POST",
            data: action.payload
        }))
        yield call(getClientsSaga)
    // } catch (e) {
    //     console.log("error")
    // }
}

export default function* territorySaga() {
    yield takeEvery("client/getClients", getClientsSaga)
    yield takeEvery("client/saveClient", saveTerritorySaga)
}