import React, { useContext, useEffect, useState } from 'react'
import './forum.css';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

 function DisplayComments({forumId}) {
    const [commentsLength,setCommentsLength] = useState("")
    useEffect(()=>{
        const fetchComment = async(forumId)=>{
            try {
                const res = await axios.get(`/comments/forum/getAll/${forumId}`)
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
    const [search,setSearch] = useState([])
    const {user} = useContext(AuthContext)
    useEffect(()=>{
        const fetchForumEntries = async ()=>{
            try {
                const res = await axios.get('/forum/getForum')
                setForums(res.data);
                setSearch(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchForumEntries()
    },[])
    const handleSearch = (value)=>{
        if(!value){
            setSearch(forums)
            return
        }
        const searchedForums = forums.filter((forumEntry)=>{
            return forumEntry.title.toLowerCase().includes(value)
        })
        setSearch(searchedForums) 
    }
    return (
    <div className='container'>
        <div className='row'>
            <div className='col-12 col-md-12'>
                <div className='search-bar'>
                    <h6>Forum Arama:</h6><hr /> 
                    <i className="fa-solid fa-magnifying-glass" ></i>
                    <input type="text" className='forum-search-field' placeholder='' name='search-field' onChange={(event)=>handleSearch(event.target.value)}/>
                </div>
            </div>
        </div>
        <div className='row'>
            <div className='col-12 col-md-12'>
                <div className='searchWrapper'>
                    <div>
                        <h6>En son Forumlar</h6>
                    </div>
                    <div>
                        <a href="/addForum" className='btn btn-secondary'>Forum Ekle</a>
                    </div>
                </div>
                <hr />
            </div>
        </div>
        <div className='row'>
            {search.map((entry)=>{
                return(
                    <div className='col-12 col-md-4' key={entry._id}>
                        <div className='forum-card'>
                            <div className='forumCard-heading'>
                                <small><i className="fa-solid fa-user"></i></small>
                                <small>{entry.username || entry.userId}</small>
                                <a href={`/forum/${entry._id}`}><h5>{entry.title}</h5></a>
                            </div>
                            <div className='forumCard-content'>
                                <p>{entry.content.substring(0,20)+" ..."}</p>
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