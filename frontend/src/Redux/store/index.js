import {configureStore} from "@reduxjs/toolkit";
import loginReducer from "../reducers/LoginReducer";
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from "../sagas/RootSaga";
import universalTableReducer from "../reducers/UniversalTableReducer";
import tableReducer from "../reducers/tableReducer";
import dashboardReducer from "../reducers/DashboardReducer";

const sagaMiddleWhere = createSagaMiddleware()

export const  store = configureStore({
    reducer:{
        loginReducer,
        universalTableReducer,
        dashboardReducer,
        tableReducer
    },
    middleware:[sagaMiddleWhere]
})
sagaMiddleWhere.run(rootSaga)
