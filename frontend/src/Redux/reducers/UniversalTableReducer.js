import {createSlice} from "@reduxjs/toolkit";

const slice = createSlice({
    name: "universalTable",
    initialState: {
        columns: [],
        currentPage:1,
        showHide: false,
        dataState:[],
        sizeOfPage:20,
        currentDraggingColumn: 0,
        columnOrderModalVisibility: false,
        modalColumns: [],
    },
    reducers: {
        claimData: (state, action) => {
            state.columns = action.payload.columns;
            state.dataState = action.payload.data;
        },
        setShowHide: (state, action) => {
            state.showHide = action.payload
        },
        setHide: (state, action) => {
            // state.columns[action.payload.index].show=action.payload.data
        },
        filterColumns: (state, action) => {
            state.columns.map((item, index) => {
                if (index === action.payload) {
                    item.show = !item.show;
                }
            })
        },
        changeSizeOfPage: (state, action) => {
        },
        changeData: (state, action) => {
            state.data = action.payload.data;
            state.sizeOfPage = action.payload.size;
        },
        handlePageChange: (state, action) => {
            state.currentPage = action.payload;
        },
        changePage: (state, action) => {
            if (
                action.payload.current !== -1 &&
                action.payload.current != action.payload.size
            ) {
                state.currentPage = action.payload.current;
            }
        },
        changeSizeOfPerPage: (state, action) => {
        },
        changeSizeOfPerPageSuccess: (state, action) => {
            state.dataState = action.payload.data;
            state.sizeOfPage = action.payload.size;
            state.currentPage = action.payload.currentPage;
        },
        // changeOrder: (state, action) => {
        //     let a = state.columns.map(column=>{
        //         if (column.key===action.payload.key) column=action.
        //     })
        // }
        setColumnModalVisibility: (state, action) => {
            state.columnOrderModalVisibility = action.payload;
        },
        setCurrentDragingColumn: (state, action) => {
            state.currentDraggingColumn = action.payload;
        },
        dropColumn: (state, action) => {
            const { currentDraggingColumn } = state;
            const draggedElementIndex = currentDraggingColumn;
            const droppedElementIndex = action.payload;

            [
                state.modalColumns[draggedElementIndex],
                state.modalColumns[droppedElementIndex],
            ] = [
                state.modalColumns[droppedElementIndex],
                state.modalColumns[draggedElementIndex],
            ];
        },
        setModalColumns: (state, action) => {
            state.modalColumns = action.payload;
        },
        saveColumnOrder: (state, action) => {
            state.columns = state.modalColumns;
        },
    }
})
export const universalTable = {...slice.actions}
export default slice.reducer
