import "./UserProfile.css";
import { Container, Row, Col, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, TextField, Card, CardHeader, Slider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../../context/AuthContext";
import profilePicture from "../../assets/profilepicture.png";
import userList from "./userList.json";
import React, { useState, useEffect, useRef,useContext } from "react";

function AccountTab() {
  const [value, setValue] = useState(30);
  const {user} = useContext(AuthContext);
  function valuetext(value) {
    return `${value}°C`;
  }
  const useStyles = makeStyles({
    root: {
      width: 300,
    },
  });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [inputs, setInputs] = useState({
    name: "Ege Bartu Kurtaran",
    age: 24,
    destination: "Ankara",
    phoneNumber: "+905398500244",
    email: "egebartuk@gmail.com",
  });

  return (
    <div>
      <Container>
        <h2 style={{ marginTop: "5%" }}>Account Settings </h2>
        <Row>
          <Col>
            <Card style={{}}>
              <Container>
                <Row style={{ marginBottom: "2%", marginTop: "5%" }}>
                  <Col>
                    Name Surmame:{" "}
                    <Form.Control
                      name="name"
                      onChange={setInputs}
                      value={user.username}
                      size="sm"
                      type="text"
                      placeholder="Name"
                    />
                  </Col>
                </Row>
                <Row style={{ marginBottom: "2%" }}>
                  <Col>
                    Age:
                    <Slider
                      name="age"
                      defaultValue={18}
                      getAriaValueText={valuetext}
                      aria-labelledby="discrete-slider-small-steps"
                      step={1}
                      marks
                      min={0}
                      max={100}
                      valueLabelDisplay="auto"
                      onChange={setInputs}
                      value={inputs.age}
                    />
                  </Col>
                </Row>
                <Row style={{ marginBottom: "2%" }}>
                  <Col>
                    Destination:{" "}
                    <Form.Control
                      name="destination"
                      onChange={setInputs}
                      value={inputs.destination}
                      size="sm"
                      type="text"
                      placeholder="City"
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
                      onChange={setInputs}
                      value={inputs.phoneNumber}
                    />{" "}
                  </Col>
                </Row>
                <Row style={{ marginBottom: "2%" }}>
                  <Col>
                    E-Mail:{" "}
                    <Form.Control
                      name="email"
                      size="sm"
                      type="text"
                      placeholder="E-Mail Address"
                      onChange={setInputs}
                      value={inputs.email}
                    />{" "}
                  </Col>
                </Row>
                <Row>
                  <Button
                    variant="contained"
                    style={{ marginBottom: "2%" }}
                    onClick={userList.userList.push(inputs)}
                  >
                    SAVE CHANGES
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
