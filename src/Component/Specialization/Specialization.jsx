import React, { useContext ,useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { context } from '../../Context/Context';
import { AuthContext } from '../../Context/AuthContext';

export default function Specialization() {
  let {userData }= useContext(AuthContext)
  const [price, setPrice] = useState('');
  const navigate = useNavigate();
	let {spec , selectedSpecValue,handleSelectSpec } = useContext(context)

  const handleContinueRegister = (event) => {
    event.preventDefault();
    axios.post(`${process.env.REACT_APP_URL_SITE}api/Doctor/ContinueRegister`, 
    { specializationSpecID: selectedSpecValue ,
      userID : userData.nameid,
      price : price
    })
      .then(navigate('/doctor/profile'))
      .catch(error => console.error(error));
  };
  function getPrice(e)
  {
    const  myPrice = e.target.value;
    setPrice(myPrice)
  }
  
  if(userData.role ==='Doctor'){
    return (<>
      <div className='container py-5'>
         <form onSubmit={handleContinueRegister} className='d-flex justify-content-center'>
            <div className='card card-form py-5 w-75'>
              <h1 className='main-color text-center'>Select Your Specialization</h1>
  
              <select value={selectedSpecValue} className="main-color dropdown-content form-control text-center" onChange={handleSelectSpec} >
                  
                  <option className=" secondary-color dropdown-content text-center">Select a value...</option>
              {spec.map(item => (
                <option className='  secondary-color text-center' key={item.specID} value={item.specID}>{item.specializationName}</option>))}
              </select>
              <label htmlFor='price' className='main-color'>Enter Your Price :</label>
              <input onChange={getPrice} value={price} className="form-control w-75 my-input my-2" type="Number" name='price' id='price' required/>
  
              <div className='dropdown-content'>
                  <button type='submit' className='w-100 btn btn-process'>Submit</button>
              </div>
            </div>
          </form>
      </div>
    </>);
  }
  else{
    return navigate('/')
  }
}