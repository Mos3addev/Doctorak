/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { context } from '../../Context/Context';
import { AuthContext } from '../../Context/AuthContext';

export default function Doctor({logOut}) {
  const {handleFilterDocPosts} = useContext(context)
  const location = useLocation();
	const finalLocation =(location.pathname.split('/')[3])
  var appointments = '#';
  var schedule = '#';
  var questions = '#';
  var profileSetting = '#';
  var changePassword = '#';
  if(finalLocation === 'appointments'){
    appointments = 'active';
  }
  if(finalLocation === 'questions'){
    questions = 'active';
  }
  if(finalLocation === 'schedule-timing'){
    schedule = 'active';
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
  let {userData }= useContext(AuthContext)
	let navigate = useNavigate()
  if(userData.role==='Doctor'){
  return (<>

    <div className="container-fluid mt-5" >
      <div className="row">
      
        <div className="col-md-5 col-lg-4 col-xl-3" >	
          <div className="theiaStickySidebar"><div className="profile-sidebar">
              <div className="widget-profile pro-widget-content">
                <div className="profile-info-widget">
                  <a href="#" className="booking-doc-img">
                    <img src={`https://healthcaresys.azurewebsites.net/api/Users/GetProfilePic?id=${userData.nameid}`} alt="User Image"/>
                  </a>
                  <div className="profile-det-info">
                    <h3>Dr. {userData.FirstName} {userData.LastName}</h3>
                    <div className="patient-details">
                      <h5>BDS, MDS - Oral & Maxillofacial Surgery</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dashboard-widget">
                <nav className="dashboard-menu">
                  <ul>
                    <li className={appointments}>
                      <Link to='/doctor/profile/appointments'>
                        <i className="fas fa-calendar-check"></i>
                        <span>Appointments</span>
                      </Link>
                    </li>
                    <li className={schedule}>
                      <Link to='/doctor/profile/schedule-timing'>
                        <i className="fas fa-hourglass-start"></i>
                        <span>Schedule Timings</span>
                      </Link>
                    </li>
                    <li className={questions} onClick={handleFilterDocPosts}>
                      <Link to='/doctor/profile/questions'>
                        <i className="fas fa-star"></i>
                        <span>Questions</span>
                      </Link>
                    </li>
                    <li>
                      <Link to='/chatDoctor'>
                        <i className="fas fa-comments"></i>
                        <span>Message</span>
                      </Link>
                    </li>
                    <li className={profileSetting}>
                      <Link to='/doctor/profile'>
                        <i className="fas fa-user-cog"></i>
                        <span>Profile Settings</span>
                      </Link>
                    </li>
                    <li className={changePassword}>
                      <Link to='/doctor/profile/change-password' >
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
