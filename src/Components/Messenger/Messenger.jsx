import "./messenger.css";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";
import Conversation from "../Conversations/Conversation";
import Message from "../Message/Message";
import ChatOnline from "../ChatOnline/ChatOnline";

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
  console.log(user._id);
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
    console.log("recieverId",receiverId)
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
  console.log(user._id);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <> 
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Kullanıcı Arayın..." className="chatMenuInput" />
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
                    Gönder
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Henüz bir mesaj yok...
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <h6>Konuşmalar</h6>
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