import { useContext, useRef, useState } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import axios from "axios";

export default function Login() {
  // const email = useRef();
  // const password = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, isFetching, dispatch } = useContext(AuthContext);
  const API_URL = "http://localhost:8080/api/auth/";
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
  // const login = async (username, password) => {
  //   alert("BURADA");
  //   return await axios
  //     .post(API_URL + "signin", {
  //       username,
  //       password,
  //     })
  //     .then((response) => {

  //       if (response.data.accessToken) {
  //         localStorage.setItem("user", JSON.stringify(response.data));
  //         alert(localStorage.getItem);
  //       }
  //       return response.data;
  //     });
  // };

  const onsubmit = async (event) => {
    event.preventDefault();
    try {
      const json = {
        username: username,
        password: password,
      };

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username: username,
          password: password,
        },
        {
          "Content-type": "application/json",
        }
      );

      if (res.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("username",JSON.stringify(res.data.username))
        dispatch({ type: "ADD_USER", payload: res.data });
        alert("EGE", localStorage.getItem);
      }
    } catch (error) {
      console.log(error);
      alert("BARTU", error);
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
              onChange={(event) => setUsername(event.target.value)}
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
              onClick={(e) => onsubmit(e)}
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
