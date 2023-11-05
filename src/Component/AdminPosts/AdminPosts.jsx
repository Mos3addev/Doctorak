import React, { useContext } from "react";
import { context } from "../../Context/Context";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

export default function AdminPosts() {
  let {
    posts,
    comments,
    handlePostClick,
    handleDeletePost,
    handleDeleteComment,
    deleteError,
  } = useContext(context);
  let {userData }= useContext(AuthContext)
	let navigate = useNavigate()
  if(userData.role==='Admin'){
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Posts</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/admin">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Posts</li>
              </ul>
            </div>
            <div className="mb-2 col-sm-12 col-lg-5 col-xl-11 mt-3">
              <div className="row d-flex p-4 bg-white">
                {posts.map((item) => (
                  <div
                    key={item.postID}
                    className="d-md-flex flex-row card p-3 row position-relative"
                  >
                    <div className="position-absolute top-0 bottom-100 translate-middle-y d-flex">
                      <div>
                        <p className="bg-white m-auto translate-middle-y secondary-color">
                          {item.user.firstName} {item.user.lastName}
                        </p>
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
                      <div className="pb-4">
                        <p
                          className="doc-department"
                          name={item.specializationSpecID}
                        >
                          <img
                            className="img-dentist"
                            src={`https://healthcaresys.azurewebsites.net/api/Admin/ViewSpecPicture?id=${item.specializationSpecID}`}
                            alt=""
                          />
                          {item.specialization.specializationName}
                        </p>
                        <button
                          className="btn btn-sm btn-danger position-absolute end-0 me-4"
                          onClick={() => handleDeletePost(item.postID)}
                        >
                          Delete Post
                        </button>
                      </div>
                    </div>
                    {comments.length > 0 && (
                      <div className="comments">
                        {comments.map(
                          (comment) =>
                            comment.forumID === item.postID && (
                              <div
                                className="d-flex my-3 position-relative justify-content-between secondary-color"
                                key={comment.commentID}
                              >
                                <span>
                                  <strong>
                                    Dr.{comment.doctor.user.firstName}
                                    {comment.doctor.user.lastName}
                                  </strong>
                                  :{" "}
                                  <span className="text-muted">
                                    {comment.commentText}
                                  </span>
                                </span>
                                <button
                                  className="btn btn-sm position-absolute end-50 btn-outline-danger"
                                  onClick={() =>
                                    handleDeleteComment(comment.commentID)
                                  }
                                >
                                  Delete Comment
                                </button>
                              </div>
                            )
                        )}
                      </div>
                    )}
                  {deleteError.length?<p className='text-danger'>Must be delete all comment first</p>:''}
                  </div>
                  
                ))}
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  )}
  else{
    return navigate('/')
  }
}
