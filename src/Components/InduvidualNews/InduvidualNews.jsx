import React, { useState,useEffect,useContext } from "react";
import "./induvidualNews.css";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
import axios from "axios"
import NewsModal from "./NewsModal";
import { AuthContext } from '../../context/AuthContext';


function InduvidualNews() {
  const [recomendednews,setRecomendedNews]  = useState([])
  const [induvidualNews, setInduvidualNews] = useState({});
  //const {title} = useParams();
  const [comments,setComments] = useState([]);
  const [refecenedComment,setReferencedComment] = useState(0); 
  const [indicator,setIndicator] = useState(false);
  const [open,setOpen] = useState(false);
  const {newsId} = useParams();
  const {user} = useContext(AuthContext);

  const getindividualNews = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/news/induvidualNews/${newsId}`
      );
      console.log(res.data);
      setInduvidualNews(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  
  const fetchNewsComments = async ()=>{
    try {
      const res = await axios.get(`http://localhost:5000/api/comments/news/${newsId}/${user._id}`)
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
  
  
  useEffect(() => {
    getindividualNews();
    fetchNewsComments();
    
  }, []);

  

  return (
    <div className="container">
      {/* Induvidual News Start*/}
      <div className="row news-box mt-5 ">
               
               <div className="author-section mt-4">
                 <div className="row">
                   <div className="col-8">
                   <img className="author-image" src ={user.img}  />{user.name}</div>
                 
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


      
      </div>
      
  );
}


export default InduvidualNews;
