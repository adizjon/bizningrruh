import {all, fork} from "redux-saga/effects";
import {loginSaga} from "./LoginSaga";
import UniversalTableSaga from "./UniversalTableSaga";
import tableSaga from "./tableSaga";
import {dashboardSaga} from "./DashboardSaga";

export function* rootSaga() {
    yield all([
        fork(loginSaga),
        fork(UniversalTableSaga),
        fork(tableSaga),
        fork(dashboardSaga)
    ])
}