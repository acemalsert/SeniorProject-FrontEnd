import React, { useState,useEffect } from "react";
import "./induvidualNews.css";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
import axios from "axios"
import NewsModal from "./NewsModal";


function InduvidualNews() {
  const [recomendednews,setRecomendedNews]  = useState([])
  const [induvidualNews, setInduvidualNews] = useState({});
  const {title} = useParams();
  const [comments,setComments] = useState([]);
  const [refecenedComment,setReferencedComment] = useState(0); 
  const [indicator,setIndicator] = useState(false);
  const [open,setOpen] = useState(false);
  const {newsId} = useParams();

  const getindividualNews = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/news/induvidualNews/${title}`
      );
      console.log(res.data);
      setInduvidualNews(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNewsComments = async ()=>{
    try {
      const res = await axios.get(`http://localhost:5000/api/comments/news/${newsId}/${induvidualNews.userId}`)
      setComments(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleOpen = (commentId) =>{
    setOpen(true);
    setReferencedComment(commentId)
  }
  const handleClose = () =>{
    setOpen(false)
    setReferencedComment(0);
  }
  const fetchNews  = async() => {
    try{
      const res = await axios.get('http://localhost:5000/api/news/getNews')
      setRecomendedNews(res.data) 
      recomendednews = recomendednews.slice(0,3)
    }
    catch{
     // console.log(error)
    }
  }
  
  useEffect(() => {
    getindividualNews();
    fetchNewsComments();
    fetchNews();
  }, []);

  

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
                 <h2>Yorumlar</h2>
                 <div className="mt-2 mb-2">
      <div className='entry-comments'>
              <hr />
              <Comments 
                comments={comments} 
                handleOpen={handleOpen} />
            </div>
           { <NewsModal 
            open={open}
            handleClose={handleClose}
            refecenedComment={refecenedComment}
            indicator={indicator}
            setIndicator={setIndicator}
  /> }
    </div>
                  
                 <div>
                  
                 </div>
               </div>


             </div>
     

      {/* Induvidual News End*/}

      {/* Recomended News*/}
      
      {/* 
      
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
          </div>
        </div>
      
      
      
      */}
     
    
      {/* Recomended News End*/}

      
      </div>
      
  );
}


export default InduvidualNews;
