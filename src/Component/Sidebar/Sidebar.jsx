import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "./Sidebar.css";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

export default function Sidebar({ logOut }) {
  const location = useLocation();
  const finalLocation = location.pathname.split("/")[2];
  var Appointment,
    specialties,
    Doctors,
    Patients,
    Posts = "#";
  var Dashboard = "active";
  if (finalLocation === "appointments") {
    Appointment = "active";
    Dashboard = "#";
  }
  if (finalLocation === "specialties") {
    specialties = "active";
    Dashboard = "#";
  }
  if (finalLocation === "doctors") {
    Doctors = "active";
    Dashboard = "#";
  }
  if (finalLocation === "patients") {
    Patients = "active";
    Dashboard = "#";
  }
  if (finalLocation === "posts") {
    Posts = "active";
    Dashboard = "#";
  }

  let { userData } = useContext(AuthContext);
  let navigate = useNavigate();
  if (userData.role === "Admin") {
    return (
      <>
        <div className="sidebar">
          <div className="slimScrollDiv">
            <div className="sidebar-inner slimscroll">
              <div id="sidebar-menu" className="sidebar-menu">
                <ul>
                  <li className="menu-title">
                    <span>Main</span>
                  </li>
                  <li className={Dashboard}>
                    <Link to="/">
                      <i className="fa-solid fa-chart-line"></i>{" "}
                      <span>Dashboard</span>
                    </Link>
                  </li>
                  <li className={Appointment}>
                    <Link to="/admin/appointments">
                      <i className="fa-regular fa-calendar-check"></i>{" "}
                      <span>Appointments</span>
                    </Link>
                  </li>
                  <li className={specialties}>
                    <Link to="/admin/specialties">
                      <i className="fa-solid fa-stethoscope"></i>
                      <span>specialties</span>
                    </Link>
                  </li>
                  <li className={Doctors}>
                    <Link to="/admin/doctors">
                      <i className="fa-solid fa-user-doctor"></i>{" "}
                      <span>Doctors</span>
                    </Link>
                  </li>
                  <li className={Patients}>
                    <Link to="/admin/patients">
                      <i className="fa-solid fa-user"></i> <span>Patients</span>
                    </Link>
                  </li>
                  <li className={Posts}>
                    <Link to="/admin/posts">
                      <i className="fa-regular fa-comment"></i>{" "}
                      <span>Posts</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/posts" onClick={logOut}>
                      <i className="fa-solid fa-arrow-right-from-bracket"></i>{" "}
                      <span>Logout</span>
                    </Link>
                  </li>
                </ul>
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
