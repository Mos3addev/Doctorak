import React from "react";
import "./AdminDashboard.css";
// eslint-disable-next-line no-unused-vars
import Chart from "chart.js/auto";
import { Bar, Pie } from "react-chartjs-2";
import { context } from "../../Context/Context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

export default function AdminDashboard() {
  let { users, doctors, allAppointment, spec } = useContext(context);
  const barLabels = spec;
  const pieLabels = spec;
  const bar = {
    labels: barLabels.map((spec) => spec.specializationName),
    datasets: [
      {
        backgroundColor: "#0dd0ff",
        borderColor: "#1b5a90",
        data: barLabels.map((spec) => spec.numberOfDoctors),
      },
    ],
  };
  const pie = {
    labels: pieLabels.map((spec) => spec.specializationName),
    datasets: [
      {
        backgroundColor: "#699834",
        borderColor: "#1b5a90",
        data: pieLabels.map((spec) => spec.numberOfDoctors),
      },
    ],
  };
  var patient = users.filter((user) => user.type === 1);
  let { userData } = useContext(AuthContext);
  let navigate = useNavigate();
  if (userData.role === "Admin") {
    return (
      <>
        <div className="page-wrapper">
          <div className="content container-fluid">
            <div className="page-header">
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="page-title">Welcome Admin!</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item active">Dashboard</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-3 col-sm-6 col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="dash-widget-header">
                      <span className="dash-widget-icon text-primary border-primary">
                        <i className="fa-solid fa-user-doctor"></i>
                      </span>
                      <div className="dash-count">
                        <h3>{doctors.length}</h3>
                      </div>
                    </div>
                    <div className="dash-widget-info">
                      <h6 className="text-muted">Doctors</h6>
                      <div className="progress progress-sm">
                        <div className="progress-bar bg-primary w-50"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="dash-widget-header">
                      <span className="dash-widget-icon text-success">
                        <i className="fa-solid fa-user"></i>
                      </span>
                      <div className="dash-count">
                        <h3>{patient.length}</h3>
                      </div>
                    </div>
                    <div className="dash-widget-info">
                      <h6 className="text-muted">Patients</h6>
                      <div className="progress progress-sm">
                        <div className="progress-bar bg-success w-50"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="dash-widget-header">
                      <span className="dash-widget-icon text-warning border-warning">
                        <i className="fa-solid fa-stethoscope"></i>
                      </span>
                      <div className="dash-count">
                        <h3>{spec.length}</h3>
                      </div>
                    </div>
                    <div className="dash-widget-info">
                      <h6 className="text-muted">Specialty</h6>
                      <div className="progress progress-sm">
                        <div className="progress-bar bg-warning w-50"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="dash-widget-header">
                      <span className="dash-widget-icon text-danger border-danger">
                        <i className="fa-regular fa-calendar-check"></i>
                      </span>
                      <div className="dash-count">
                        <h3>{allAppointment.length}</h3>
                      </div>
                    </div>
                    <div className="dash-widget-info">
                      <h6 className="text-muted">Appointment</h6>
                      <div className="progress progress-sm">
                        <div className="progress-bar bg-danger w-50"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 col-lg-6">
                <div className="card card-chart">
                  <div className="card-header">
                    <h4 className="card-title">Status</h4>
                  </div>
                  <div className="card-body">
                    <Bar data={bar} />
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-lg-6">
                <div className="card card-chart">
                  <div className="card-header">
                    <h4 className="card-title">Specialty</h4>
                  </div>
                  <div className="card-body">
                    <Pie data={pie} />
                  </div>
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
