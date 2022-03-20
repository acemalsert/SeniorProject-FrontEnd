import React from 'react'
import Conversation from '../Conversations/Conversation'
import "./messenger.css"
import Message from '../Message/Message'
import ChatOnline from '../ChatOnline/ChatOnline'

function Messenger() {
  return (
    <div className='messenger'>
        <div className='chatMenu'>
            <div className='chatMenuWrapper'>
                <div className='search-bar'>
                    <i className="fa-solid fa-magnifying-glass" ></i>
                    <input placeholder='Kullanıcı ara' className='form-control'/>
                </div>
                <Conversation/>
            </div>
        </div>
        <div className='chatBox'>
            <div className='chatBoxWrapper'>
                <div className='chatBoxTop'>
                    <Message own= {true}/>
                    <Message own= {true}/>
                    <Message own= {false}/>
                </div>
                <div className='chatBoxBottom'>
                    <textarea className='chatMessageInput' placeholder='write something'/>
                    <button className='chatSubmitButton'>Send</button>
                </div>
            </div>
        </div>
        <div className='chatOnline'>
            <div className='chatOnlineWrapper'>
                <ChatOnline/>
            </div>
        </div>
    </div>
  )
}

export default Messenger