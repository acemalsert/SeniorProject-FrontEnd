import React, { useState,useEffect } from "react";
import "./induvidualNews.css";
import { useParams } from "react-router-dom";
import axios from "axios"

function InduvidualNews() {
  const [singlecomment, setsinglecomment] = useState(["first comment"]);
  const [induvidualNews, setInduvidualNews] = useState({});
  const {title} = useParams();

  const getindividualNews = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/news/induvidualNews/${title}`
      );
      console.log(res.data);
      setInduvidualNews(res.data);
    } catch (error) {
      console.log(error);
    }asd
  };
  
  useEffect(() => {
    getindividualNews();
  }, []);

  const handleSubmit = (event) => {
   
  };

  return (
    <div className="container">
      {/* Induvidual News Start*/}
      <div className="row news-box mt-5 ">
               
               <div className="author-section mt-4">
                 <div className="row">
                   <div className="col-8">
                   <img className="author-image" src = "https://www.yenibirsey.net/wp-content/uploads/2017/12/wp-avatar.png"/>Atilla Khan</div>
                 
               </div>
               <div className = "news-title"> {induvidualNews.title}</div>
               <p className = "news-content"> {induvidualNews.content} </p>
               <div className="divider"> <hr/> </div>
               <div className="row mb-2"> 
               
              
                </div>
               </div>

               <div className="comments-header ml-4">
                 <h2>Comments</h2>
                 {induvidualNews.map = (news) => (
                   <div className = "comment-header">
                    
                   </div>
                 )}
                 <div>

                 </div>
               </div>


             </div>
     

      {/* Induvidual News End*/}

      {/* Recomended News*/}
      <div className="row">
        <h2 className="recommended-news-title">Son Paylaşımlar</h2>
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
              <p class="card-text"></p>
              <p class="card-text">
                <small class="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
          <div class="card recommended-news m-3">
            <img class="card-img-top" src="..." alt="card" />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text"></p>
              <p class="card-text">
                <small class="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
          <div class="card recommended-news  m-3">
            <img class="card-img-top" src="..." alt="card" />
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text"></p>
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
          <h2 className="comments">Yorumlar</h2>
        </div>
        <hr></hr>

        <div className="row">
          <div className="col-2">
            <img
              className="img"
              src="https://www.ubuy.com.tr/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvOTFYNzQ0eWoxeEwuX1NMMTUwMF8uanBn.jpg"
              alt="commenter"
            />
          </div>

          <div className="col-10">
            <input
              className="comment-input"
              placeholder="          Yorum yazın"
              onChange={(event) => setsinglecomment(event.target.value)}
            />
          </div>

          <div className="row">
            <form>
              <button type="button" class="btn btn-info" onClick={handleSubmit}>
                Gönder
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Comments Section End */}
    </div>
  );
}

export default InduvidualNews;
