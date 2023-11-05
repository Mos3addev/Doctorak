/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import './ProfileDoctor.css'
import { Link, useParams } from 'react-router-dom';
import React, { useEffect,useState } from 'react';
import axios from "axios";

export default function ProfileDoctor({userData}) {
	const [profileDoctor, setProfileDoctor] = useState(null)
	const [scheduleTiming,setScheduleTiming] = useState([])
	const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const doctor =  useParams();
	var active = '#';
	const AddFavorite = () => {
		axios.post(`${process.env.REACT_APP_URL_SITE}api/Users/AddFavorite?userId=${userData.nameid}&doctorId=${doctor.id}`)
		  .then(response => {
			// Handle the API response here
		  })
		  .catch(error => {
			console.error(error);
			// Handle errors here
		});
	};
	const fetchScheduleData = async () => {
		try {
		  let {data} = await axios.get(`${process.env.REACT_APP_URL_SITE}api/Doctor/ShowSchedule?doctorID=${doctor.id}`);
		  setScheduleTiming(data);
		} catch (error) {
		}
	  };
	
    const fetchShowDoctor = async () => {
		try {
			let {data} = await axios.get(`${process.env.REACT_APP_URL_SITE}api/Users/ShowDoctor?doctorId=${doctor.id}`);
			setProfileDoctor(data);
		} catch (error) {
		}
	  };
	useEffect(() => {
		window.scrollTo(0, 0)
		fetchScheduleData()
		fetchShowDoctor()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])
	  if(profileDoctor == null){
		return <div className='container'>
			<div className='d-flex justify-content-center align-items-center'>
			<h1 className='main-color'>Loading ..<i className='fas fa-spinner fa-spin'></i></h1>
		</div>
		</div>
	  }
  return <>
   	<div className='container pb-5'>
      <div className='row d-flex p-4 bg-white my-5 mx-5 card'>
		
		  <div className='d-md-flex '>
            <div className='col-md-6 col-sm-12 me-auto'>
              <div className='row'>
                <div className='col-md-4 mb-2'>
                  <img className='w-100 rounded-2' src={`${process.env.REACT_APP_URL_SITE}api/Users/GetProfilePic?id=${profileDoctor.doctor.user.id}`} /></div>
                <div className='col-8'>
                  <h4 className='doctor-name'>Dr.{profileDoctor.doctor.user.firstName} {profileDoctor.doctor.user.lastName}</h4>
                  <p className='doc-department'>
					<img className='img-dentist' src={`${process.env.REACT_APP_URL_SITE}api/Admin/ViewSpecPicture?id=${profileDoctor.spec.specID}`} alt={profileDoctor.doctor.specialization.specializationName} />{profileDoctor.doctor.specialization.specializationName}
					</p>
                  <div className='doc-location'>
                    <i className='fas fa-map-marker-alt'></i> {profileDoctor.doctor.user.address}
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-6 col-sm-12'>
            	<div className=" doc-info-right ms-md-auto">
					<div className="clini-infos">
						<ul>
							<li><i className="fas fa-map-marker-alt"></i> {profileDoctor.doctor.user.address}</li>
							<li><i className="far fa-money-bill-alt"></i> ${profileDoctor.doctor.price} per hour </li>
						</ul>
					</div>
					{userData?<div className="doctor-action d-flex justify-content-between">
						<a href="#" onClick={AddFavorite} className={`col-5 btn btn-white fav-btn ${active}`}>
							<i className="far fa-bookmark"></i>
						</a>
						<Link to={`/chatPatient/doctor/${profileDoctor.doctor.user.id}`} href="#" className="col-5 btn btn-white msg-btn">
							<i className="far fa-comment-alt"></i>
						</Link>
					</div>:''}
					<div className="clinic-booking">
						<Link to={/booking/+doctor.id} className="apt-btn">Book Appointment</Link>
					</div>
				</div>
            </div>
          </div>
      </div>
      <div className='row d-flex p-4 bg-white mx-5 card'>
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <button className="nav-link businessHours active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Business Hours</button>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
			<div className="row">
				<div className="col-md-6 offset-md-3 pt-5">
				
				    <div className="widget business-widget">
						<h3 className='text-center'>Schedule Timings</h3>
                        <div className="widget-content">
                          <div className="listing-hours">
                            {scheduleTiming.map(schedule=>(
                              <div key={schedule.id} className="listing-day mt-3 align-items-center">
                                <div className="day">{dayNames[schedule.day]}</div>
                                <div className="time-items d-flex align-items-center">
                                  <span className="time">{schedule.timeFrom} - {schedule.timeTo}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                    </div>
			
				</div>
			</div>
        </div>
      </div>
      </div>
	</div>
  </>}
