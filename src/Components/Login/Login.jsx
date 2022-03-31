import { useContext, useRef, useState } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";

export default function Login() {
  // const email = useRef();
  // const password = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, isFetching, dispatch } = useContext(AuthContext);

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   const loginCall = async (email, password) => {
  //     try {
  //       const res = await axios.post("/auth/login", {
  //         email: email,
  //         password: password,
  //       });
  //       dispatch({ type: "ADD_USER", payload: res.data });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   loginCall(email.current.value, password.current.value);
  // };

  const onsubmit = async () => {
    console.log(username, password);
    try {
      const json = JSON.stringify({
        username: username,
        password: password,
      });
      console.log(json);
      const res = await axios.post(
        "http://localhost:8080/api/auth/signin",
        {
          username: username,
          password: password,
        },
        {
          "Content-Type": "application/json",
        }
      );
      alert(res);
    } catch (error) {
      console.log(error);
    }
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
          <form className="loginBox">
            <input
              placeholder="username"
              type="username"
              required
              className="loginInput"
              onChange={(event) => setPassword(event.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              className="loginButton"
              type="submit"
              disabled={isFetching}
              onClick={(e) => onsubmit()}
            >
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
