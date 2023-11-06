/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import './Search.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { context } from '../../Context/Context';
import axios from 'axios';

export default function Search({ userData }) {
  let {doctors,spec,handleSearch,setSelectedGender,selectedGender,selectedSpecs , filteredDoctors,setSelectedSpecs } = useContext(context)
  var active = '#';
  const AddFavorite = async (id) => {
    try {
      await axios.post(`${process.env.REACT_APP_URL_SITE}api/Users/AddFavorite?userId=${userData.nameid}&doctorId=${id}`)
    } catch (error) {
      console.error(error);

    }
	};
  return <>
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="card search-filter align-items-center col-md-12 col-lg-4 col-xl-3 theiaStickySidebar">
          <div>
            <div className="card-header">
              <h4 className="card-title mb-0">Search Filter</h4>
            </div>
            <form className="card-body">
              <div className="filter-widget">
                <h4>Gender</h4>
                <div>
                  <label className="custom_check">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={selectedGender === 'male'}
                      onChange={(e) => setSelectedGender(e.target.value)}
                    />
                    <span className="checkmark"></span> Male Doctor
                  </label>
                </div>
                <div>
                  <label className="custom_check">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={selectedGender === 'female'}
                      onChange={(e) => setSelectedGender(e.target.value)}
                    />
                    <span className="checkmark"></span> Female Doctor
                  </label>
                </div>
              </div>
              <div className="filter-widget">
                <h4>Select Specialist</h4>
                {spec.map((spec) => (
                  <div key={spec.specID}>
                    <label className="custom_check">
                    <input
  type="checkbox"
  value={spec.specID}
  checked={selectedSpecs?.includes(spec.specID)}
  onChange={(e) =>
    setSelectedSpecs((prev) =>
      e.target.checked
        ? [...prev, spec.specID]
        : prev.filter((id) => id !== spec.specID)
    )
  }
/>
                      <span className="checkmark"></span>{' '}
                      {spec.specializationName}
                    </label>
                  </div>
                ))}
              </div>
              <div className="btn-search">
                <button
                  type="button"
                  className="btn btn-block w-100"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
        {filteredDoctors.length === 0 ?
        <div className="col-md-12 col-lg-8 col-xl-9">
        {doctors.map((doctor) => (
          <div key={doctor.doctorID} className="row d-flex p-4 bg-white mx-5 card" >
            <div className="d-md-flex ">
              <div className="col-md-6 col-sm-12 me-auto">
                <div className="row">
                  <Link
                    to={'/profileDoctor/' + doctor.doctorID}
                    className="col-md-4 mb-2 profile-search-img"
                  >
                    <img
                      className="w-100 rounded-2"
                      src={`${process.env.REACT_APP_URL_SITE}api/Users/GetProfilePic?id=${doctor.user.id}`}
                    />
                  </Link>
                  <div className="col-8">
                    <Link
                      to={'/profileDoctor/' + doctor.doctorID}
                      className="h4"
                    >
                      Dr. {doctor.user.firstName} {doctor.user.lastName}
                    </Link>
                    <p className="doc-department">
                      <img
                        className="img-dentist"
                        src={`${process.env.REACT_APP_URL_SITE}api/Admin/ViewSpecPicture?id=${doctor.specializationSpecID}`}
                        alt={doctor.specialization.specializationName}
                      />
                      {doctor.specialization.specializationName}
                    </p>
                    
                    <div className="doc-location">
                      <i className="fas fa-map-marker-alt"></i>{' '}
                      {doctor.user.address}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="doc-info-right ms-md-auto">
                  <div className="clini-infos">
                    <ul>
                      <li>
                        <i className="far fa-comment"></i> 35 Feedback
                      </li>
                      <li>
                        <i className="far fa-money-bill-alt"></i> ${doctor.price} per
                        hour{' '}
                      </li>
                    </ul>
                  </div>
                  {userData?<div className="doctor-action d-flex justify-content-between">
                    <a href="#" onClick={() => AddFavorite(doctor.doctorID)} className={`col-5 btn btn-white fav-btn ${active}`}>
                      <i className="far fa-bookmark"></i>
                    </a>
                    <Link to={`/chatPatient/doctor/${doctor.user.id}`} href="#" className="col-5 btn btn-white msg-btn">
                      <i className="far fa-comment-alt"></i>
                    </Link>
                  </div>:''}
                  <div className="row row-sm">
                    <div className="col-6">
                      <Link
                        to={'/profileDoctor/' + doctor.doctorID}
                        className="btn view-btn"
                      >
                        View Profile
                      </Link>
                    </div>
                    <div className="col-6">
                      <Link
                        to={'/booking/' + doctor.doctorID}
                        className="btn book-btn"
                        href="/booking"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
        :
        <div className="col-md-12 col-lg-8 col-xl-9">
        {filteredDoctors.map((doctor) => (
          <div key={doctor.doctorID} className="row d-flex p-4 bg-white mx-5 card" >
            <div className="d-md-flex ">
              <div className="col-md-6 col-sm-12 me-auto">
                <div className="row">
                  <Link
                    to={'/profileDoctor/' + doctor.doctorID}
                    className="col-md-4 mb-2"
                  >
                    <img
                      className="w-100 rounded-2"
                      src={`${process.env.REACT_APP_URL_SITE}api/Users/GetProfilePic?id=${doctor.user.id}`}
                    />
                  </Link>
                  <div className="col-8">
                    <Link
                      to={'/profileDoctor/' + doctor.doctorID}
                      className="h4"
                    >
                      Dr. {doctor.user.firstName} {doctor.user.lastName}
                    </Link>
                    <p className="doc-department">
                      <img
                        className="img-dentist"
                        src={`${process.env.REACT_APP_URL_SITE}api/Admin/ViewSpecPicture?id=${doctor.specializationSpecID}`}
                        alt={doctor.specialization.specializationName}
                      />
                      {doctor.specialization.specializationName}
                    </p>
                    <div className="doc-location">
                      <i className="fas fa-map-marker-alt"></i>{' '}
                      {doctor.user.address}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="doc-info-right ms-md-auto">
                  <div className="clini-infos">
                    <ul>
                      <li>
                        <i className="far fa-comment"></i> 35 Feedback
                      </li>
                      <li>
                        <i className="far fa-money-bill-alt"></i> ${doctor.price} per
                        hour{' '}
                      </li>
                    </ul>
                  </div>
                  {userData?<div className="doctor-action d-flex justify-content-between">
                    <a href="#" onClick={() => AddFavorite(doctor.doctorID)} className={`col-5 btn btn-white fav-btn ${active}`}>
                      <i className="far fa-bookmark"></i>
                    </a>
                    <Link to={`/chatPatient/doctor/${doctor.user.id}`} href="#" className="col-5 btn btn-white msg-btn">
                      <i className="far fa-comment-alt"></i>
                    </Link>
                  </div>:''}
                  <div className="row row-sm">
                    <div className="col-6">
                      <Link
                        to={'/profileDoctor/' + doctor.doctorID}
                        className="btn view-btn"
                      >
                        View Profile
                      </Link>
                    </div>
                    <div className="col-6">
                      <Link
                        to={'/booking/' + doctor.doctorID}
                        className="btn book-btn"
                        href="/booking"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
        }
        
      </div>
    </div>
  </>
}