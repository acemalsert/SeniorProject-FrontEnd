import React, { useContext,useState,useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import './feed.css'
const FeedEntry = ({feedId,content,username,interacts,img,likes,own})=>{
  const [length,setLength] = useState(0)
  const [liked,setLiked] = useState(false);
  const {user} = useContext(AuthContext);
  useEffect(()=>{
    const fetchComments = async ()=>{
      try {
        const res = await axios.get(`/comments/feed/getAll/${feedId}`)
        setLength(res.data.length);
      } catch (error) {
        console.log(error)
      }
    }
    fetchComments()
    own && setLiked(true)
  },[])
  const handleLike = ()=>{
    if(liked || own){
      return;
    }
    const postLike = async()=>{
      try {
        const config = {
          method:"post",
          url:`/feed/like/${feedId}/${user._id}`,
          headers:{
            authorization:user.auth
          }
        }
        const res = await axios(config)
        setLength(res.data.length);
      } catch (error) {
        console.log(error)
      }
    }
    postLike()
    setLiked(true);
    liked.length+=1;
  }
  console.log(own);
  return(
      <div className='col-12 col-md-9'>
        <div className='feed'>
          <div className='feed-header'>
            <i className="fa-solid fa-user-astronaut avatar"></i>
            <small>{username}</small>
          </div>
          <div className='feed-content'>
            <a href={`/Feed/${feedId}`}>{content}</a>
            <img src={img} alt="" />
          </div>
          <div className='feed-bottom'>
            <ul>
              <li className='eye'><i className="fa-solid fa-eye"></i>   {interacts}</li>
              <li className={liked ? "like own":"like"} onClick={handleLike}><i className="fa-solid fa-heart"></i>    {likes.length}</li>
              <li className='comment-feed'><i className="fa-regular fa-comment">    {length}</i></li>
            </ul>
          </div>
      </div>
      </div>
  );
}
function Feed() {
  const [feeds,setFeeds] = useState([])
  const [news,setNews] = useState([])
  const [forums,setForums] = useState([])
  const [tweet,setTweet] = useState("");
  const [img,setImg] = useState("");
  const {user} = useContext(AuthContext)
  useEffect(()=>{
    const fetchFeeds = async()=>{
      try {
        const res = await axios.get("/feed/newest");
        setFeeds(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    const fetchNews = async()=>{
      try {
        const res = await axios.get("/news/getRandom")
        setNews(res.data);
      } catch (error) {
        console.log(error)
      }
    }
    const fetchForums = async ()=>{
      try {
        const res = await axios.get("/forum/getRandom")
        setForums(res.data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchNews()
    fetchFeeds()
    fetchForums()
  },[])
  const handleNew = ()=>{
    const handle = async()=>{
      try {
        const res = await axios.get("/feed/newest");
        setFeeds(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    handle();
  }
  const handlePopular = ()=>{
    const handle = async()=>{
      try {
        const res = await axios.get("/feed/popular");
        setFeeds(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    handle();
  }
  const handleRandom = ()=>{
    const handle = async()=>{
      try {
        const res = await axios.get("/feed/random");
        setFeeds(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    handle()
  }
  const addFeed = ()=>{
    const tweetTw = async()=>{
      try {
        let FeedEntry = {
          userId:user._id,
          username:user.username,
          img:img,
          content:tweet
        }
        const res = await axios.post(`/feed/addFeed/${user._id}`,FeedEntry,{
          headers:{
            authorization:user.auth
          }
        });
        setFeeds([...feeds,res.data])
      } catch (error) {
        console.log(error);
      }
    }
    tweetTw()
  }
  const handleUser = ()=>{
    const handle = async ()=>{
      try {
        const res = await axios.get(`/feed/getUser/${user._id}`)
        setFeeds(res.data);
      } catch (error) {
        console.log(error)
      }
    }
    handle()
  }
  const sendPrex = (e)=>{
    setTweet("")
    setImg("")
    addFeed()
    handleRandom()
  }
  return (
    <div className='feedWrapper'>
      <div className='feedCategories'>
        <ul>
          <li onClick={()=>handleNew()}>En Yeniler</li>
          <li onClick={()=>handlePopular()}><i className="fa-solid fa-fire fires"></i>En Popüler</li>
          <li onClick={()=>handleRandom()}><i className="fa-solid fa-paper-plane kesfet"></i>Keşfet</li>
          <li onClick={()=>{handleUser()}}><i className="fa-solid fa-book my"></i>Benim Prexlerim</li>
          <li><a href="/forum">Forumlar</a></li>
          <li><a href="/haberler">Haberler</a></li>
        </ul>
      </div>
      <div className='mainFeed'>
        {user ? 
        <div className='postFeed'>
          <div className='post-header'>
            <i className="fa-solid fa-user-astronaut avatar"></i>
            <small>{user.username}</small>
          </div>
          <div className='post-content'>
            <input type="text" name="" id="" placeholder='Resimi buraya ekleyebilirsiniz' onChange={(e)=> setImg(e.target.value)}/> 
            <textarea name="content" id="" cols="20" rows="3" placeholder="Aklından neler geçiyor ?" onChange={(e)=>setTweet(e.target.value)}></textarea>
          </div>
          <div className='post-footer'>
            <button className='btn btn-secondary' onClick={sendPrex}>Gönder</button>
          </div>
        </div>
        :null
        }
        <div className='container'>
          <div className='row'>
            {feeds.map((feed)=>{
              return(
                <React.Fragment key={feed._id}>
                  <FeedEntry 
                  feedId={feed._id} 
                  content={feed.content} 
                  username={feed.username}
                  interacts={feed.interacts}
                  img = {feed.img}
                  likes = {feed.likes}
                  own = {feed.likes.find((like)=>like === user._id)}/>
                </React.Fragment>
              )
            })}
          </div>
        </div>
      </div>
      <div className='advisiedWrapper'>
        <div className='advisedNews'>
          <h6>En son Haberler</h6>
          {news.map((news)=>{
            return(
              <div className="card" style= {{width:"18 rem;"}} key = {news._id}>
                <img className="card-img-top" src={news.img} alt=""/>
                <div className="card-body">
                  <h5 className="card-title">{news.title}</h5>
                  <p className="card-text">{news.content.substring(0,40)}...</p>
                  <a href={`/news/${news._id}`} class="btn btn-primary">Git</a>
                </div>
              </div>
            )
          })}
        </div>
        <div className='advisedForums'>
          <h6>En son Forumlar</h6>
          {forums.map((forum)=>{
              return(
                <div className="card" style= {{width:"18 rem;"}} key={forum._id}>
                  <img className="card-img-top" src={forum.img} alt=""/>
                  <div className="card-body">
                    <h5 className="card-title">{forum.title}</h5>
                    <p className="card-text">{forum.content.substring(0,40)}...</p>
                    <a href={`/forum/${forum._id}`} class="btn btn-primary">Git</a>
                  </div>
                </div>
              )
          })}
        </div>
      </div>
    </div>
  )
}

export default Feed