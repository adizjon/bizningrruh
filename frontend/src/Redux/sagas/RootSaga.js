import {all, fork} from "redux-saga/effects";
import {loginSaga} from "./LoginSaga";
import UniversalTableSaga from "./UniversalTableSaga";
import tableSaga from "./tableSaga";
import {dashboardSaga} from "./DashboardSaga";
import territorySaga from "./TerritorySaga"
import clientSaga from "./ClientSaga"

export function* rootSaga() {
    yield all([
        fork(loginSaga),
        fork(UniversalTableSaga),
        fork(tableSaga),
        fork(dashboardSaga),
        fork(territorySaga),
        fork(clientSaga)
    ])
}