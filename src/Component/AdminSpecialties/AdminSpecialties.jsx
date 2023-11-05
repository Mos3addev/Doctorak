import axios from "axios";
import React, { useContext, useState } from "react";
import DataTable from "react-data-table-component";
import { context } from "../../Context/Context";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

export default function AdminSpecialties() {
  const [imageFile, setImageFile] = useState("");
  const [imageID, setImageID] = useState("");
  const [MySpec, setMySpec] = useState({
    specID: 0,
    specializationName: "",
    specializationDescription: "SpecDescription",
    numberOfDoctors: 0,
    specImage: "string",
  });
  const handleNameSpecSelect = (e) => {
    let AllMySpec = { ...MySpec };
    AllMySpec[e.target.name] = e.target.value;
    setMySpec(AllMySpec);
  };
  const handleImageSelect = (event) => {
    setImageFile(event.target.files[0]);
  };
  let { spec, fetchShowAllSpecs } = useContext(context);
  const handleAddSpecialization = async (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_URL_SITE}api/Admin/AddSpecialization`;
    await axios
      .post(url, MySpec)
      .then((response) => {
        fetchShowAllSpecs();
        showSection();
        // handle success
      })
      .catch((error) => {
        console.error(error);
        // handle error
      });
  };
  let { userData } = useContext(AuthContext);

  const handleImageUpload = (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_URL_SITE}api/Admin/ChangeSpecPicture`;
    const formData = new FormData();
    formData.append("id", imageID);
    formData.append("file", imageFile);
    axios
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        showPhotoSection();
        // handle success
      })
      .catch((error) => {
        console.error(error);
        // handle error
      });
  };

  const [specId, setSpecId] = useState("");
  const deleteSpec = async (id, e) => {
    e.preventDefault();
    await axios
      .delete(`${process.env.REACT_APP_URL_SITE}api/Admin/DeleteSpec?id=${id}`)
      .then((response) => {
        fetchShowAllSpecs();
      })
      // Do something after successful deletion
      .catch((error) => {
        // Handle error
      });
    showDeleteSection();
  };

  const columns = [
    { name: "ID", selector: (row) => row.specID, sortable: true },
    { name: "Name", selector: (row) => row.specializationName, sortable: true },
    {
      name: "Number of Doctors",
      selector: (row) => row.numberOfDoctors,
      sortable: true,
    },
    // ...
  ];
  const options = {
    paging: true,
    pageLength: 10,
    searching: true,
    // ...
  };

  const [show, setShow] = useState("d-none");
  const [deleteShow, setDeleteShow] = useState("d-none");
  const [photoSection, setPhotoSection] = useState("d-none");

  function showSection() {
    if (show === "d-none") {
      setShow("show d-block");
    } else {
      setShow("d-none");
    }
  }

  function showDeleteSection() {
    if (deleteShow === "d-none") {
      setDeleteShow("show d-block");
    } else {
      setDeleteShow("d-none");
    }
  }

  function showPhotoSection() {
    if (photoSection === "d-none") {
      setPhotoSection("show d-block");
    } else {
      setPhotoSection("d-none");
    }
  }

  let navigate = useNavigate();
  if (userData.role === "Admin") {
    return (
      <>
        <div className="page-wrapper">
          <div className="content container-fluid">
            <div className="page-header">
              <div className="row">
                <div className="d-sm-flex justify-content-between">
                  <div className="">
                    <h3 className="page-title">Specialties</h3>
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to="/admin">Dashboard</Link>
                      </li>
                      <li className="breadcrumb-item active">Specialties</li>
                    </ul>
                  </div>
                  <div className="">
                    <button
                      onClick={showSection}
                      data-toggle="modal"
                      className="btn btn-primary float-right mt-2"
                    >
                      Add
                    </button>
                  </div>

                  <div className="">
                    <button
                      onClick={showPhotoSection}
                      data-toggle="modal"
                      className="btn btn-primary float-right mt-2"
                    >
                      Add Image
                    </button>
                  </div>
                  <div className="">
                    <button
                      onClick={showDeleteSection}
                      data-toggle="modal"
                      className="btn btn-primary float-right mt-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <DataTable columns={columns} data={spec} options={options} />
            </div>
          </div>
        </div>

        <div
          className={`modal bg-black bg-opacity-50 fade ${show}`}
          id="Add_Specialties_details"
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Specialty</h5>
                <button
                  onClick={showSection}
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleAddSpecialization}>
                  <div className="row form-row">
                    <div className="col-12">
                      <div className="form-group">
                        <label>Specialty Name</label>
                        <input
                          type="text"
                          name="specializationName"
                          className="form-control"
                          onChange={handleNameSpecSelect}
                        />
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`modal bg-black bg-opacity-50 fade ${deleteShow}`}
          id="delete_Specialties_details"
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Specialty</h5>
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
                        <label>Delete Specialty</label>
                        <input
                          type="text"
                          placeholder="Enter Specialty Id to Delete"
                          name="id"
                          value={specId}
                          className="form-control"
                          onChange={(e) => setSpecId(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => deleteSpec(specId, e)}
                    className="btn btn-primary btn-block"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`modal bg-black bg-opacity-50 fade ${photoSection}`}
          id="Add_Image_Specialties_details"
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Image</h5>
                <button
                  onClick={showPhotoSection}
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleImageUpload}>
                  <div className="row form-row">
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>ID</label>
                        <input
                          type="text"
                          placeholder="Enter Specialty Id"
                          name="id"
                          value={imageID}
                          className="form-control"
                          onChange={(e) => setImageID(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Upload Image</label>
                        <input
                          type="file"
                          className="form-control"
                          onChange={handleImageSelect}
                        />
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return navigate("/");
  }
}
