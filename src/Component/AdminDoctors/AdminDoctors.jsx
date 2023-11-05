import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import DataTable from "react-data-table-component";
import { context } from "../../Context/Context";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

export default function AdminDoctors() {
  let { doctors } = useContext(context);

  const columns = [
    { name: "ID", selector: (row) => row.doctorID, sortable: true },
    { name: "Name", selector: (row) => row.user.firstName, sortable: true },
    {
      name: "Speciality",
      selector: (row) => row.specialization.specializationName,
      sortable: true,
    },
    { name: "Address", selector: (row) => row.user.address, sortable: true },
    { name: "Email", selector: (row) => row.user.emailAddress, sortable: true },
    { name: "Phone", selector: (row) => row.user.phoneNumber, sortable: true },
    { name: "Price", selector: (row) => row.price, sortable: true },
    // ...
  ];
  const options = {
    paging: true,
    pageLength: 10,
    searching: true,
    // ...
  };

  const [docId, setDocId] = useState("");
  const deleteDoctor = (doctorId, e) => {
    e.preventDefault();
    axios
      .delete(
        `${process.env.REACT_APP_URL_SITE}api/Admin/DeleteDoctor?id=${doctorId}`
      )
      .then((response) => {
        showDeleteSection();

        // Do something after successful deletion
      })
      .catch((error) => {
        // Handle error
      });
  };

  const [deleteShow, setDeleteShow] = useState("d-none");

  function showDeleteSection() {
    if (deleteShow === "d-none") {
      setDeleteShow("show d-block");
    } else {
      setDeleteShow("d-none");
    }
  }
  let { userData } = useContext(AuthContext);
  let navigate = useNavigate();
  if (userData.role === "Admin") {
    return (
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row">
              <div className="d-sm-flex pe-5 justify-content-between">
                <div className="col-sm-11">
                  <h3 className="page-title">List of Doctors</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/admin">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item">Users</li>
                    <li className="breadcrumb-item active">Doctor</li>
                  </ul>
                </div>
                <div className="col-sm-1">
                  <button
                    onClick={showDeleteSection}
                    data-toggle="modal"
                    className="btn btn-primary mt-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <DataTable columns={columns} data={doctors} options={options} />
          </div>

          <div
            className={`modal bg-black bg-opacity-50 fade ${deleteShow}`}
            id="Add_Specialities_details"
            role="dialog"
            aria-modal="true"
          >
            <div
              className="modal-dialog   modal-dialog-centered"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Delete Doctor</h5>
                  <button
                    onClick={showDeleteSection}
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="row form-row">
                      <div className="col-12">
                        <div className="form-group">
                          <label>Doctor ID:</label>
                          <input
                            type="text"
                            placeholder="Enter Doctor Id to Delete"
                            name="id"
                            value={docId}
                            className="form-control"
                            onChange={(e) => setDocId(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => deleteDoctor(docId, e)}
                      className="btn btn-primary btn-block"
                    >
                      Save Changes
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return navigate("/");
  }
}
