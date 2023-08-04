// import toast from "bootstrap/js/src/toast";
// import {roomModel} from "../reducers/RoomReducer";
// import {takeEvery, select,put, call} from "redux-saga/effects"
// import apiCall from "../../api/ApiCall";
//
// function* watchRoom(action) {
//     try {
//         const res = yield apiCall({url: "/api/room", method: "get"})
//         let x = JSON.stringify(res.data)
//         yield put(roomModel.getRoomSuccess({res: x}))
//     } catch (err) {
//         if(err.response.status!==403 && err.response.status!==401){
//             toast.error(err.response.data)
//         }
//         yield put(roomModel.errorFailure(err.message));
//     }
// }
//
// }
// export function* roomSaga() {
//     yield takeEvery("room/getRooms", watchRoom)
//     yield takeEvery("room/saveRoom", watchSaveRoom)
// }