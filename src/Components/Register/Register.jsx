import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { isEmail } from "validator";
import {useTranslation} from "react-i18next";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {t} = useTranslation()
  // const validateEmail = (value) => {
  //   if (!isEmail(value)) {
  //     return alert("This is not a valid email.");
  //   } else {
  //     return true;
  //   }
  // };
  const validateUsername = (value) => {
    if (value.length < 3 || value.length > 20) {
      return alert(t("register.username_must"));
    } else {
      return true;
    }
  };
  const validatePassword = (value) => {
    if (value.length < 6 || value.length > 40) {
      return alert(t("register.password_must"));
    } else {
      return true;
    }
  };
  const onsubmit = async (event) => {
    event.preventDefault();
    console.log(username, email, password);
    try {
      const json = JSON.stringify({
        username: username,
        email: email,
        password: password,
        isAdmin: false,
      });
      alert(json);
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          username: username,
          email: email,
          password: password,
          isAdmin: false,
        },
        {
          "Content-Type": "application/json",
        }
      );
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div className="register">
      <div className="container">
        <div className="wrapper">
          <div className="row">
            <div className="col-12 col-md-5">
              <div className="logo-register">
                <h1>PREDATOR</h1>
                <h5>{t("register.gamers_first_choice")}</h5>
              </div>
            </div>
            <div className="col-12 col-md-7">
              <div className="formWrapper">
                <form>
                  <input
                    type="text"
                    name="username"
                    className="form-control mt-2"
                    placeholder="Kullanıcı Adı"
                    onChange={(event) => setUsername(event.target.value)}
                  />
                  <input
                    type="text"
                    name="email"
                    className="form-control mt-2"
                    placeholder="Email"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <input
                    type="password"
                    name="password"
                    className="form-control mt-2"
                    placeholder="Parola"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <button
                    className="btn btn-secondary mt-3"
                    onClick={(e) => {
                      if (
                        validateUsername(username) &&
                        validatePassword(password)
                      ) {
                        onsubmit(e);
                      }
                    }}
                  >
                    {t("register.register")}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
