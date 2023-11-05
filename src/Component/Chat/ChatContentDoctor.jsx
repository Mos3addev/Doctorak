/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext, useEffect } from 'react';
import { context } from '../../Context/Context';
import { useParams } from 'react-router-dom';
import './Chat.css'
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import { useState } from 'react';


export default function ChatContentDoctor() {
    let {userData }= useContext(AuthContext)
    let {messengerDoctor,MessengerDoctorRecepients}= useContext(context)
    const [fullConversation, setFullConversation] = useState([])
  const {id} =  useParams()
  const receiver = id;
  const receiverData = messengerDoctor.find(item=> item.id === id)
  useEffect(()=>{
    if(receiverData){
      FullConversation();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[receiverData])

  const FullConversation = async () => {
    try {
      if(receiver!=null){
        const {data} = await axios.get(`${process.env.REACT_APP_URL_SITE}api/Users/FullConversation?receiver=${receiver}&sender=${userData.nameid}`);
        setFullConversation(data)
      }
    } catch (error) {
      console.error('Error receiving chat messages:', error);
    }
    // Add a small delay before making the next request
};

  const sendMessage = async (event) => {
    event.preventDefault(); // prevent the form from submitting normally

    const messageInput = event.target.elements.message;
    const messageText = messageInput.value.trim();

    if (messageText === '') {
      return; // don't send empty messages
    }

    const message = {
      content: messageText,
      sender: userData.nameid,
      receiver: receiver,
      timestamp: new Date(Date.now()).toISOString(),
    };
    try {
      const response = await axios.post(`${process.env.REACT_APP_URL_SITE}api/Users/send`, message);

      if (response.status === 200) {
        // Message sent successfully
        messageInput.value = '';
        if(receiverData=== undefined){
          // window.location.reload()
          MessengerDoctorRecepients();
        } 
        FullConversation();// clear the input field
      } else {
        console.error('Failed to send message:', response.status);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  if(receiverData){
    return (
      <>
      <div className="chat-cont-right">
          <div className="chat-header">
              <a id="back_user_list"  className="back-user-list">
                  <i className="material-icons">chevron_left</i>
              </a>
              <div className="media">
                  <div className="media-img-wrap">
                      <div className="avatar avatar-online">
                          <img src={`${process.env.REACT_APP_URL_SITE}api/Users/GetProfilePic?id=${receiverData.id}`} alt="User Image" className="avatar-img rounded-circle"/>
                      </div>
                  </div>
                  <div className="media-body">
                      <div className="user-name">{receiverData.firstName} {receiverData.lastName}</div>
                      <div className="user-status">online</div>
                  </div>
              </div>
          </div>
          <div className="chat-body">
              <div className="chat-scroll">
                  <ul className="list-unstyled">
                  {fullConversation.map((item,index)=>(
                      <li className={`media received ${(item.sender===userData.nameid)}`}  key={index}>
                          <div className="media-body">
                              <div className='msg-box'>
                              <div>
                                  <p>{item.content}</p>
                                  
                                  <ul className="chat-msg-info">
                                      <li>
                                          <div className="chat-time">
                                              <span>{(((item.timestamp).split('T')[1]).split(':')[0])}:{((item.timestamp).split('T')[1]).split(':')[1]}</span>
                                          </div>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                          </div>
                      </li>     
                      ))
                  }

                  </ul>
              </div>
          </div>
          <div className="chat-footer">
              <form onSubmit={sendMessage} className="input-group d-flex align-items-center">
                  <input type="text" name="message" className="input-msg-send form-control" placeholder="Type something"/>
                  <div className="input-group-append">
                      <button type="submit" className="btn msg-send-btn"><i className="fab fa-telegram-plane"></i></button>
                  </div>
              </form>
          </div>
      </div>
      </>
    );
  }
}