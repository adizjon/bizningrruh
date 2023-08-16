import Select from "react-select";
import { connect } from "react-redux";
import {tableActions} from "../../Redux/reducers/tableReducer";
import { useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import { useLocation } from "react-router-dom";
import "./Table.css";
import ExcelButton from "../ExcelButton/ExcelButton";
const Table = ({
  columnsProps,
  dataProps,
  columnOrderModalVisibility,
  columns,
  pagination,
  changeSizeMode,
  setColumnModalVisibility,
  claimData,
  filterVisibility,
  paginationApi,
  handlePageChange,
  changePaginationTo,
  sizeOfPage,
  data,
  additionalColumns,
  changeSizeModeOptions,
  columnOrderMode,
  getExcelFile,
  currentPage,
  saveColumnOrder,
  setCurrentDragingColumn,
  dropColumn,
  modalColumns,
  setModalColumns,
}) => {

  console.log(data)

  const location = useLocation();
  useEffect(() => {
    claimData({ columns: columnsProps, data: dataProps });
    if (pagination === true && !paginationApi)
      alert("Pagination API is  required!");
    if (paginationApi) {
      changePaginationTo({
        api: paginationApi,
        size: 10,
        page: currentPage,
      });
    }
  }, [dataProps]);


  function drawBody(item, type) {
    switch (type) {
      case "text":
        return item
      case "checkbox":
        return <input readOnly type="checkbox" checked={(item==="true")} />
      case "select":
        return <select>{item.map((el, i)=>
            <option key={i} value={el.value}>{el.title}</option>
        )}</select>
      case "button":
        return <button onClick={item.action}>{item.title}</button>
    }
  }


  return (
    <div className="universal_table">
      {/* 👇 Pagination Per Page Changing Select 👇  */}
      {/*{console.log(data)}*/}

      <div className="d-flex  ps-4 me-5 pe-4 gap-2 justify-content-between">
        <div className="d-flex gap-2">
          {changeSizeMode && columns.length ? (
            <label style={{ width: "140px" }}>
              <span>Items in per page:</span>

              <select
                className="form-select"
                defaultValue={"10"}
                onChange={(e) => {
                  handlePageChange(0);
                  changePaginationTo({
                    api: paginationApi,
                    size: parseInt(e.target.value),
                    page: 0,
                  });
                }}
              >
                {changeSizeModeOptions.map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          ) : (
            ""
          )}

          {/* 👇 Table Setup 👇  */}
          <div className="d-flex align-items-end gap-2">
            {/*<button*/}
            {/*  style={{ width: "100px" }}*/}
            {/*  className="column_order"*/}
            {/*  download*/}
            {/*  onClick={()=>getExcelFile(data)}*/}
            {/*>*/}
            {/*  Excel*/}
            {/*</button>*/}
            <ExcelButton url={`http://localhost:8080/api/territory/excel?page=${currentPage}&size=${sizeOfPage}`} />
            {/* 👇 Hide / Show Columns 👇  */}
            <label style={{ width: "200px" }}>
              <span>Table Setup</span>
              <Select
                isMulti
                name="columns"
                options={columns.map((item) => ({
                  label: item.title,
                  value: item.id,
                }))}
                onChange={(state, action) =>
                  filterVisibility({ selectedItem: state, action })
                }
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </label>

            {/* 👇 Column Order 👇  */}
            {columnOrderMode && columns.length ? (
              <button
                data-toggle="modal"
                data-target="#exampleModal"
                className="column_order"
                onClick={() => setColumnModalVisibility(true)}
              >
                Column Order
              </button>
            ) : (
              ""
            )}
          </div>
        </div>

  

        {/* Bootstrap Modal */}

        {columnOrderModalVisibility ? (
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Modal title
                  </h5>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body d-flex flex-column gap-1">
                  {modalColumns.map((item, index) => (
                    <div
                      draggable={true}
                      onDrop={(e) => {
                        e.preventDefault();
                        dropColumn(index);
                      }}
                      onDragStart={() => {
                        setCurrentDragingColumn(index);
                      }}
                      key={item.id}
                      onDragOverCapture={(e) => e.preventDefault()}
                      className={
                        "w-100 d-flex bg-secondary text-white p-2" +
                        (item.show ? "" : " hidden")
                      }
                    >
                      {item.title}
                    </div>
                  ))}
                </div>
                <div className="modal-footer">
                  <button
                    onClick={() => setModalColumns(columns)}
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    onClick={saveColumnOrder}
                    data-dismiss="modal"
                    type="button"
                    className="btn btn-primary"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      {/* 👇 Table Data 👇  */}

          <table className="table table-bordered " style={{margin:25,width:930}}>
            <thead className={"table-dark"}>
              <tr>
                {columns.map((item) => (
                  <th key={item.id} className={item.show ? "active" : "hidden"}>
                    {item.title}
                  </th>
                ))}
                {additionalColumns ? <th>More</th> : ""}
              </tr>
            </thead>
            <tbody className={""}>
              {data?.map((item) => (
                <tr key={item.id}>
                  {columns.map((col) => (
                    <td className={col.show ? "" : "hidden"} key={col.id}>
                      {drawBody(item[col.key], col.type)}
                    </td>
                  ))}
                  {additionalColumns ? <td>{additionalColumns}</td> : ""}
                </tr>
              ))}
            </tbody>
          </table>

      {/* 👇 Pagination 👇  */}

      <div className="d-flex justify-content-end pe-5">
        <Pagination
          onChange={(e, page) => {
            handlePageChange(page);
            changePaginationTo({
              api: paginationApi,
              size: sizeOfPage,
              page,
            });
          }}
          page={currentPage}
          count={Math.ceil(dataProps.length / sizeOfPage)}
          variant="outlined"
          shape="rounded"
        />
      </div>
    </div>
  );
};

export default connect((state) => state.tableReducer, tableActions)(Table);
