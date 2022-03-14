import React, { useEffect, useState } from 'react'
import forumData from '../../DummyData/ForumData';
import './forum.css';
import axios from 'axios';

 function DisplayComments({forumId}) {
    const [commentsLength,setCommentsLength] = useState("")
    useEffect(()=>{
        const fetchComment = async(forumId)=>{
            try {
                const res = await axios.get(`/comments/forum/${forumId}`)
                if(res.data.length <= 0){
                    setCommentsLength("Henüz yorum yok")
                    return
                }
                setCommentsLength(String(res.data.length)+" yorum")
            } catch (error) {
                console.log(error)
            }
        }
        fetchComment(forumId)
    },[])
    return (
        <div><p>{commentsLength}</p></div>
    );
}

function Forum() {
    const [forums,setForums] = useState([])
    useEffect(()=>{
        const fetchForumEntries = async ()=>{
            try {
                const res = await axios.get('/forum/getForum')
                setForums(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchForumEntries()
    },[])
    return (
    <div className='container'>
        <div className='row'>
            {forums.map((entry)=>{
                return(
                    <div className='col-12 col-md-4' key={entry._id}>
                        <div className='forum-card'>
                            <div className='forumCard-heading'>
                                <small><i className="fa-solid fa-user"></i></small>
                                <a href={`/forum/${entry.forumId}`}><h5>{entry.title}</h5></a>
                            </div>
                            <div className='forumCard-content'>
                                <p>{entry.content}</p>
                                <img src = {entry.img} alt="" />
                            </div>
                            <div className='forumCard-footer'>
                                <hr />
                                <DisplayComments forumId={entry._id}/>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
    );
}

export default Forum