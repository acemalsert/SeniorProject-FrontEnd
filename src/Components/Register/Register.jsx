import React, { useState } from "react";
import "./register.css";
import axios from "axios";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onsubmit = async () => {
    console.log(username, email, password);
    try {
      const json = JSON.stringify({
        username: username,
        email: email,
        password: password,
        roles: ["user"],
      });
      console.log(json);
      const res = await axios.post(
        "http://localhost:8080/api/auth/signup",
        {
          username: username,
          email: email,
          password: password,
          roles: ["user"],
        },
        {
          "Content-Type": "application/json",
        }
      );
      alert("burada");
    } catch (error) {
      console.log(error);
      alert("burada");
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
                <h5>Oyuncuların Bir Numaralı Tercihi</h5>
              </div>
            </div>
            <div className="col-12 col-md-7">
              <div className="formWrapper">
                <form>
                  <input
                    type="text"
                    name="username"
                    id=""
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
                    onClick={(e) => onsubmit()}
                  >
                    Üye Ol
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
