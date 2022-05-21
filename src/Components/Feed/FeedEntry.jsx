import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import Comments from '../ForumEntry/Comments';
import './feed.css'
import FeedModal from './FeedModal';
function FeedEntry() {
    const {feedId} = useParams()
    const [entry,setEntry] = useState({});
    const [comments,setComments] = useState([]);
    const [open,setOpen] = useState(false);
    const [refecenedComment,setReferencedComment] = useState(0); 
    const [indicator,setIndicator] = useState(false);
    const {user} = useContext(AuthContext)
    //Re-fetch the comments according to indicator
    useEffect(()=>{
        const fetchForumComments = async ()=>{
        try {
            const res = await axios.get(`/comments/feed/getAll/${feedId}`)
            setComments(res.data)
        } catch (error) {
            console.log(error)
        }
        }
        fetchForumComments()
    },[indicator])
    useEffect(()=>{
        const getFeed = async ()=>{
            try {
                const res = await axios.get(`/feed/getFeed/${feedId}`)
                setEntry(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        const fetchComments = async ()=>{
            try {
                const res = await axios.get(`/comments/feed/getAll/${feedId}`)
                setComments(res.data)
              } catch (error) {
                console.log(error)
              }
        }
        const increaseInteracts = async ()=>{
            try {
                const res = await axios.post(`/feed/increase/${feedId}`,{},{
                    headers:{
                        authorization:user.auth
                    }
                })
              } catch (error) {
                console.log(error)
              }
        }
        increaseInteracts()
        fetchComments()
        getFeed()
    },[])
    const handleOpen = (commentId) =>{
        setOpen(true);
        setReferencedComment(commentId)
      }
      const handleClose = () =>{
        setOpen(false)
        setReferencedComment(0);
      }
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-12 col-md-12'>
                <div className='entryWrapper'>
                    <div className="card" style= {{width:"18 rem;"}}>
                        <div className='card-top'>
                            <i className="fa-solid fa-user-astronaut avatar"></i>
                            <small>{entry.username}</small>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{entry.title}</h5>
                            <p className="card-text">{entry.content}</p>
                        </div>
                        <img className="card-img-top" src={entry.img} alt=""/>
                    </div>
                    <div className='feed-comments'>
                        <hr />
                        <Comments comments={comments} handleOpen={handleOpen}/>
                    </div>
                    <FeedModal
                        open={open}
                        handleClose={handleClose}
                        refecenedComment={refecenedComment}
                        indicator={indicator}
                        setIndicator={setIndicator}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FeedEntry