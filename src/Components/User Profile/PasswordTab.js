import "./UserProfile.css";
import { Container, Row, Col, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, TextField, Card, CardHeader, Slider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import profilePicture from "../../assets/profilepicture.png";
import React, { useState, useEffect, useRef } from "react";

function PasswordTab() {
  return (
    <div style={{ marginTop: "5%" }}>
      <h2 style={{ marginTop: "5%", marginLeft: "1%" }}>Password Settings </h2>
      <Card>
        <Row>
          <Form.Label
            htmlFor="inputPassword5"
            style={{ marginTop: "2%", marginLeft: "1%" }}
          >
            Current Password
          </Form.Label>

          <Form.Control
            type="password"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
            style={{ width: "95%", marginLeft: "3%", marginRight: "3%" }}
          />
          <Form.Label
            htmlFor="inputPassword5"
            style={{ marginTop: "2%", marginLeft: "1%" }}
          >
            New Password
          </Form.Label>

          <Form.Control
            type="password"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
            style={{ width: "95%", marginLeft: "3%", marginRight: "3%" }}
          />
          <Form.Text
            id="passwordHelpBlock"
            style={{ marginTop: "2%", marginLeft: "1%" }}
            muted
          >
            Your password must be 8-20 characters long, contain letters and
            numbers, and must not contain spaces, special characters, or emoji.
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
              >
                SAVE CHANGES
              </Button>
            </Col>
          </Row>
        </Row>
      </Card>
    </div>
  );
}
export default PasswordTab;
