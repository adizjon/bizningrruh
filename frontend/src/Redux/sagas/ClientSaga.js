import {clientActions} from "../reducers/ClientsReducer";
import {takeEvery, select, put, call} from "redux-saga/effects"
import ApiCall from "../../Components/Api/apiCall";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function* getClientsSaga() {
    try {
        const res = yield ApiCall({
            url: "/api/client?page=1&size=10",
            method: "GET"
        })
        yield put(clientActions.getClientsSuccess(res.data))
    } catch (e) {

        console.log("error")
        yield put(clientActions.getClientsFailure(e.data))
    }
}

function* saveTerritorySaga(action) {
    try {
        yield call(() => ApiCall({
            url: "/api/client",
            method: "POST",
            data: action.payload
        }));
        yield call(getClientsSaga);
    } catch (error) {
        const errorMessage = error.response.data || error.response.message;
        alert(errorMessage);
        toast.error(errorMessage, {
            position: toast.POSITION.TOP_RIGHT
        });
    }


}
export default function* territorySaga() {
    yield takeEvery("client/getClients", getClientsSaga)
    yield takeEvery("client/saveClient", saveTerritorySaga)
}