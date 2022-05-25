import "./UserProfile.css";
import { Container, Row, Col, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, TextField, Card, CardHeader, Slider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import profilePicture from "../../assets/profilepicture.png";
import React, { useState, useEffect, useRef } from "react";
import {useTranslation} from "react-i18next"

function PasswordTab() {
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [newPassword,setNewPassword]=useState("");
  const {t} = useTranslation();

  async function getUserCredentials(){
    try{
      let username = localStorage.getItem("username");
      
      username= username.replace(/['"]+/g, '');

      const userCredentials = await axios.post("http://localhost:5000/api/auth/getUserCredentials",{username:username},{
        "Content-type": "application/json",
      })
      console.log("BARTU",userCredentials)
      return userCredentials;
    }
    catch(error){
      console.log(error);
    }
      
  }
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      
      console.log("NEW PASSWORD",newPassword)
      const res = await axios.post(
        "http://localhost:5000/api/auth/changePassword",
        {
          username: username,
          password: password,
          newpassword:newPassword

        },
        {
          "Content-type": "application/json",
        }
      ).then(console.log("BARTU"));

      
    } catch (error) {
      console.log(error);
      alert("BARTU", error);
    }
  };
  
    
  


  useEffect(async ()=> {
    const userInfo = await  getUserCredentials();
    console.log(userInfo.data.password);
    setUsername(userInfo.data.username);
    setPassword(userInfo.data.password);
    
  },[])

  return (
    <div style={{ marginTop: "5%" }}>
      <h2 style={{ marginTop: "5%", marginLeft: "1%" }}>{t("password_tab.password_settings")}</h2>
      <Card>
        <Row>
          <Form.Label
            htmlFor="inputPassword5"
            style={{ marginTop: "2%", marginLeft: "1%" }}
            
          >
            {t("password_tab.current_password")}
          </Form.Label>

          <Form.Control
            type="password"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
            style={{ width: "95%", marginLeft: "3%", marginRight: "3%" }}
            value={password}
            onChange={setPassword}
          />
          <Form.Label
            htmlFor="inputPassword5"
            style={{ marginTop: "2%", marginLeft: "1%" }}
          >
            {t("password_tab.new_password")}
          </Form.Label>

          <Form.Control
            type="password"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
            style={{ width: "95%", marginLeft: "3%", marginRight: "3%" }}
            value={newPassword}
            onChange={(e=>setNewPassword(e.target.value))}
          />
          <Form.Text
            id="passwordHelpBlock"
            style={{ marginTop: "2%", marginLeft: "1%" }}
            muted
          >
            {t("password_tab.password_must")}
          </Form.Text>
          <Row>
            <Col>
              <Button
                variant="contained"
                style={{
                  marginBottom: "5%",
                  marginTop: "2%",
                  marginLeft: "1%",
                }}
                onClick={(e) => onSubmit(e)}
              >
                {t("password_tab.save_changes")}
              </Button>
            </Col>
          </Row>
        </Row>
      </Card>
    </div>
  );
}
export default PasswordTab;
