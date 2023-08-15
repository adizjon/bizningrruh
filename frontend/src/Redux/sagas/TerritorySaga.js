import {territoryActions} from "../reducers/TerritoryReducer";
import {takeEvery, select, put, call} from "redux-saga/effects"
import ApiCall from "../../Components/Api/apiCall";

function* getTerritorySaga() {
    try {
        const {data} = yield ApiCall({
            url: "/api/territory?page=1&size=10",
            method: "GET"
        })
        yield put(territoryActions.getTerritorySuccess(data))
    } catch (e) {
        yield put(territoryActions.getTerritoryFailure(e.data))
    }
}

function* saveTerritorySaga(action) {
    try {
        const {data} = yield ApiCall({
            url: "/api/territory",
            method: "POST",
            data: action.payload
        })
        yield call(getTerritorySaga())
        yield put(territoryActions.getTerritorySuccess(data))
    } catch (e) {
        yield put(territoryActions.getTerritoryFailure(e.data))
    }
}

export default function* territorySaga() {
    yield takeEvery("territory/getTerritory", getTerritorySaga)
    yield takeEvery("territory/saveTerritory", saveTerritorySaga)
}