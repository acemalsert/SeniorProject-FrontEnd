import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import Header from './header/Header';
<<<<<<< HEAD
import News from './News/News';
import InduvidualNews from './InduvidualNews/InduvidualNews';

function Main() {
  return(
    

    <div>


            <Header/>
                <Switch>
                    
                    <Route exact path ="/">
                        <News/>
                    </Route>
                    <Route exact path = "/News"> 
                        <News/>
                    </Route>
                    <Route exact path="/InduvidualNews">
                        <InduvidualNews/>
                    </Route>
                    <Redirect to="/"/>
                </Switch>
           

          
        </div>
   
=======
import Footer from './footer/Footer';
import Slider from './slider/Slider';
function Main() {
  return(
      <div>
          <Header/>
          <Slider/>
          <Footer/>
      </div>
>>>>>>> e0f7804a42f5dcd570179f503d7fd623ed8304da
  );
}

export default Main;

