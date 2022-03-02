import React from 'react';
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
function Main() {
  return(
    <div>
        <Header/>
        <Switch> 
            <Route exact path ="/">
                <Slider/>
                <Who/>
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
            <Redirect to="/"/>
        </Switch>
        <Footer/>
    </div>
    );
}
export default Main;

