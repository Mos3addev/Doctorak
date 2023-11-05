/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react'
import { useEffect } from 'react';
import './Patient.css'
import { Outlet, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

export default function Patient({logOut}) {
  let {userData }= useContext(AuthContext)
  const location = useLocation();
	const finalLocation =(location.pathname.split('/')[2])
  var favourites = '#';
  var appointment = '#';
  var myQuestions = '#';
  var profileSetting = '#';
  var changePassword = '#';
  if(finalLocation === 'favourites'){
    favourites = 'active';
  }
  if(finalLocation === 'appointments'){
    appointment = 'active';
  }
  if(finalLocation === 'myQuestions'){
    myQuestions = 'active';
  }
  if(finalLocation === undefined){
    profileSetting = 'active';
  }
  if(finalLocation === 'change-password'){
    changePassword = 'active';
  }
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  let navigate = useNavigate()
  if(userData.role==='Patient'){
  return (<>
    <div className="container-fluid mt-5" >
      <div className="row">
      
        <div className="col-md-5 col-lg-4 col-xl-3" >	
          <div className="theiaStickySidebar"><div className="profile-sidebar">
              <div className="widget-profile pro-widget-content">
                <div className="profile-info-widget">
                  <a href="" className="booking-doc-img">
                    <img src={`${process.env.REACT_APP_URL_SITE}api/Users/GetProfilePic?id=${userData.nameid}`} alt="User Image"/>
                  </a>
                  <div className="profile-det-info">
                    <h3>{userData.FirstName} {userData.LastName}</h3>
                    <div className="patient-details">
                      <h5><i className="fas fa-birthday-cake"></i>{userData.Age}</h5>
                      <h5 className="mb-0"><i className="fas fa-map-marker-alt"></i>{userData.Address}</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dashboard-widget">
                <nav className="dashboard-menu">
                  <ul>
                    <li className={appointment}>
                      <Link to='/profile/appointments'>
                        <i className="fas fa-calendar-check"></i>
                        <span>Appointment</span>
                      </Link>
                    </li>
                    <li className={myQuestions}>
                      <Link to='/profile/myQuestions'>
                        <i className="fas fa-calendar-check"></i>
                        <span>My Questions</span>
                      </Link>
                    </li>
                    <li className={favourites}>
                      <Link to='/profile/favourites'>
                        <i className="fas fa-bookmark"></i>
                        <span>Favourites</span>
                      </Link>
                    </li>
                    <li>
                      <Link to='/chatPatient'>
                        <i className="fas fa-comments"></i>
                        <span>Message</span>
                      </Link>
                    </li>
                    <li className={profileSetting}>
                      <Link to='/profile'>
                        <i className="fas fa-user-cog"></i>
                        <span>Profile Settings</span>
                      </Link>
                    </li>
                    <li className={changePassword}>
                      <Link to='/profile/change-password' >
                        <i className="fas fa-lock"></i>
                        <span>Change Password</span>
                      </Link>
                    </li>
                    <li>
                      <Link onClick={logOut}>
                        <i className="fas fa-sign-out-alt"></i>
                        <span>Logout</span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <Outlet></Outlet>
      </div>
		</div>
  </>
  )}
  else{
    return navigate('/')
  }
}
