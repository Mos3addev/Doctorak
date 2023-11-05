import React  from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import './RouterLayout.css'
import { useLocation, Link } from 'react-router-dom';


export default function RouterLayout({userData , logOut}) {
	const location = useLocation();
	const finalLocation =(location.pathname.split('/')[1])
	const NavTitle = finalLocation.charAt(0).toUpperCase() + finalLocation.slice(1)
	var hideLocation = ['', 'chat' ,'login','register','admin','chatPatient','chatDoctor']
return<>
    <Navbar userData={userData} logOut={logOut}/>
        {(!hideLocation.includes(finalLocation))?
		<div className="breadcrumb-bar ">
			<div className="container mt-60px">
				<div className="row align-items-center">
					<div className="col-md-12 col-12">
						<nav aria-label="breadcrumb" className="page-breadcrumb">
							<ol className="breadcrumb">
								<li className="breadcrumb-item"><Link to='/'>Home</Link></li>
								<li className="breadcrumb-item active" aria-current="page">{NavTitle}</li>
							</ol>
						</nav>
						<h2 className="breadcrumb-title">{NavTitle}</h2>
					</div>
				</div>
			</div>
		</div>:''}
        	<Outlet></Outlet>
</>
}