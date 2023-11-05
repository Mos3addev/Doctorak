/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react'
import { useEffect } from 'react';
import './Favourites.css'
import { Link, useNavigate } from 'react-router-dom';
import { context } from '../../Context/Context';
import { AuthContext } from '../../Context/AuthContext';


export default function Favourites() {
	let {fav  , handleRemoveFavorite } = useContext(context)
	let {userData }= useContext(AuthContext)

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])
	let navigate = useNavigate()
if(userData.role==='Patient'){
  return (<>
	<div className="col-md-7 col-lg-8 col-xl-9">
		<div className="row row-grid">
		{fav.map(fav=>(
			<div key={fav.id} className="col-md-6 col-lg-4 col-xl-3">
				<div className="profile-widget">
					<div className="doc-img">
					<Link to={/profileDoctor/+fav.doctorID}>
						<img className="img-fluid" alt="User Image" src={`${process.env.REACT_APP_URL_SITE}api/Users/GetProfilePic?id=${fav.doctor.user.id}`}/>
					</Link>
					<button value={fav.doctorID} className="fav-btn" onClick={() => handleRemoveFavorite(fav.doctorID)}>-</button>
					</div>
					<div className="pro-content">
					<h3 className="title">
						<Link to={/profileDoctor/+fav.doctorID}>Dr. {fav.doctor.user.firstName} {fav.doctor.user.lastName}</Link> 
						<i className="fas fa-check-circle verified"></i>
					</h3>
					<div className="rating">
						<i className="fas fa-star filled"></i>
						<i className="fas fa-star filled"></i>
						<i className="fas fa-star filled"></i>
						<i className="fas fa-star filled"></i>
						<i className="fas fa-star"></i>
						<span className="d-inline-block average-rating">(5)</span>
					</div>
					<ul className="available-info">
						<li>
						<i className="fas fa-map-marker-alt"></i> {fav.doctor.user.address}
						</li>
						<li>
						<i className="far fa-clock"></i> Available on Fri, 22 Mar
						</li>
						<li>
						<i className="far fa-money-bill-alt"></i> $150 - $350 
						<i className="fas fa-info-circle" data-toggle="tooltip" title="" data-original-title="Lorem Ipsum"></i>
						</li>
					</ul>
					<div className="row row-sm">
						<div className="col-6">
						<Link to={/profileDoctor/+fav.doctorID} className="btn view-btn">View Profile</Link>
						</div>
						<div className="col-6">
						<Link to={/booking/+fav.doctorID} className="btn book-btn">Book Now</Link>
						</div>
					</div>
					</div>
				</div>
			</div>
      ))}
	  
		</div>
	</div>
  </>
  )}
  else{
    return navigate('/')
  }
}
