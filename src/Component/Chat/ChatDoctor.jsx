/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext, useEffect } from 'react';
import { context } from '../../Context/Context';
import { Link, Outlet, useParams } from 'react-router-dom';
import './Chat.css'

export default function ChatDoctor() {
    let {messengerDoctor}= useContext(context)
    const {id} =  useParams()
    
    useEffect(()=>{
    window.scrollTo(0, 0)
  },[]) 
  return (
    <>
        <div className='content mt-5 pt-2 position-fixed top-0 bottom-25 start-0 end-0'>
            <div className="row">
                <div className="col-xl-12">
                    <div className="chat-window">
                    
                        <div className="chat-cont-left">
                            <div className="chat-header">
                                <span>Chats</span>
                            </div>
                            <div className="chat-users-list">
                                <div className="chat-scroll p-2">
                                    {messengerDoctor.map((item)=>(
                                        <Link to={`patient/${item.id}`} className={`media read-chat ${item.id=== id ? 'active' :''} d-flex align-items-center`} key={item.id}>
                                            <div className="media-img-wrap">
                                                <div className="avatar avatar-online">
                                                    <img src={`https://healthcaresys.azurewebsites.net/api/Users/GetProfilePic?id=${item.id}`} alt="User Image" className="avatar-img rounded-circle"/>
                                                </div>
                                            </div>
                                            <div className="media-body">
                                                <div>
                                                    <div className="user-name">{item.firstName} {item.lastName}</div>
                                                </div>
                                            </div>
                                        </Link>
                                    )) 
                                } 
                                </div>
                            </div>
                        </div>
                        <Outlet></Outlet> 
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}