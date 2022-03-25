import React from 'react'
import "./conversation.css"

function Conversation({otherUser}) {
    return (
        <div className='container'>
            <div className='conversation'>
                <img className="conversationImg" src="https://www.yenibirsey.net/wp-content/uploads/2017/12/wp-avatar.png" alt=""/>
                <span className="conversationName">{otherUser}</span>
            </div>
        </div>
    )
}

export default Conversation
