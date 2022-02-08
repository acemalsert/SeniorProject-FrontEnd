import React, { useState } from "react";
import "./induvidualNews.css";

function InduvidualNews() {

  const [singlecomment,setsinglecomment] = useState("")
  
  const commentsArray = [{id:0, commentTime:"5 min ago", commentAuthor:"Gay Onad",commentText:"I am gay please fuck my ass" , imgSource: "https://www.casacenina.com/catalog/images/img_021/packshot/2922/treasure_13056.jpg"},{id:1, commentTime:"10 min ago", commentAuthor:"Transexual Sina",commentText:"I will!!",imgSource : "https://www.casacenina.com/catalog/images/img_021/packshot/2922/treasure_13056.jpg"}]
  
  console.log(commentsArray);
  const handleSubmit = () => {
    commentsArray.push(
      {id:3,commentTime:"6 min ago",commentAuthor:"Last Commenter",commentText:{singlecomment} , imgSource: "https://www.casacenina.com/catalog/images/img_021/packshot/2922/treasure_13056.jpg"}
      )
  }
  return (
    <div className="container">
      {/* Induvidual News Start*/}
     

      <div className="row news-box m-5 ">

        
        <div className="col-12">
        <div className = "news-title"> BattleField5</div>
        <p className = "news-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>

        {/*Induvidual  News Comments Start*/}
        <div className="ınduvidualnews-comments-header">
            <h2 className="text-center">Haber Yorumları</h2>
      </div>
        <div className="row">
          {commentsArray.map((comment) =>
            <div className='comment' key={comment.id}>
                <div className='comment-image-container'>
                  <img src =  {comment.imgSource} alt = "commenter"/>
                </div>
                <div className='comment-right-part'>
                    <div className = "comment-content">
                        <div className='comment-author'>
                          {comment.commentAuthor}
                          {console.log(comment.commentAuthor)}
                        </div>
                        <div>{comment.commentTime}</div>
                        <div className='comment-text'>{comment.commentText}</div>
                    </div>
                </div>
            </div>
            )}
        </div>
         {/*Induvidual Comments End*/}
      </div>

      {/* Induvidual News End*/}

      {/* Recomended News*/}
      <div className="row">
        <h2 className="recommended-news-title">
          Son Paylaşımlar
        </h2>
      </div>
      <div className="row ">
        <div class="card-group w-50">
          <div class="card recommended-news m-3">
            <img
              class="card-img"
              src="https://www.ubuy.com.tr/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvOTFYNzQ0eWoxeEwuX1NMMTUwMF8uanBn.jpg"
              alt="card"
            />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
               
              </p>
              <p class="card-text">
                <small class="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
          <div class="card recommended-news m-3">
            <img class="card-img-top" src="..." alt="card" />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
               
              </p>
              <p class="card-text">
                <small class="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
          <div class="card recommended-news  m-3">
            <img class="card-img-top" src="..." alt="card" />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">
               
              </p>
              <p class="card-text">
                <small class="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Recomended News End*/}

      {/* Comments Section Start */}
      <div className="row comments-section">
        <div className="row ">
        <h2 className="comments">
          Yorumlar
        </h2>
        </div>
        <div className="line"></div>

        <div className="row">
          <div className="col-2">
            <img className = "img" src = "https://www.ubuy.com.tr/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvOTFYNzQ0eWoxeEwuX1NMMTUwMF8uanBn.jpg" alt = "commenter"/>
          </div>

          <div className="col-10">
          <input className="comment-input" placeholder="          Yorum yazın" onChange={(event)=>setsinglecomment (event.target.value)}/>
          </div>

          <div className="row">
            <form >
            <button type="button" class="btn btn-info" onClick={handleSubmit}>Gönder</button>
            </form>
            
          </div>

       

        </div>

      </div>

       {/* Comments Section End */}
    </div>
  );
}

export default InduvidualNews;
