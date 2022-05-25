import "./UserProfile.css";
import { Container, Row, Col, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, TextField, Card, CardHeader, Slider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../../context/AuthContext";
import profilePicture from "../../assets/profilepicture.png";
import userList from "./userList.json";
import React, { useState, useEffect, useRef,useContext } from "react";
import axios from 'axios';
import { useTranslation } from 'react-i18next';

function AccountTab() {
  
  const { user, isFetching, dispatch } = useContext(AuthContext);
  const [username,setUsername] =useState("");
  const [age, setAge] = useState();
  const [email,setEmail]=useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [destination,setDestination] = useState("");
  const {t} = useTranslation();

  function valuetext(value) {
    return `${value}°C`;
  }
  
  const [userCredentials,setUserCredentials] = useState({
    username: username,
    email: email
  });
  async function getUserCredentials(){
    try{
      let username = localStorage.getItem("username");
      
      username= username.replace(/['"]+/g, '');

      const userCredentials = await axios.post("http://localhost:5000/api/auth/getUserCredentials",{username:username},{
        "Content-type": "application/json",
      })
      console.log("BARTU",userCredentials.data)
      return userCredentials;
    }
    catch(error){
      console.log(error);
    }
      
  }

  const handleChange = (event, newValue) => {
    setAge(newValue);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser=JSON.parse(localStorage.getItem("user"));
const id=newUser.id
        const res = await axios.post(
        "http://localhost:5000/api/auth/changeUserCredentials",
        {
          id:id,
          username: localStorage.getItem("username").replace(/['"]+/g, ''),
          newusername:username,
          newemail:email,
          newage:age,
          newdestination:destination,
          newphonenumber:phonenumber
        },
        {
          "Content-type": "application/json",
        }
      ).then(localStorage.setItem("username",JSON.stringify(username)));
      
      if(res.status===200){
        console.log(newUser.username)
        newUser.username=username;
        localStorage.setItem("user",JSON.stringify(newUser));
        dispatch({ type: "ADD_USER", payload: newUser});
      
      }
      
      
    } catch (error) {
      console.log(error);
      
    }
  };
    
  

  useEffect(async() => {
    const userInfo = await  getUserCredentials();
    console.log(userInfo.data.age)
    setAge(userInfo.data.age);
    console.log("YAŞŞŞ ",age)
    setUsername(userInfo.data.username);
    setEmail(userInfo.data.email);
    setDestination(userInfo.data.destination);
    setPhoneNumber(userInfo.data.phonenumber);
    
    
  }, []);

  return (
    <div>
      <Container>
        <h2 style={{ marginTop: "5%" }}>{t("account_tab.account_settings")}</h2>
        <Row>
          <Col>
            <Card style={{}}>
              <Container>
                <Row style={{ marginBottom: "2%", marginTop: "5%" }}>
                  <Col>
                    {t("account_tab.username")}:
                    <Form.Control
                      name="name"
                      onChange={(e=>setUsername(e.target.value))}
                      value={username}
                      size="sm"
                      type="text"
                      placeholder="Username"
                    />
                  </Col>
                </Row>
                <Row style={{ marginBottom: "2%" }}>
                  <Col>
                  {t("account_tab.age")}:
                    <Slider
                      name="age"
                      defaultValue={age}
                      getAriaValueText={valuetext}
                      aria-labelledby="discrete-slider-small-steps"
                      step={1}
                      marks
                      min={0}
                      max={100}
                      valueLabelDisplay="auto"
                      onChange={handleChange}
                      
                      
                    />
                  </Col>
                </Row>
                <Row style={{ marginBottom: "2%" }}>
                  <Col>
                  {t("account_tab.destination")}:{" "}
                    <Form.Control
                      name="destination"
                      size="sm"
                      type="text"
                      placeholder="City"
                      onChange={(e=>setDestination(e.target.value))}
                      value={destination}
                    />{" "}
                  </Col>
                </Row>
                <Row style={{ marginBottom: "2%" }}>
                  <Col>
                    Phone Number:{" "}
                    <Form.Control
                      name="phoneNumber"
                      size="sm"
                      type="text"
                      placeholder="Phone Number"
                      onChange={(e=>setPhoneNumber(e.target.value))}
                      value={phonenumber}
                    />{" "}
                  </Col>
                </Row>
                <Row style={{ marginBottom: "2%" }}>
                  <Col>
                  {t("account_tab.email")}:{" "}
                    <Form.Control
                      name="email"
                      size="sm"
                      type="text"
                      placeholder="E-Mail Address"
                      onChange={(e=>setEmail(e.target.value))}
                      value={email}
                    />{" "}
                  </Col>
                </Row>
                <Row>
                  <Button
                    variant="contained"
                    style={{ marginBottom: "2%" }}
                    onClick={(e) => onSubmit(e)}
                  >
                    {t("account_tab.save_changes")}
                  </Button>
                </Row>
              </Container>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default AccountTab;
