import "./message.css";


export default function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://www.yenibirsey.net/wp-content/uploads/2017/12/wp-avatar.png"
          alt=""
        />
        <p className="messageText">{message}</p>
      </div>
      <div className="messageBottom">1 hour ago</div>
    </div>
  );
}