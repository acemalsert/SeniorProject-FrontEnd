import React, { useEffect, useRef, useState } from 'react'
import './forumEntry.css';
const EmptyCommentList = ()=>{
    return(
      <div>
          <p>Buraya henüz yorum yapılmamıştır.</p>
      </div>
    )
  }

function Comments({comments}){
    const getParent = (id)=>{
        return comments.find((comment)=>comment._id === id)
    }
    const navigateToTheDiv = (commentId)=>{
        const offset = document.getElementById(commentId).offsetTop;
        window.scrollTo({
            top:offset-100,
            behavior:"smooth"
        })
    }
    if(!comments){
        return(
            <EmptyCommentList/>
        );
    } 
    else{
        return(
            <div className='container'>
                <div className='row'>
                    <div className='col-12 col-md-12'>
                        {comments.map((comment)=>{
                            if(comment.parentCommentId){
                                const parent = getParent(comment.parentCommentId)
                                return(
                                    <React.Fragment key={comment._id}>
                                    <div className='comment' key={comment.userId} onClick={()=>navigateToTheDiv(parent._id)} id={comment._id}>
                                        <div className='row'>
                                            <div className='col-12 col-md-12'>
                                                <div className='referenced'>
                                                    <i className="fa-solid fa-user"></i>
                                                    <small>{parent.userId}</small>
                                                    <p>{parent.content}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-12 col-md-4'>
                                                <div className='commentHeader'>
                                                    <i className="fa-solid fa-user"></i>
                                                    <small>{comment.userId}</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-12 col-md-12'>
                                                <div className='commentMiddle'>
                                                    <p>{comment.content}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-12 col-md-2'>
                                                <div className='CommentForm'> 
                                                    <button className='button-forum'>Yanıt Ver</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </React.Fragment>
                                    );
                            }
                            return(
                                <React.Fragment key={comment._id}>
                                    <div className='comment' key={comment.userId} id={comment._id}>
                                        <div className='row'>
                                            <div className='col-12 col-md-4'>
                                                <div className='commentHeader'>
                                                    <i className="fa-solid fa-user"></i>
                                                    <small>{comment.userId}</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-12 col-md-12'>
                                                <div className='commentMiddle'>
                                                    <p>{comment.content}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-12 col-md-2'>
                                                <div className='CommentForm'> 
                                                    <button className='button-forum'>Yanıt Ver</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                              </React.Fragment>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default Comments