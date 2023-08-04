import {dashboardModel} from "../reducers/DashboardReducer";
import {takeEvery, select, put, call} from "redux-saga/effects"
import ApiCall from "../../Components/Api/apiCall";

function* watchGetDashboardData() {
    try {
        const {data} = yield ApiCall({
            url: "/dashboard",
            method: "GET"
        })
        console.log(data)
        yield put(dashboardModel.getDashboardDataSuccess({...data.body}))
    } catch (e) {
        yield put(dashboardModel.getDashboardDataFailure(e.data))
    }
}

export function* dashboardSaga() {
    yield takeEvery("dashboard/getDashboardData", watchGetDashboardData)
}