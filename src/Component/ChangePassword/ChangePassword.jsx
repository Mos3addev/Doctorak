/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';


export default function ChangePassword({userData}) {
	useEffect(() => {
		window.scrollTo(0, 0)
	  }, [])
	  const [errorList, setErrorList] = useState([]);
	  const navigate = useNavigate();
		  const [loading, setLoading] = useState(false);
		  const [error, setError] = useState('');
		  const [user, setUser] = useState({
			  currentpassword:'',
			  newPassword:''
			})
	
	async function sendUserDataToApi() {
    axios.put(`${process.env.REACT_APP_URL_SITE}api/Users/ChangePassword?userID=${userData.nameid}&currentpassword=${user.currentpassword}&newPassword=${user.newPassword}`,user).then(response => {
		setLoading(false)
		navigate('/');
    })
    .catch(error => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 1000);
		setError(error.response.data.message || error.response.data.errors )
	});
  };

  function getUserData(e)
  {
    let myUser={...user};
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }
  function submitRegisterForm(e){
    e.preventDefault();
    setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    let validation = validateLoginForm();
    if (validation.error){
      setErrorList(validation.error.details)
    }
    else{
      sendUserDataToApi();
      setLoading(false);

    }
  }
  function validateLoginForm(){
    let scheme =  Joi.object({
		currentpassword: Joi.string().pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,20}$/), // 
		newPassword: Joi.string().pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,20}$/), // 
		confirmNewPassword: Joi.string().valid(Joi.ref('newPassword')).required()
    });
    return scheme.validate(user , {abortEarly:false});
 }

  return (<>
	<div className="col-md-7 col-lg-8 col-xl-9">
		<div className="card">
			<div className="card-body">
				<div className="row">
					<div className="col-md-12 col-lg-6">
						{error?
						<p className='text-danger'>Invalid old password</p>:''}	
						<form onSubmit={submitRegisterForm}>
							<div className="form-group">
								<label htmlFor='currentpassword' >Old Password</label>
								<input type="password" name='currentpassword' onChange={getUserData} id='currentpassword' className="form-control"/>
								{errorList.map((error,index)=>{
									if(error.context.label === 'currentpassword'){
									return <p key={index} className='text-danger'>Password not matches between 6 and 20 and must content at least uppercase letter, lowercase letter, and digit number.</p>
									}})}
							</div>
							<div className="form-group">
								<label htmlFor='newPassword'>New Password</label>
								<input type="password" name='newPassword' onChange={getUserData} id='newPassword' className="form-control"/>
								{errorList.map((error,index)=>{
									if(error.context.label === 'newPassword'){
									return <p key={index} className='text-danger'>Password not matches between 6 and 20 and must content at least uppercase letter, lowercase letter, and digit number.</p>
									}})}
							</div>
							<div className="form-group">
								<label htmlFor='confirmNewPassword'>Confirm Password</label>
								<input type="password" name='confirmNewPassword' onChange={getUserData} id='confirmNewPassword' className="form-control"/>
								{errorList.map((error,index)=>{
									if(error.context.label === 'confirmNewPassword'){
									return <p key={index} className='text-danger'>New password and confirm password fields must match</p>
									}})}
							</div>
							
							<div className="submit-section">
								<button type="submit" className="btn btn-process submit-btn">
									{loading?<i className='fas fa-spinner fa-spin'></i>: 'Save Changes'}</button>
							</div>
						</form>	
					</div>
				</div>
			</div>
		</div>
	</div>
	</>
  );
}