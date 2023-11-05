import React, { useContext, useEffect } from 'react';
import { context } from '../../Context/Context';
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './../../Context/AuthContext';

export default function Questions() {
  const { comments,docID,filteredDocPosts, handlePostClick } = useContext(context);

  const handleAddComment = (commentText,postId) => {
    const doctorID = docID;
    const forumID = postId;
    if (commentText && forumID) {
      axios.post(`${process.env.REACT_APP_URL_SITE}api/Doctor/AddComment`,{
          doctorID,
          forumID,
          commentText
        })
      .then(response => {
          if (response.status===200) {
            handlePostClick(forumID)
          }
        })
        .catch(error => {
          console.error('Error adding comment:', error);
        });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  


  let {userData }= useContext(AuthContext)
	let navigate = useNavigate()
  if(userData.role==='Doctor'){
  return (
    <>
      <div className="mb-2 col-md-12 col-lg-8 col-xl-9">
        <div className="row d-flex p-4 bg-white mx-5">
          {filteredDocPosts.map(item => (
            <div key={item.postID} className="d-md-flex flex-row card p-3 row position-relative">
              <div className="position-absolute top-0 bottom-100 translate-middle-y d-flex">
                <div>
                  <p className="bg-white m-auto translate-middle-y secondary-color">
                    {item.user.firstName} {item.user.lastName}
                  </p>
                </div>
              </div>
              <div className="d-flex justify-content-between">
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
                    src={`${process.env.REACT_APP_URL_SITE}api/Admin/ViewSpecPicture?id=${item.specializationSpecID}`}
                    alt=""
                  />
                  {item.specialization.specializationName}
                </p>
              </div>
              {comments.length > 0 && (
                <div className="comments">
                  <ul>
                    {comments.map(comment =>
                      comment.forumID === item.postID ? (
                        <li className="list-unstyled secondary-color" key={comment.commentID}>
                          <Link to={`/profileDoctor/${comment.doctor.doctorID}`}>
                            <strong className="secondary-color">
                              Dr.{comment.doctor.user.firstName}
                              {comment.doctor.user.lastName}
                            </strong>
                          </Link>
                          : <span className="text-muted">{comment.commentText}</span>
                        </li>
                      ) : (
                        ''
                      )
                    )}
                  </ul>
                </div>
              )}
              
              <form onSubmit={(e)=>{
                e.preventDefault()
                handleAddComment(e.target[0].value ,item.postID)
              }} className="mt-3">
                <div className='d-flex justify-content-between align-items-center'>
                  <input
                  type="text"
                  className="form-control w-75"
                  placeholder="Add a comment..."
                />
                <button type='submit' className="btn btn-primary" >
                  Comment
                </button>
                </div>
              </form>
            </div>
          ))}
         
        </div>
      </div>
    </>
  )}
  else{
    return navigate('/')
  }
}