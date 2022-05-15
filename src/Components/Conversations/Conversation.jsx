import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./conversation.css"

function Conversation({otherUser}) {
    const [username,setUsername] = useState("")
    useEffect(()=>{
        const getUser = async (userId)=>{
            try {
                const res = await axios(`/users/getUser/${userId}`);
                setUsername(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getUser(otherUser);
    },[])
    return (
        <div className='container'>
            <div className='conversation'>
                <img className="conversationImg" src="https://www.yenibirsey.net/wp-content/uploads/2017/12/wp-avatar.png" alt=""/>
                <span className="conversationName">{username}</span>
            </div>
        </div>
    )
}

export default Conversation
