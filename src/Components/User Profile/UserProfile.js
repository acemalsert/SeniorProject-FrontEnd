import "./UserProfile.css";
import { Container, Row, Col, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, TextField, Card, CardHeader, Slider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import profilePicture from "../../assets/profilepicture.png";
import React, { useState, useEffect, useRef, useContext } from "react";
import AccountTab from "./AccountTab";
import PasswordTab from "./PasswordTab";
import { AuthContext } from "../../context/AuthContext";
import { useTranslation } from 'react-i18next';

function UserProfile() {
  const [activeTab, setActiveTab] = useState("tab1");
  const {user} = useContext(AuthContext);
  const {t} = useTranslation();
  const handleTab1 = () => {
    // update the state to tab1
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    // update the state to tab2
    setActiveTab("tab2");
  };

  return (
    <React.Fragment>
      <Container className="profile">
        <Row style={{ marginTop: "80px" }}>
          <Col className="column1" lg={3}>
            <div className="card-header">
              <img
                className="profile-picture"
                alt="..."
                src={profilePicture}
                style={{
                  borderRadius: "50%",
                  margin: "0",
                  width: "100%",
                  height: "100%",
                  display: "block",
                }}
              />
            </div>
            <div style={{ marginTop: 30 }}>
              <div className="button-card">
                <Button
                  className="Account"
                  color="#ffffff"
                  onClick={handleTab1}
                >
                  {t("user_profile.account")}
                </Button>
              </div>
              <div className="button-card">
                <Button
                  className="Password"
                  color="ffffff"
                  onClick={handleTab2}
                >
                  {t("user_profile.password")}
                </Button>
              </div>
            </div>
          </Col>
          <Col className="column2" lg={8}>
            {activeTab === "tab1" ? <AccountTab /> : <PasswordTab />}
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default UserProfile;
