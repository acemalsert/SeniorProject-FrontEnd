import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import Comments from './Comments';
import ForumModal from './ForumModal';
import './forumEntry.css';

function ForumEntry() {
  const {forumId} = useParams();
  const [entry,setEntry] = useState({});
  const [comments,setComments] = useState([]);
  const [open,setOpen] = useState(false);
  const [refecenedComment,setReferencedComment] = useState(0); 
  const [indicator,setIndicator] = useState(false);

  const handleOpen = (commentId) =>{
    setOpen(true);
    setReferencedComment(commentId)
  }
  const handleClose = () =>{
    setOpen(false)
    setReferencedComment(0);
  }

  //Re-fetch the comments according to indicator
  useEffect(()=>{
    const fetchForumComments = async ()=>{
      try {
        const res = await axios.get(`/comments/forum/getAll/${forumId}`)
        setComments(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchForumComments()
  },[indicator])
  
  useEffect(()=>{
    const fetchForumEntry =async ()=>{
      try {
        const res = await axios.get(`/forum/getForum/${forumId}`)
        setEntry(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    const fetchForumComments = async ()=>{
      try {
        const res = await axios.get(`/comments/forum/getAll/${forumId}`)
        setComments(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchForumEntry()
    fetchForumComments()
  },[]);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12 col-md-12'>
          <button className='back'><a href="/forum"><i className="fa-solid fa-arrow-left-long"></i></a></button>
          <div className='forum-entry'>
            <div className='entry-heading'>
              <small><i className="fa-solid fa-user"></i></small>
              <small>{entry.userId}</small>
              <h3>{entry.title}</h3>
            </div>
            <div className='entry-content'>
              <p>{entry.content}</p>
              <img src={entry.img} alt="" />
            </div>
            <div className='entry-comments'>
              <hr />
              <Comments 
                comments={comments} 
                handleOpen={handleOpen} />
            </div>
          </div>
          <ForumModal 
            open={open}
            handleClose={handleClose}
            refecenedComment={refecenedComment}
            indicator={indicator}
            setIndicator={setIndicator}
            />
        </div>
      </div>
    </div>
  )
}

export default ForumEntry