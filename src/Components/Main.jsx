import React, { useContext } from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import Header from './header/Header';
import News from './News/News';
import InduvidualNews from './InduvidualNews/InduvidualNews';
import Footer from './footer/Footer';
import Slider from './slider/Slider';
import Who from './Who/Who';
import Forum from './Forum/Forum';
import ForumEntry from './ForumEntry/ForumEntry';
import UserProfile from './User Profile/UserProfile';
import Messenger from './Messenger/Messenger';
import Register from './Register/Register';
import Login from './Login/Login';
import { AuthContext } from '../context/AuthContext';
function Main() {
    const {user}  = useContext(AuthContext);
    return(
    <div>
        <Header/>
        <Switch> 
            <Route exact path ="/">
                <Slider/>
                <Who/>
            </Route>
            <Route exact path="/register"> 
                {user ? <Redirect to="/"/>:<Register/>}
            </Route>
            <Route exact path="/login"> 
                {user ? <Redirect to="/"/>:<Login/>}
            </Route>
            <Route exact path = "/news"> 
                <News/>
            </Route>
            <Route exact path = "/profile"> 
                <UserProfile/>
            </Route>
            <Route exact path = "/forum">
                <Forum/>
            </Route>
            <Route path = "/forum/:forumId">
                <ForumEntry/>
            </Route>
            <Route path="/messenger">
                {user ? <Messenger/>:<Redirect to="/"/>}
            </Route>
            <Redirect to="/"/>
        </Switch>
        <Footer/>
    </div>
    );
}
export default Main;

