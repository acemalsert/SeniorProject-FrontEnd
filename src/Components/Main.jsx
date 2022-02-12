import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import Header from './header/Header';
import News from './News/News';
import InduvidualNews from './InduvidualNews/InduvidualNews';
import Footer from './footer/Footer';
import Slider from './slider/Slider';
import Who from './Who/Who';
function Main() {
  return(
    <div>
        <Header/>
        <Switch> 
                <Route exact path ="/">
                    <Slider/>
                    <Who/>
                </Route>
                <Route exact path = "/News"> 
                    <News/>
                </Route>
                <Route exact path="/InduvidualNews">
                    <InduvidualNews/>
                </Route>
                <Redirect to="/"/>
        </Switch>
        <Footer/>
    </div>
    );
}
export default Main;

