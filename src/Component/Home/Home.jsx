/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Home.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { context } from "../../Context/Context";

export default function Home({ userData }) {
  let { spec, doctors } = useContext(context);
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const handleAddFavorite = async (doctorId) => {
    try {
      if (!isFavorite) {
        await axios.post(
          `${process.env.REACT_APP_URL_SITE}api/Users/AddFavorite?userId=${userData.nameid}&doctorId=${doctorId}`
        );
        setIsFavorite(true);
      } else {
        await axios.delete(
          `${process.env.REACT_APP_URL_SITE}api/Users/DeleteFavorite?DoctorID=${doctorId}`
        );
        setIsFavorite(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userData != null) {
      if (userData.role === "Doctor") {
        const fetchData = async () => {
          try {
            const response = await axios.get(
              `${process.env.REACT_APP_URL_SITE}api/Admin/AllDoctors`
            );
            const doctor = response.data;
            const doc = doctor.filter((doc) => doc.userID === userData.nameid);
            if (doc.length === 0) {
              navigate("/doctor/specialization-doctor");
            } else {
              navigate("/doctor/profile");
            }
          } catch (error) {}
        };
        fetchData();
      } else if (userData.role === "Admin") {
        navigate("/admin");
      }
    } else {
      navigate("/");
    }
  }, [navigate, userData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1.5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>

      <section className="section section-search">
        <div className="container-fluid">
          <div className="banner-wrapper">
            <div className="banner-header text-center">
              <h2>Search Doctor, Make an Appointment, Ask Question</h2>
              <p>
                Discover the best doctors, clinic &amp; hospital the city
                nearest to you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white pt-5" id="Specialities">
        <div className="container-fluid">
          <div className="section-header text-center">
            <h2>Clinic and Specialities</h2>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-9">
              <div className="specialities-slider slider slick-initialized slick-slider1 slick-dotted">
                <div className="Slider">
                  <div>
                    <Slider {...settings}>
                      {spec.map((spec) => (
                        <div key={spec.specID} className="d-inline-block">
                          <div className="speicality-item d-flex row justify-content-center">
                            <div className="speicality-img">
                              <img
                                src={`${process.env.REACT_APP_URL_SITE}api/Admin/ViewSpecPicture?id=${spec.specID}`}
                                className="img-fluid"
                                alt={spec.specializationName}
                              />
                              <span>
                                <i
                                  className="fa fa-circle"
                                  aria-hidden="true"
                                ></i>
                              </span>
                            </div>
                            <p className="text-center">
                              {spec.specializationName}
                            </p>
                          </div>
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-doctor" id="Booking">
        <div className="container-fluid">
          <div className="section-header text-center">
            <Link to="/searching">
              <h2>Book Our Doctor</h2>
            </Link>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="Slider">
                <div>
                  <Slider {...settings}>
                    {doctors.map((doctor) => (
                      <div
                        key={doctor.doctorID}
                        className="col-md-6 col-lg-4 col-xl-3"
                      >
                        <div className="profile-widget">
                          <div className="doc-img">
                            <Link to={/profileDoctor/ + doctor.doctorID}>
                              <img
                                className="img-fluid"
                                alt="User Image"
                                src={`${process.env.REACT_APP_URL_SITE}api/Users/GetProfilePic?id=${doctor.user.id}`}
                              />
                            </Link>
                            {userData ? (
                              <button
                                value={doctor.doctorID}
                                className="fav-btn"
                                onClick={() =>
                                  handleAddFavorite(doctor.doctorID)
                                }
                              >
                                {isFavorite ? "-" : "+"}
                              </button>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="pro-content">
                            <h3 className="title">
                              <Link to={/profileDoctor/ + doctor.doctorID}>
                                Dr. {doctor.user.firstName}{" "}
                                {doctor.user.lastName}
                              </Link>
                              <i className="fas fa-check-circle verified"></i>
                            </h3>
                            <ul className="available-info">
                              <li>
                                <p className="doc-department">
                                  <img
                                    className="img-dentist"
                                    src={`${process.env.REACT_APP_URL_SITE}api/Admin/ViewSpecPicture?id=${doctor.specializationSpecID}`}
                                    alt={
                                      doctor.specialization.specializationName
                                    }
                                  />
                                  {doctor.specialization.specializationName}
                                </p>
                              </li>
                              <li>
                                <i className="fas fa-map-marker-alt"></i>{" "}
                                {doctor.user.address}
                              </li>
                              <li>
                                <i className="far fa-money-bill-alt"></i> $
                                {doctor.price}
                              </li>
                            </ul>
                            <div className="row row-sm">
                              <div className="col-6">
                                <Link
                                  to={/profileDoctor/ + doctor.doctorID}
                                  className="btn view-btn"
                                >
                                  View Profile
                                </Link>
                              </div>
                              <div className="col-6">
                                <Link
                                  to={/booking/ + doctor.doctorID}
                                  className="btn book-btn"
                                >
                                  Book Now
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white pt-5" id="Features">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-5 features-img">
              <img
                src={require("../../Images/feature.png")}
                className="img-fluid"
                alt="Feature"
              />
            </div>
            <div className="col-md-7">
              <div className="container-fluid">
                <div className="section-header text-center">
                  <h2>Availabe Features in Our Clinic</h2>
                </div>
                <div className="row justify-content-center">
                  <div className="col-md-12">
                    <div className="specialities-slider slider slick-initialized slick-slider slick-dotted">
                      <div className="Slider">
                        <Slider {...settings}>
                          <div className="speicality-item d-flex row justify-content-center">
                            <div className="speicality-img">
                              <img
                                src={require("../../Images/ICU.jpg")}
                                className="img-fluid border-0"
                                alt="Speciality"
                              />
                            </div>
                            <p className="text-center">ICU</p>
                          </div>

                          <div className="speicality-item d-flex row justify-content-center">
                            <div className="speicality-img">
                              <img
                                src={require("../../Images/Laboratory.jpg")}
                                className="img-fluid border-0"
                                alt="Speciality"
                              />
                            </div>
                            <p className="text-center">Laboratory</p>
                          </div>

                          <div className="speicality-item d-flex row justify-content-center">
                            <div className="speicality-img">
                              <img
                                src={require("../../Images/Operation.jpg")}
                                className="img-fluid border-0"
                                alt="Speciality"
                              />
                            </div>
                            <p className="text-center">Operation</p>
                          </div>

                          <div className="speicality-item d-flex row justify-content-center">
                            <div className="speicality-img">
                              <img
                                src={require("../../Images/Medical.jpg")}
                                className="img-fluid border-0"
                                alt="Speciality"
                              />
                            </div>
                            <p className="text-center">Medical</p>
                          </div>

                          <div className="speicality-item d-flex row justify-content-center">
                            <div className="speicality-img">
                              <img
                                src={require("../../Images/Patient-Ward.jpg")}
                                className="img-fluid border-0"
                                alt="Speciality"
                              />
                            </div>
                            <p className="text-center">Patient Ward</p>
                          </div>

                          <div className="speicality-item d-flex row justify-content-center">
                            <div className="speicality-img">
                              <img
                                src={require("../../Images/Test-Room.jpg")}
                                className="img-fluid border-0"
                                alt="Speciality"
                              />
                            </div>
                            <p className="text-center">Test Room</p>
                          </div>
                        </Slider>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-doctor" id="Asking">
        <div className="container-fluid">
          <div className="section-header text-center">
            <h2>Ask Doctor</h2>
          </div>
          <div className="row bg-white rounded-3 py-5 mx-5">
            <div className="col-md-2 justify-content-center align-items-center d-flex">
              <div className="ask-img">
                <img src={require("../../Images/AskDoctor.jpg")} alt="" />
              </div>
            </div>
            <div className="col-md-7 pt-3 justify-content-center align-items-center d-flex">
              <div>
                <h3>Have a Medical Question?</h3>
                <p className="text-muted">
                  Submit your medical question and receive an answer from a
                  specialized doctor
                </p>
              </div>
            </div>
            <div className="col-md-3 justify-content-center align-items-center d-flex">
              <div className="d-flex justify-content-between">
                <div className="col-6 px-3 py-2">
                  <Link
                    to="/medicalQuestions"
                    className="btn view-btn px-4 py-3"
                    tabIndex="-1"
                  >
                    Questions
                  </Link>
                </div>
                <div className="col-6 px-3 py-2">
                  <Link
                    to="/askDoctor"
                    className="btn book-btn px-4 py-3"
                    tabIndex="-1"
                  >
                    Ask now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
