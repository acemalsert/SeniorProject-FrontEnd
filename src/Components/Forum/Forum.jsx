import React from 'react'
import forumData from '../../DummyData/ForumData';
import './forum.css';
function Forum() {
  return (
    <div className='container'>
        <div className='row'>
            {forumData.map((entry)=>{
                return(
                    <div className='col-12 col-md-4' key={entry.forumId}>
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
                                <p>{entry.comments.length} Yorum</p>
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