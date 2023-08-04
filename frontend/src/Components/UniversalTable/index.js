import React, {useEffect} from 'react';
import {connect, useDispatch, useSelector} from "react-redux";
import {universalTable} from "../../Redux/reducers/UniversalTableReducer"
import DragColumns from "./DragColumns/App"
import Drag2 from "./Drag2";


function Index(props) {
    console.log(props.columns)

    function checkColumns(name) {
        let column = props.columns.find(column => column.title === name)
        return column.show
    }

    function hide(index) {
        props.filterColumns(index);
    }

    useEffect(() => {
        if (props.dataState.length === 0) {
            props.claimData({
                data: props.data,
                columns: props.columns1
            });
        }
    }, [props.data])

    useEffect(() => {
        props.changeSizeOfPerPage({
            api: props.api,
            sizeOfPerPage: 20,
            currentPage: 1,
            isPage: false, // asdasdashbcuacbiabfiadbf
        })
    }, [])



    return (
        <div>
            <Drag2
                columns={props.columns}
                // changeOrder={}
            />
            <div className='flex gap-8'>
                <select onChange={(e) => {
                    props.changeSizeOfPerPage({
                        api: props.api,
                        sizeOfPerPage: parseInt(e.target.value),
                        currentPage: props.currentPage,
                        isPage: true
                    });
                }} className='px-3 py-2 text-blue-700 border border-blue-700  rounded-xl'>
                    <option value={20}>20 each</option>
                    <option value={15}>15 each</option>
                    <option value={10}>10 each</option>
                    <option value={5}>5 each</option>
                </select>
                {/* SHOW/HIDE BUTTON */}
                <div className='relative '>
                    <button className='px-3 py-2 text-blue-700 border border-blue-700  rounded-xl'
                            onClick={() => props.setShowHide(!props.showHide)}>show/hide columns
                    </button>
                    {props.showHide ?
                        <ul className='rounded-xl overflow-hidden box-border border-1 w-full text-blue-700 border border-blue-700 flex flex-col absolute'>
                            {
                                props.columns.map((column, index) => {
                                    return <li onClick={() => hide(index)}
                                               className={'px-2 py-1 ' + (checkColumns(column.title) ? 'bg-white' : 'bg-blue-700 text-white')}
                                               key={column.key}>{column.title.toLowerCase()}</li>
                                })
                            }
                        </ul>
                        :
                        ""}
                </div>
            </div>
            <table className='min-w-full text-left text-sm font-light'>
                <thead className='border-b font-medium dark:border-neutral-500'>
                <tr>
                    {
                        props.columns.map((item) => (
                            <th className={"px-6 py-4" + (item.show ? " active" : " hidden")} key={item.key}>
                                {item.title}
                            </th>
                        ))
                    }
                </tr>
                </thead>
                <tbody>
                {
                    props.dataState.map((item, index) => (
                        <tr className='border-b dark:border-neutral-500' key={item.id}>
                            {
                                props.columns.map((column) => (
                                    <td className={"whitespace-nowrap px-6 py-4 font-medium" + (column.show ? " active" : " hidden")}
                                        key={column.key}>
                                        {item[column.key]}
                                    </td>
                                ))
                            }
                        </tr>
                    ))
                }
                </tbody>
            </table>
            <div className={"flex justify-center gap-2 max-w-lg mx-auto flex-wrap mt-5"}>
                {
                    props.currentPage===1?
                        ""
                        :
                        <button className={"shadow shadow-blue-600 px-3 py-2 text-white rounded-lg bg-blue-700"} onClick={(e) => {
                            props.changeSizeOfPerPage({
                                api: props.api,
                                sizeOfPerPage: props.sizeOfPage,
                                currentPage: (props.currentPage - 1),
                                isPage: false
                            });
                        }}>{"<-"}</button>
                }

                {Array.from(
                    {length: Math.ceil(props.data.length / props.sizeOfPage)},
                    (_, index) => index + 1
                ).map((item, index) => <button key={index} onClick={(e) => {
                    props.changeSizeOfPerPage({
                        api: props.api,
                        sizeOfPerPage: props.sizeOfPage,
                        currentPage: (index + 1),
                        isPage: false
                    });
                }} disabled={props.currentPage === (index + 1)}
                                               className={"shadow shadow-blue-600 px-3 py-2 text-white rounded-lg" + (props.currentPage === (index + 1) ? " bg-blue-950" : " bg-blue-700")}>{index + 1}</button>)}
                {
                    Math.ceil(props.data.length / props.sizeOfPage)===props.currentPage?
                        ""
                        :
                        <button className={"shadow shadow-blue-600 px-3 py-2 text-white rounded-lg bg-blue-700"} onClick={(e) => {
                            props.changeSizeOfPerPage({
                                api: props.api,
                                sizeOfPerPage: props.sizeOfPage,
                                currentPage: (props.currentPage + 1),
                                isPage: false
                            });
                        }}>{"->"}</button>
                }
            </div>
        </div>
    );
}

export default connect(state => state.universalTableReducer, {...universalTable})(Index);