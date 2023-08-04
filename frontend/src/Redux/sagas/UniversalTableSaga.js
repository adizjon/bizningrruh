import axios from "axios";
import {put, takeEvery} from "redux-saga/effects";
import {universalTable} from "../reducers/UniversalTableReducer"; // Make sure to import tableActions from the correct path

function* changeSizeOfPerPage(action) {


    let api = action.payload.api;
    let sizeOfPerPage = action.payload.sizeOfPerPage;
    let currentPage = action.payload.currentPage;
    api = api.replace("{limit}", sizeOfPerPage);

    if (action.payload.isPage){
        currentPage=1
        api = api.replace("{page}", 1);
    } else {
        api = api.replace("{page}", currentPage);
    }


    const {data} = yield axios.get(api);
    yield put({
        type: "universalTable/changeSizeOfPerPageSuccess", payload: {
            data,
            size: sizeOfPerPage,
            currentPage:currentPage
        }
    });
}


function* tableSaga() {
    yield takeEvery(universalTable.changeSizeOfPerPage.type, changeSizeOfPerPage)
}

export default tableSaga;