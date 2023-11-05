/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useContext } from "react";
import "./Booking.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

export default function Booking() {
  let { userData } = useContext(AuthContext);
  const [dateString, setDateString] = useState("2023-05-23T14:03:28.931Z");
  const [formattedDate, setFormattedDate] = useState("");
  const [error, setError] = useState(null);
  const [profileDoctor, setProfileDoctor] = useState();
  const navigate = useNavigate();
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const date = new Date(dateString);
    const isoDate = date.toISOString();
    setFormattedDate(isoDate);
    try {
      let { data } = await axios.post(
        `${process.env.REACT_APP_URL_SITE}api/Users/AddAppointment`,
        {
          userId: userData.nameid || 1,
          doctorID: id,
          appointmentDate: formattedDate,
        }
      );
      setProfileDoctor(data);
      navigate("/");
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };
  const { id } = useParams();
  const fetchShowDoctor = async () => {
    try {
      let { data } = await axios.get(
        `${process.env.REACT_APP_URL_SITE}api/Users/ShowDoctor?doctorId=${id}`
      );
      setProfileDoctor(data);
    } catch (error) {}
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchShowDoctor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (profileDoctor == null) {
    return (
      <div className="container">
        <div className="d-flex justify-content-center align-items-center">
          <h1 className="main-color mt-5">
            Loading <i className="fas fa-spinner fa-spin"></i>
          </h1>
        </div>
      </div>
    );
  }
  if (userData.role === "Patient") {
    return (
      <>
        <div className="container">
          <div className="row p-5">
            <div className="col-12">
              <div className="card">
                <div className="card-body d-flex justify-content-between">
                  <div className="row">
                    <div className="col-md-4 mb-2">
                      <img
                        className="w-100 rounded-2"
                        src={`https://healthcaresys.azurewebsites.net/api/Users/GetProfilePic?id=${profileDoctor.doctor.user.id}`}
                      />
                    </div>
                    <div className="col-8">
                      <h4 className="doctor-name">
                        Dr.{profileDoctor.doctor.user.firstName}{" "}
                        {profileDoctor.doctor.user.lastName}
                      </h4>
                      <p className="doc-department">
                        <img
                          className="img-dentist"
                          src={`https://healthcaresys.azurewebsites.net/api/Admin/ViewSpecPicture?id=${profileDoctor.spec.specID}`}
                          alt={
                            profileDoctor.doctor.specialization
                              .specializationName
                          }
                        />
                        {profileDoctor.doctor.specialization.specializationName}
                      </p>
                      <div className="doc-location">
                        <i className="fas fa-map-marker-alt"></i>{" "}
                        {profileDoctor.doctor.user.address}
                      </div>
                    </div>
                  </div>
                  <form
                    onSubmit={handleFormSubmit}
                    className="d-flex col-md-8 flex-column justify-content-center align-items-center"
                  >
                    <div className="d-flex flex-row align-items-center">
                      <label htmlFor="dateString" className="w-100">
                        Enter Appointment Date:
                      </label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        id="dateString"
                        value={dateString}
                        onChange={(event) => setDateString(event.target.value)}
                      />
                      <button
                        type="submit"
                        className="btn btn-process ms-5 submit-btn"
                      >
                        Submit
                      </button>
                    </div>
                    {error ? (
                      <p className="text-danger ps-5">
                        Invalid Date Please enter a valid date
                      </p>
                    ) : (
                      ""
                    )}
                  </form>
                </div>
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
