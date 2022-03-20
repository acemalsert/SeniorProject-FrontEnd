import { useContext, useRef } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const {user,isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    const loginCall= async(email,password)=>{
        try {
            const res = await axios.post('/auth/login',{
                email:email,
                password:password,
            })
            dispatch({type:'ADD_USER',payload:res.data})
        } catch (error) {
            console.log(error)
        }
    }
    loginCall(email.current.value,password.current.value)
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">PREDATOR</h3>
          <span className="loginDesc">
            Dünyanın ilk ve tek oyuncu sosyal platformu!
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Giriş Yap"
              )}
            </button>
           
            <button className="loginRegisterButton">
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Predator'e katıl"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}