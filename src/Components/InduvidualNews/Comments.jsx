import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import './comments.css';
import {useTranslation} from "react-i18next";
const EmptyCommentList = ({user,handleOpen})=>{
    const {t} = useTranslation();
    return(
      <div>
          <p>{t("comments.no_comments_yet")}</p>
          {user 
            ? 
            <button className='button-forum' onClick={()=>handleOpen()}>{t("comments.add_first_comment")}</button>
            :<p>{t("comments.login_to_add_comment")}</p>}
            
      </div>
    )
  }

function Comments({comments,handleOpen}){
    const {user} = useContext(AuthContext);
    const {t} = useTranslation();
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
    if(comments.length === 0){
        return(
            <EmptyCommentList user={user} handleOpen={handleOpen}/>
        );
    } 
    else{
        return(
            <div className='container'>
                <div className='row'>
                    <div className='container mt-1 mb-1'>
                        <div className='row'>
                            <div className='col-12 col-md-12'>
                                <button className='button-forum' onClick={()=>handleOpen()}>{t("comments.add_Comment")}</button>
                                <hr />
                            </div>
                        </div>
                    </div>
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
                                                    {user 
                                                    ? 
                                                    <button className='button-forum' onClick={()=>handleOpen(comment._id)}>{t("comments.reply")}</button>
                                                    :<p>{t("comments.login_to_add_comment")}</p>}
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
                                                    <button className='button-forum' onClick={()=>handleOpen(comment._id)}>Yanıt Ver</button>
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