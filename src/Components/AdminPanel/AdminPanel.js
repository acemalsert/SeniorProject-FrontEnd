import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import {
    Button,
    Card,
    CardTitle,
    CardHeader,
    CardBody,
    Row,
    Col,
    InputGroup,
    InputGroupText,
    Input,
    Table,
  } from "reactstrap";
  import { makeStyles } from "@material-ui/core/styles";

import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
function AdminPanel (){

    const [userList,setUserList] = useState([]);
    const [user,setUser]=useState();

    async function makeAdmin(){
        try{
            console.log("MAKE ADMINNN",selected)
            const response = await axios.post("http://localhost:5000/api/auth/makeAdmin",{username:selected[0]},{
                "Content-type": "application/json",
              })
        }
        catch(error){
            console.log(error)
        }
        
    }
    async function deleteUser(){
        try{
            console.log("DELETE USER",selected)
            const response = await axios.post("http://localhost:5000/api/auth/deleteUser",{username:selected[0]},{
                "Content-type": "application/json",
              })
        }
        catch(error){
            console.log(error)
        }
        
    }
    // const selectRow = (event, row) => {
    //     let newSelected = [row.name];
    //     setSelected(newSelected);
    //   };
    const isSelected = row => selected.indexOf(row.name) !== -1;
    const [selected, setSelected] = React.useState([]);
    let newSelected =""
    const selectFood = (event, user) => {
       newSelected = [user.username];
      setSelected(newSelected);
     
    };
  async function getUsers() {
        const response = await axios.get("http://localhost:5000/api/auth/getUsers")
        console.log("AYY", response);
        const users =[];
        for (var i = 0; i < response.data.length; i++) {
            users.push(response.data[i]);
          }
          setUserList(users)
          console.log("USERS",users);
    }

    useEffect(()=> {
        getUsers();
    },[])

    return (
        <div>
            <Row>
        <Col>
          <Card>
            <CardHeader>Admin Panel</CardHeader>
            <CardBody>
            <Button color="primary" onClick={makeAdmin}>Make Admin</Button>
            <Button color="danger" style={{marginLeft:"5px"}} onClick={deleteUser}>Delete User</Button>
            <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >ID</TableCell>
            <TableCell >Username</TableCell>
            <TableCell >Email</TableCell>
            <TableCell >Age</TableCell>
            <TableCell >Destination</TableCell>
            <TableCell >Phone Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList.map(user => {
            const isItemSelected = isSelected(user);
            return (
              <TableRow
                key={user.username}
                hover
                onClick={event => selectFood(event, user)}
                selected={isItemSelected}
              >
                <TableCell component="th" scope="row">
                  {user._id}
                </TableCell>
                <TableCell >{user.username}</TableCell>
                <TableCell >{user.email}</TableCell>
                <TableCell >{user.age}</TableCell>
                <TableCell >{user.destination}</TableCell>
                <TableCell >{user.phonenumber}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
            
            </CardBody>
          </Card>
        </Col>
      </Row>
        </div>
    );
}
export default AdminPanel;