import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import Header from './header/Header';
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
   
  );
}

export default Main;

