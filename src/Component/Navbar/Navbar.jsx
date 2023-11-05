import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'
export default function Navbar({userData,logOut}) {
  const location = useLocation();
	const finalLocation =(location.pathname.split('/')[1])
	var showNav = ['']
  return (
    <>
    <nav className="navbar header navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link to='/' className="navbar-brand main-color fw-bolder fs-2" >Doctorak</Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
        {((showNav.includes(finalLocation))&&(userData))?
        <ul className="navbar-nav ms-md-auto mb-2 mb-lg-0" id="navbarNav">
          <li className="nav-item">
              <Link className="nav-link secondary-color" to='/MachineLearning' >ML</Link>     
          </li>
          <li className="nav-item">
              <a className="nav-link secondary-color" href='/#Specialities'>Specialities</a>
          </li>
          <li className="nav-item">
              <a className="nav-link secondary-color" href='/#Booking'>Booking</a>     
          </li>
          <li className="nav-item">
              <a className="nav-link secondary-color" href='/#Features'>Features</a>     
          </li>
          <li className="nav-item">
              <a className="nav-link secondary-color" href='/#Asking'>Asking</a>
          </li>
        </ul>:''
      }
          <ul className="navbar-nav ms-md-auto mb-2 mb-lg-0" id="navbarNav">
            {userData?
            <>
              {userData.role === 'Doctor'?
              <>
                <li className="nav-item">
                    <Link className="nav-link secondary-color" to="doctor/profile">{userData.FirstName}</Link>     
                </li>
                <li className="nav-item">
                  <Link onClick={logOut} className="nav-link main-color">Logout</Link>
                </li>
              </>
              :userData.role === 'Patient'?
              <>
                <li className="nav-item">
                    <Link className="nav-link secondary-color" to="profile">{userData.FirstName}</Link>     
                </li>
                <li className="nav-item">
                  <Link onClick={logOut} className="nav-link main-color">Logout</Link>
                </li>
              </>
              :
              <>
                <li className="nav-item">
                    <Link className="nav-link secondary-color" to="/admin">{userData.FirstName}</Link>     
                </li>
                <li className="nav-item">
                  <Link onClick={logOut} className="nav-link main-color">Logout</Link>
                </li>
              </>
              }
            </>
            :<>
              <li className="nav-item">
                <Link className="nav-link main-color" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link main-color" to="/register/patient">Register</Link>
              </li>
              </>
              }
            </ul>
        </div>
      </div>
    </nav>
    </>
  )
}
