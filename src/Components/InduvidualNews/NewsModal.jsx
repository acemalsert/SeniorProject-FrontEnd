import React,{useState,useRef, useContext} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios';
import { Modal } from '@material-ui/core'
import './comments.css';
import { AuthContext } from '../../context/AuthContext';

function NewsModal({open,handleClose,refecenedComment,indicator,setIndicator,newsId}) {
    const replyContent = useRef(null);
    //const {newsId} = useParams();
    const {user} = useContext(AuthContext);

    const handleReply = ()=>{
        let newsComment;
        if(refecenedComment){
          newsComment = {
            newsId:newsId,
            userId:user._id,
            parentCommentId:refecenedComment,
            content:replyContent.current.value,
          }
        }
        else{
          newsComment = {
            newsId:newsId,
            userId:user._id,
            content:replyContent.current.value,
          }
        }
        const sendReply = async (comment)=>{
          try {
            const res = await axios.post(`http://localhost:5000/api/comments/news/${newsId}/${comment.userId}`,comment)
            console.log(res.data)   
            console.log(newsId)     
          } catch (error) {
            console.log(error)
          }
        }
        sendReply(newsComment);
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

export default NewsModal