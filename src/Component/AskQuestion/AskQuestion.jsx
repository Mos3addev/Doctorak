import React, { useContext } from 'react';
import './AskQuestion.css'
import { context } from '../../Context/Context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

export default function AskQuestion() {
  let {userData }= useContext(AuthContext)
  let {spec,handleSelectSpec ,handleYourQuestion,question,selectedSpecValue} = useContext(context)
  const navigate = useNavigate()
  const handleNewPost = (event) => {
    event.preventDefault();
    axios.post(`${process.env.REACT_APP_URL_SITE}api/Users/NewPost`, {
    specID: selectedSpecValue ,
    userID : userData.nameid,
    postText : question,
    }).then(response => {
    navigate('/');
    }).catch(error => console.error(error));
  };
  if(userData.role==='Patient'){
  return (<>
    <div className='container py-5'>
       <form onSubmit={handleNewPost} className='d-flex justify-content-center'>
          <div className='card card-form py-5 w-75'>
            <h1 className='main-color text-center'>Select Your Specialization</h1>

            <select value={selectedSpecValue} className="main-color dropdown-content form-control text-center" onChange={handleSelectSpec} required>        
                <option className=" secondary-color dropdown-content text-center">Select a value...</option>
            {spec.map(item => (
              <option className='  secondary-color text-center' key={item.specID} value={item.specID}>{item.specializationName}</option>))}
            </select>
            <div className='dropdown-content flex-column'>
                    <label htmlFor='YourQuestion' className='main-color h3 pb-3'>Your Question</label>
                    <input onChange={handleYourQuestion} value={question}  className="form-control forms-container" placeholder='Example: What are the causes of acne?' id="YourQuestion" rows="3" required></input>
            </div>
            <div className='dropdown-content'>
                <button type='submit' className='w-100 btn btn-process'>Submit</button>
            </div>
          </div>
        </form>
    </div>
  </>)}
  else{
    return navigate('/')
  }
}
