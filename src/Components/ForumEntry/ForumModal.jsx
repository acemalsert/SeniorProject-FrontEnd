import React,{useState,useRef, useContext} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios';
import { Modal } from '@material-ui/core'
import './forumEntry.css';
import { AuthContext } from '../../context/AuthContext';
function ForumModal({open,handleClose,refecenedComment,indicator,setIndicator}) {
    const replyContent = useRef(null);
    const {forumId} = useParams();
    const {user} = useContext(AuthContext);
    const handleReply = ()=>{
        let forumComment;
        if(refecenedComment){
          forumComment = {
            forumId:forumId,
            userId:user._id,
            parentCommentId:refecenedComment,
            content:replyContent.current.value,
          }
        }
        else{
          forumComment = {
            forumId:forumId,
            userId:user._id,
            content:replyContent.current.value,
          }
        }
        const sendReply = async (comment)=>{
          try {
            console.log(user.auth);
            const res = await axios.post(`/comments/forum/${forumId}/${comment.userId}`,comment,{
              headers:{
                authorization:user.auth
              }
            });
            console.log(res.data)        
          } catch (error) {
            console.log(error)
          }
        }
        sendReply(forumComment);
        setIndicator(!indicator);
        handleClose()
    }
    return (
        <Modal
        open={open}
        onClose={handleClose}
        >
            <div className='container'>
              <div className='row'>
                  <div className='col-12 col-md-12'>
                  <div className='comment-modal'>
                      <h6 style={{marginBottom:"1rem"}}>Lütfen Yanıtınızı giriniz:</h6>
                      <textarea className="form-control mb-4" placeholder="Yanıt" id="floatingTextarea" ref={replyContent}></textarea>
                      <button className='btn btn-primary' onClick={()=>handleReply()}>Yanıt Ver</button>
                  </div>
              </div>
            </div>
          </div>
        </Modal>
    );
}

export default ForumModal