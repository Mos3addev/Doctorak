/* eslint-disable array-callback-return */
import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios';
import Joi from 'joi';


export default function MachineLearning() {
    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [errorList, setErrorList] = useState([]);
    const [personPredict, setPersonPredict] = useState([]);
    const [model, setModel] = useState({
      age: 0,
      sex : 0,
      cp : 0,
      trtbps:0,
      chol:0,
      fbs: 0,
      restecg:0,
      thalachh:0,
      exng: 0,
      oldpeak:0,
      slp:0,
      caa:0,
      thall:0
    })
  async function sendModelDataToApi(){
   await axios.post(`${process.env.REACT_APP_URL_SITE}api/Users/Predict`,model).then(async (response) => {
    setPersonPredict(response.data.Prediction)
    setLoading(false); 
  })
  .catch(error => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    setError(error.response.message||error.response.data)
    });;
}
function getModelData(e)
{
  let myModel={...model};
  myModel[e.target.name] = e.target.value;
  setModel(myModel);    
}
function submitModelForm(e){
  e.preventDefault();
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
  }, 1000);
  let validation = validateModelForm();
  if (validation.error){

    setErrorList(validation.error.details)
  }
  else{
    sendModelDataToApi();
  }
}

function validateModelForm(){
  const  scheme =  Joi.object({
    age : Joi.number().required(),
    sex : Joi.number().required(),
    cp : Joi.number().required(),
    trtbps : Joi.number().required(),
    chol : Joi.number().required(),
    fbs : Joi.number().required(),
    restecg : Joi.number().required(),
    thalachh : Joi.number().required(),
    exng : Joi.number().required(),
    oldpeak : Joi.number().required(),
    slp : Joi.number().required(),
    caa : Joi.number().required(),
    thall : Joi.number().required(),
  });
  return scheme.validate(model , {abortEarly:false});
}

    return (<>
     <div className="login container mt-5">
    <h1 className="text-center main-color">Heart Attack Prediction</h1>
    {error?
        <p className='text-danger'>
          {error}
        </p>:''}
    <form onSubmit={submitModelForm}>
      <div className='d-flex'>
        <div className='row'>
          <input onChange={getModelData} className="form-control w-50 my-input my-2" type="text" name="age" placeholder="age" required="required"/>
          <input onChange={getModelData} className="form-control w-50 my-input my-2" type="text" name="sex" placeholder="sex" required="required"/>
          <p className='text-danger'>{errorList.filter((error)=>error.context.label ==="sex")[0]?.message}{errorList.filter((error)=>error.context.label ==="age")[0]?.message}</p>
          <input onChange={getModelData} className="form-control w-50 my-input my-2" type="text" name="cp" placeholder="cp" required="required"/>
          <input onChange={getModelData} className="form-control w-50 my-input my-2" type="text" name="trtbps" placeholder="trtbps" required="required"/>
          <p className='text-danger'>{errorList.filter((error)=>error.context.label ==="trtbps")[0]?.message}{errorList.filter((error)=>error.context.label ==="cp")[0]?.message}</p>
          <input onChange={getModelData} className="form-control w-50 my-input my-2" type="text" name="chol" placeholder="chol" required="required"/>
          <input onChange={getModelData} className="form-control w-50 my-input my-2" type="text" name="fbs" placeholder="fbs" required="required"/>
          <p className='text-danger'>{errorList.filter((error)=>error.context.label ==="fbs")[0]?.message}{errorList.filter((error)=>error.context.label ==="chol")[0]?.message}</p>
          <input onChange={getModelData} className="form-control w-50 my-input my-2" type="text" name="restecg" placeholder="restecg" required="required"/>
          <input onChange={getModelData} className="form-control w-50 my-input my-2" type="text" name="thalachh" placeholder="thalachh" required="required"/>
          <p className='text-danger'>{errorList.filter((error)=>error.context.label ==="thalachh")[0]?.message}{errorList.filter((error)=>error.context.label ==="restecg")[0]?.message}</p>
          <input onChange={getModelData} className="form-control w-50 my-input my-2" type="text" name="exng" placeholder="exng" required="required"/>
          <input onChange={getModelData} className="form-control w-50 my-input my-2" type="text" name="oldpeak" placeholder="oldpeak" required="required"/>
          <p className='text-danger'>{errorList.filter((error)=>error.context.label ==="oldpeak")[0]?.message}{errorList.filter((error)=>error.context.label ==="exng")[0]?.message}</p>
          <input onChange={getModelData} className="form-control w-50 my-input my-2" type="text" name="slp" placeholder="slp" required="required"/>
          <input onChange={getModelData} className="form-control w-50 my-input my-2" type="text" name="caa" placeholder="caa" required="required"/>
          <p className='text-danger'>{errorList.filter((error)=>error.context.label ==="caa")[0]?.message}{errorList.filter((error)=>error.context.label ==="slp")[0]?.message}</p>
          <input onChange={getModelData} className="form-control w-50 my-input my-2" type="text" name="thall" placeholder="thall" required="required"/>
          <p className='text-danger'>{errorList.filter((error)=>error.context.label ==="thall")[0]?.message}</p>
          {personPredict.length>0 && personPredict==='POSITIVE'?
            <p className='text-center text-success bg-main-color mt-2 rounded-2 p-2'>
              <span className='text-white'>This Person Prediction Is : </span>{personPredict}
            </p>:personPredict.length>0 &&
            <p className='text-center text-danger bg-main-color mt-2 rounded-2 p-2'>
              <span className='text-white'>This Person Prediction Is :</span>{personPredict}
            </p>}
          <button type='submit' className='w-100 mt-3 btn btn-outline-success'>
          {loading ? <i className='fas fa-spinner fa-spin'></i>:'Predict'}
          </button>
          
        </div>
      </div>
        
    </form>

    <br/>
    <br/>

</div>

   </>);
}