/* eslint-disable array-callback-return */
import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Joi from 'joi';


export default function RegisterPatient() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errorList, setErrorList] = useState([]);
  const [user, setUser] = useState({
    id: 'string',
    firstName : '',
    lastName : '',
    emailAddress:'',
    password:'',
    dateOfBirth: '',
    phoneNumber:'',
    gender:true,
    type: 1,
    image:'string',
    blood:0,
    address:'',
    confirmEmail:false
  })

  async function sendUserDataToApi(){
    await axios.post(`${process.env.REACT_APP_URL_SITE}api/Users/Register`,user).then(response => {
      setLoading(false);
      navigate('/login');
    })
    .catch(error => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      if(error.response.data.status===400){
        setError(error.response.data.errors.Password)
      }
      else{
        setError(error.response.data)
      }
      });;
  }
  function getUserData(e)
  {
    let myUser={...user};
    myUser[e.target.name] = e.target.value;
    if(myUser.gender === 'true'){
      myUser.gender = true;
    }
    else if(myUser.gender === 'false'){
      myUser.gender = false;
    }
    setUser(myUser);
  }
  function submitRegisterForm(e){
    e.preventDefault();
    setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    let validation = validateRegisterForm();
    if (validation.error){
      setErrorList(validation.error.details)
    }
    else{
      sendUserDataToApi();
    }
  }
  
  function validateRegisterForm(){
    const  scheme =  Joi.object({
      id: Joi.string(),
      firstName: Joi.string().min(3).max(15).required(),
      lastName: Joi.string().min(3).max(15).required(),
      emailAddress: Joi.string().email({tlds:{allow:['com','net'] } }).required(),
      password: Joi.string().pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,20}$/),
      dateOfBirth: Joi.string().required(),
      phoneNumber: Joi.string().regex(/^01[0125][0-9]{8}$/).required(),
      address: Joi.string().required(),
      type : Joi.number().required(),
      gender : Joi.boolean().required(),
      image: Joi.string(),
      blood : Joi.number().valid(0,1,2,3,4,5,6,7).required(),
      confirmEmail : Joi.boolean().required(),
    });
    return scheme.validate(user , {abortEarly:false});
 }



 return (
    <>
    <div className='mt-60px'>
      <div className='w-75 mx-auto py-3'>
        <div className='d-flex justify-content-between align-items-center'>
          <h3 className='my-4 main-color'>Patient Register</h3>
          <Link to='/register/doctor'><h5 className='secondary-color my-4'name='type' value='1'>Are You A Doctor?</h5></Link>
        </div>
        {error?
        <p className='text-danger'>
          {error}
        </p>:''}
        
        <form onSubmit={submitRegisterForm}>
          <label htmlFor='firstName' className='main-color'>First name :</label>
          <input onChange={getUserData} className="form-control my-input my-2" type="text" name='firstName' id='firstName'/>   
          <p className='text-danger'>{errorList.filter((error)=>error.context.label === "firstName")[0]?.message}</p>

          <label htmlFor='lastName' className='main-color'>Last name :</label>
          <input onChange={getUserData} className="form-control my-input my-2" type="text" name='lastName' id='lastName'/>   
          <p className='text-danger'>{errorList.filter((error)=>error.context.label === "lastName")[0]?.message}</p>

          <label htmlFor='emailAddress' className='main-color'>Email :</label>
          <input onChange={getUserData} className="form-control my-input my-2" type="email" name='emailAddress' id='emailAddress'/>
          <p className='text-danger'>{errorList.filter((error)=>error.context.label ==="emailAddress")[0]?.message}</p>

          <label htmlFor='password' className='main-color'>Password :</label>
          <input onChange={getUserData} className="form-control my-input my-2" type="Password" name='password' id='password'/>   
          {errorList.map((error,index)=>{
                    if(error.context.label === 'password'){
                    return <p key={index} className='text-danger'>Password not matches between 6 and 20 and must content at least uppercase letter, lowercase letter, and digit number.</p>
                    }})}

          <label className='main-color'>Gender:</label>
          <br />  
          <input className='my-2' type="radio" name="gender" value="true" checked={user.gender === true} id='male' onChange={getUserData} />
          <label htmlFor='male' className='main-color'>Male </label>
          <br />
          <input type="radio" name="gender" value="false" checked={user.gender === false} id='female' onChange={getUserData} />
          <label htmlFor='female' className='main-color'>
          Female </label>
          <br /><br />
          <label htmlFor='phoneNumber' className='main-color'>Phone :</label>
          <input onChange={getUserData} className="form-control my-input my-2" type="Number" name='phoneNumber' id='phoneNumber' required/>  
          <p className='text-danger'>{errorList.filter((error)=>error.context.label === "phoneNumber")[0]?.message}</p>
          

          <label htmlFor='address' className='main-color'>Address :</label>
          <input onChange={getUserData} className="form-control my-input my-2" type="text" name='address' id='address' required/>  
          <p className='text-danger'>{errorList.filter((error)=>error.context.label === "address")[0]?.message}</p>

          <label htmlFor='dateOfBirth' className='main-color'>Date of Birth:</label>
          <input onChange={getUserData} className="form-control main-color w-25 my-input my-2" type="date" name="dateOfBirth" value={user.dateOfBirth} id='dateOfBirth' required/>
          <p className='text-danger'>{errorList.filter((error)=>error.context.label === "dateOfBirth")[0]?.message}</p>


        
          
        <button type='submit' className='w-100 mt-3 btn btn-outline-success'>
          {loading ? <i className='fas fa-spinner fa-spin'></i>:'Register'}
        </button>

          
        </form>
      </div>
    </div>
    </>
  )
}
