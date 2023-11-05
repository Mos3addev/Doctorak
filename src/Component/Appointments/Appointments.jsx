/* eslint-disable jsx-a11y/img-redundant-alt */
import React  from 'react'
import './Appointments.css'
import { context } from '../../Context/Context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

export default function Appointments() {
    let {appointments , handleAcceptAppointment} = useContext(context)
	let {userData }= useContext(AuthContext)
	let navigate = useNavigate()
  if(userData.role==='Doctor'){
  return<>
    <div className="col-md-7 col-lg-8 col-xl-9">
        <div className='appointments'>
            {appointments.map(app=>(
                <div key={app.appointmentID} className="appointment-list">
                    <div className="profile-info-widget">
                        <div className="booking-doc-img">
                            <img src={`https://healthcaresys.azurewebsites.net/api/Users/GetProfilePic?id=${app.doctor.user.id}`} alt="User Image"/>
                        </div>
                        <div className="profile-det-info ps-2">
                            <h3>{app.user.firstName} {app.user.lastName}</h3>
                            <div className="patient-details">
                                <h5><i className="far fa-clock"></i>{app.appointmentDate}</h5>
                                <h5><i className="fas fa-map-marker-alt"></i>{app.doctor.user.address}</h5>
                                <h5><i className="fas fa-envelope"></i>{app.user.emailAddress}</h5>
                                <h5 className="mb-0"><i className="fas fa-phone"></i>{app.user.phoneNumber}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="appointment-action">
                        <button className='btn btn-sm bg-secondary-color ms-2' onClick={() => handleAcceptAppointment(app.appointmentID)}>Accept</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  </>}
  else{
    return navigate('/')
  }
}
