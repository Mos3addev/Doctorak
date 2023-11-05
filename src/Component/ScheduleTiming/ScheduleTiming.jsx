import React,{ useContext, useEffect }  from 'react'
import '../../App.css'
import './ScheduleTiming.css'
import { context } from '../../Context/Context';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

export default function ScheduleTiming() {
  let {userData }= useContext(AuthContext)

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  let {scheduleTiming, handleDeleteSchedule, handleAddSchedule  } = useContext(context)


  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  let navigate = useNavigate()
if(userData.role==='Doctor'){
  return <>
    <div className="col-md-7 col-lg-8 col-xl-9">
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Schedule Timings</h4>
              <div className="profile-box"> 
                <div className="row">
                  <div className="col-md-12">
                    <div className="card schedule-widget mb-0">
                      <form onSubmit={handleAddSchedule} className='p-3'>
                        <label className='me-3'>
                          Time From:
                          <input className='form-control' type="time" name="timeFrom" required />
                        </label>
                        <label className='me-3'>
                          Time To:
                          <input className='form-control' type="time" name="timeTo" required />
                        </label>
                        <label className='me-3'>
                          Day:
                          <select className='form-control' name="day">
                            <option value="0">Sunday</option>
                            <option value="1">Monday</option>
                            <option value="2">Tuesday</option>
                            <option value="3">Wednesday</option>
                            <option value="4">Thursday</option>
                            <option value="5">Friday</option>
                            <option value="6">Saturday</option>
                          </select>
                        </label>
                        <button className='btn p-2 btn-outline-success' type="submit">Submit</button>
                      </form>
                    </div>
                  </div>
                  <div className="col-md-12 mt-4">
                    <div className="card schedule-widget mb-0">
                      <div className="widget business-widget">
                        <div className="widget-content">
                          <div className="listing-hours">
                            {scheduleTiming.map(schedule=>(
                              <div key={schedule.id} className="listing-day mt-3 align-items-center">
                                <div className="day">{dayNames[schedule.day]}</div>
                                <div className="time-items d-flex align-items-center">
                                  <span className="time">{schedule.timeFrom} - {schedule.timeTo}</span>
                                  <button className='btn btn-sm btn-danger ms-2' onClick={() => handleDeleteSchedule(schedule.id)}>Delete</button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>}
  else{
    return navigate('/')
  }
}