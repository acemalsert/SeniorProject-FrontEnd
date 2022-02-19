import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import forumData from '../../DummyData/ForumData';
import './forumEntry.css';

const EmptyCommentList = ()=>{
  return(
    <div>
        <p>Buraya henüz yorum yapılmamıştır.</p>
    </div>
  )
}
const ShowCommentsForm = ()=>{
  return(
    <div className='postCommentForm'> 
        <button type="button" className="button-forum">Yanıtları göster</button>
    </div>
  )
}
function ForumEntry() {
  const {forumId} = useParams();
  const [entry,setEntry] = useState({});

  useEffect(()=>{
    const forum_enrty = forumData.find((element)=>{
      return element.forumId === Number(forumId);
    })
    setEntry(forum_enrty);
  },[])
  console.log(entry);
  
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12 col-md-12'>
          <div className='forum-entry'>
            <div className='entry-heading'>
              <h3>{entry.title}</h3>
            </div>
            <div className='entry-content'>
              <p>{entry.content}</p>
              <img src={entry.img} alt="" />
            </div>
            <div className='entry-comments'>
              <hr />
              {entry.comments ? entry.comments.map((comment)=>{
                  return(
                    <div className='comment' key={comment.userId}>
                      <div className='commentHeader'>
                        <i className="fa-solid fa-user"></i>
                      </div>
                      <p>{comment.content}</p>
                      <div className='CommentForm'> 
                        <button className='button-forum'>Yanıt Ver</button>
                        {comment.comments ? <ShowCommentsForm/>:console.log("No comment")}
                      </div>
                    </div>
                  )
              }): <EmptyCommentList/>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForumEntry