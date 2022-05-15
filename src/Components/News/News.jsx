import React from "react";
import { useEffect, useState } from "react";
import {useParams} from 'react-router-dom'
import "./news.css";
import {Link} from 'react-router-dom';
import axios from "axios";


function DisplayComments({newsId}) {
  const [commentsLength,setCommentsLength] = useState("")
  useEffect(()=>{
      const fetchComment = async(newsId)=>{
          try {
              const res = await axios.get(`/comments/news/${newsId}`)
              if(res.data.length <= 0){
                  setCommentsLength("Henüz yorum yok")
                  return
              }
              setCommentsLength(String(res.data.length)+" yorum")
          } catch (error) {
              console.log(error)
          }
      }
      fetchComment(newsId)
  },[])
  return (
      <div><p>{commentsLength}</p></div>
  );
}

function News({newsId}) {


  const [news,setNews]  = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  


  const fetchNews  = async() => {
    try{
      const res = await axios.get('http://localhost:5000/api/news/getNews')
      setNews(res.data)
    }
    catch{
     // console.log(error)
    }
  }

  useEffect(() => {
    fetchNews()
}, []) 
  

 

  return (
    <div className="container ">
     

        
          {/* Search Box Start*/}
          <div className="row ">
           
            <div className="search-box">
              <input
                className="searching-box"
                placeholder="   Search Some News"
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
              />
           
            </div>
          
           
          </div>

          {/* Search Box End*/}
      

        {/* News */}

        {news
          .filter((filtered_news) => {
            if (searchTerm == "") {
              return filtered_news;
            } else if (
              filtered_news.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            ) {
              return filtered_news;
            }
          })
          .map((filtered_news) => (

            <div className="row news-box grow mt-5 ">
               
        <div className ="col-6">
        <img className="news-image"
                    src={filtered_news.img}
                    alt="News Image"
                  />
        </div>
        <div className="col-6">
        <div className="author-section mt-4">
          <div className="row">
            <div className="col-8">
            <img className="author-image" src = "https://www.yenibirsey.net/wp-content/uploads/2017/12/wp-avatar.png"/>Atilla Khan</div>
            
            </div>
           
          
        </div>
        <div className = "news-title"><Link to={`/induvidualNews/${filtered_news._id}`} className = "title-link" > {filtered_news.title}</Link></div>
        <p className = "news-content">{filtered_news.content}</p>
        <div className="divider"> <hr/> </div>
        <div className="row mb-2"> 
       
        <div className="col-4">
            <DisplayComments newsId={filtered_news._id} />
        </div>
        <div className="col-4">
        <i class="fa-solid fa-comment"></i>
        </div>
         </div>
        </div>
      </div>

     
          ))}
     

      {/* News End */}
    </div>
  );
}

export default News;
