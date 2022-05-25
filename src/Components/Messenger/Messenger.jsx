import "./messenger.css";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";
import Conversation from "../Conversations/Conversation";
import Message from "../Message/Message";
import ChatOnline from "../ChatOnline/ChatOnline";
import {useTranslation} from "react-i18next";
export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();
  const [search,setSearch] = useState([])
  const {t} = useTranslation();
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);
  useEffect(() => {
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
    setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
     socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
      console.log(users);
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);
  const searchUser = async(regex)=>{
    if(regex === ""){
      setSearch([])
      return
    }
    try {
      const res = await axios.get(`/users/?username=${regex}`)
      setSearch(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  const appendConv = async(rid)=>{
    console.log({senderId:user._id,recieverId:rid});
    try {
      const res = await axios.post("/conversations/",{senderId:user._id,recieverId:rid})
      setConversations([...conversations,res.data])
      setCurrentChat(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      conversationId: currentChat._id,
      senderId: user._id,
      text: newMessage,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId:receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <> 
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input type="text" placeholder="Kullanıcı Arayın..." className="chatMenuInput" onChange={(e)=>searchUser(e.target.value)}/>
            {search ? search.map((user)=>{
                        return(
                          <div onClick={(e)=>appendConv(user._id)} key={user._id} className="userWrapper">
                            <img className="conversationImg" src="https://www.yenibirsey.net/wp-content/uploads/2017/12/wp-avatar.png" alt=""/>
                            <h6>{user.username}</h6>
                          </div>
                       )
                      }):""}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) =>{
                    console.log(m.senderId)
                    return(
                      <div ref={scrollRef}>
                        <Message message={m.text} own={m.senderId === user._id} />
                      </div>
                    )
                  })}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="Bir yorum yazın..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    {t("messenger.send")}
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                {t("messenger.any_message_yet")}
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <h6>{t("messenger.conversations")}</h6>
            <hr />
          {conversations.map((c) => {
            return(
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} otherUser = {c.members.find((member)=>member !== user._id)} />
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </>
  );
}