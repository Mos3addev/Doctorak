import React, { useContext, useEffect } from 'react';
import { context } from '../../Context/Context';
import { Link } from 'react-router-dom';

export default function MedicalQuestions() {
  let {spec ,selectedSpecs ,filteredPosts,  setSelectedSpecs ,posts , comments, handleSearchSpec, handlePostClick } = useContext(context)
  useEffect(()=>{
    window.scrollTo(0, 0)
  },[]) 
  return (
    <>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="card search-filter align-items-center col-md-12 col-lg-4 col-xl-3 theiaStickySidebar">
            <div>
              <div className="card-header">
                <h4 className="card-title mb-0">Post Filter</h4>
              </div>
              <form className="card-body">
                <div className="filter-widget">
                  <h4>Select Specialist</h4>
                  {spec.map((spec) => (
                    <div key={spec.specID}>
                      <label className="custom_check">
                      <input
                        type="checkbox"
                        value={spec.specID}
                        checked={selectedSpecs?.includes(spec.specID)}
                        onChange={(e) =>
                          setSelectedSpecs((prev) =>
                            e.target.checked
                              ? [...prev, spec.specID]
                              : prev.filter((id) => id !== spec.specID)
                          )
                        }
                      />
                        <span className="checkmark"></span>{' '}
                        {spec.specializationName}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="btn-search">
                  <button
                    type="button"
                    className="btn btn-block w-100"
                    onClick={handleSearchSpec}
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
          {filteredPosts.length === 0 ?
          <div className="mb-2 col-md-12 col-lg-8 col-xl-9">
            <div className="row d-flex p-4 bg-white mx-5">
              {posts.map((item) => (
                <div
                  key={item.postID}
                  className="d-md-flex flex-row card p-3 row position-relative"
                >
                  <div className="position-absolute top-0 bottom-100 translate-middle-y d-flex">
                    <div>
                      <p className="bg-white m-auto translate-middle-y secondary-color">{item.user.firstName} {item.user.lastName}</p>
                    </div>
                  </div>
                  <div className=" d-flex justify-content-between">
                    <h3
                      className="main-color"
                      key={item.userID}
                      onClick={() => handlePostClick(item.postID)}
                    >
                      {item.postText}?
                    </h3>
                    <p className="doc-department" name={item.specializationSpecID}>
                      <img
                        className="img-dentist"
                        src={`https://healthcaresys.azurewebsites.net/api/Admin/ViewSpecPicture?id=${item.specializationSpecID}`}
                        alt=""
                      />
                      {item.specialization.specializationName}
                    </p>
                  </div>
                  {comments.length > 0 && (
                    <div className="comments">
                      <ul>
                        {comments.map((comment)=> (
                          (comment.forumID === item.postID)?
                            <li className='list-unstyled secondary-color' key={comment.commentID}>
                          <Link to={/profileDoctor/+comment.doctor.doctorID}><strong className='secondary-color'>Dr.{comment.doctor.user.firstName}{comment.doctor.user.lastName}</strong></Link>: <span className='text-muted'>{comment.commentText}</span>
                          </li>:''
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}    
            </div>
          </div>
          :
          <div className="mb-2 col-md-12 col-lg-8 col-xl-9">
            <div className="row d-flex p-4 bg-white mx-5">
              {filteredPosts.map((item) => (
                <div
                key={item.postID}
                className="d-md-flex flex-row card p-3 row position-relative"
              >
                <div className="position-absolute top-0 bottom-100 translate-middle-y d-flex">
                  <div>
                    <p className="bg-white m-auto translate-middle-y secondary-color">{item.user.firstName} {item.user.lastName}</p>
                  </div>
                </div>
                <div className=" d-flex justify-content-between">
                  <h3
                    className="main-color"
                    key={item.userID}
                    onClick={() => handlePostClick(item.postID)}
                  >
                    {item.postText}?
                  </h3>
                  <p className="doc-department" name={item.specializationSpecID}>
                    <img
                      className="img-dentist"
                      src={`https://healthcaresys.azurewebsites.net/api/Admin/ViewSpecPicture?id=${item.specializationSpecID}`}
                      alt=""
                    />
                    {item.specialization.specializationName}
                  </p>
                </div>
                {comments.length > 0 && (
                    <div className="comments">
                      <ul>
                        {comments.map((comment)=> (
                          (comment.forumID === item.postID)?
                            <li className='list-unstyled secondary-color' key={comment.commentID}>
                          <Link to={/profileDoctor/+comment.doctor.doctorID}><strong className='secondary-color'>Dr.{comment.doctor.user.firstName}{comment.doctor.user.lastName}</strong></Link>: <span className='text-muted'>{comment.commentText}</span>
                          </li>:''
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
              ))}
              
            </div>
          </div>
          }
        </div>
      </div>
    </>
  );
}