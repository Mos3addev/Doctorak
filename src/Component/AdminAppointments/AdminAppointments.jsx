import React, { useContext } from 'react'
import DataTable from 'react-data-table-component';
import { context } from './../../Context/Context';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../Context/AuthContext';

export default function AdminAppointments() {
  let {allAppointment }= useContext(context)
  let {userData }= useContext(AuthContext)
  let navigate = useNavigate()
  

  
  const columns = [
    { name: 'ID', selector: row=>row.appointmentID, sortable: true },
    { name: 'Date', selector: row=>row.appointmentDate, sortable: true },
    { name: 'Doctor', selector: row=>row.doctor.user.firstName, sortable: true },
    { name: 'Doctor-Email', selector: row=>row.doctor.user.emailAddress, sortable: true },
    { name: 'Patient', selector: row=>row.user.firstName, sortable: true },
    { name: 'Patient-Email', selector: row=>row.user.emailAddress, sortable: true },
  ];
  
  const options = {
    paging: true,
    pageLength: 10,
    searching: true,
    // ...
  };
  if(userData.role ==='Admin'){
  return (
    <div className='page-wrapper'>
    	<div className="content container-fluid">
		
		<div className="page-header">
            <div className="row">
                <div className="col-sm-12">
                    <h3 className="page-title">Appointments</h3>
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item"><Link to='/admin'>Dashboard</Link></li>
                        <li className="breadcrumb-item active">Appointments</li>
                    </ul>
                </div>
            </div>
        </div>
        <div>
            <DataTable
          columns={columns}
          data={allAppointment}
          options={options}
        />
        </div>


		</div>
    </div>
  )}
  else{
    return navigate('/')
  }
}
