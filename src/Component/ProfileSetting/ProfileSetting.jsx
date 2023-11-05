/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { useEffect } from 'react';
import './ProfileSetting.css'
import axios from 'axios';


export default function ProfileSetting({userData}) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [selectedFile, setSelectedFile] = useState('');
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    const url = `${process.env.REACT_APP_URL_SITE}api/Users/ChangeProfilePic`;
    const formData = new FormData();
    formData.append("id", userData.nameid);
    formData.append("file", selectedFile);

    axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        window.location.reload(true);
        // handle success
      })
      .catch((error) => {
        console.error(error);
        // handle error
      });
  };
  return (<>          
    <div className="col-md-7 col-lg-8 col-xl-9">
      <div className="card">
        <div className="card-body">
          <div>
            <div className="row form-row">
              <div className="col-12 col-md-12">
                <div className="form-group">
                  <div className="change-avatar">
                    <div className="profile-img">
                      <img src={`https://healthcaresys.azurewebsites.net/api/Users/GetProfilePic?id=${userData.nameid}`} alt="User Image"/>
                    </div>
                    <div className="upload-img">
                      <div className="change-photo-btn">
                        <span><i className="fa fa-upload"></i> Upload Photo</span>
                        <input type="file" className='upload' onChange={handleFileSelect}/>
                      </div>
                      <small className="form-text text-muted">Allowed JPG, GIF or PNG. Max size of 10MB</small>
                      <p className='color-danger'></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" className="form-control" placeholder={`${userData.FirstName}`} readOnly/>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" className="form-control" placeholder={`${userData.LastName}`} readOnly/>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label>Age</label>
                    <input type="text" className="form-control datetimepicker" placeholder={`${userData.Age}`} readOnly/>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label>Blood Group</label>
                  <select className="form-control select select2-hidden-accessible" data-select2-id="A1" tabIndex="-1" aria-hidden="true">
                    <option name='A1'>A-</option>
                    <option name='A2'>A+</option>
                    <option name='A1'>B-</option>
                    <option name='A1'>B+</option>
                    <option name='A1'>AB-</option>
                    <option name='A1'>AB+</option>
                    <option name='A1'>O-</option>
                    <option name='A1'>O+</option>
                  </select>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label>Email ID</label>
                  <input type="email" className="form-control" placeholder={`${userData.email}`}  readOnly/>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label>Mobile</label>
                  <input type="text" placeholder={`+2${userData.PhoneNumber}`} className="form-control" readOnly/>
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label>Address</label>
                  <input type="text" className="form-control" placeholder={`${userData.Address}`}/>
                </div>
              </div>
              
            </div>
            <div className="submit-section">
              <button type="submit" onClick={handleFileUpload} className="btn btn-process submit-btn">Save Changes</button>
            </div>
          </div>
          
          
        </div>
      </div>
    </div>
  </>
  )
}
