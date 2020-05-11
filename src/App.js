import React from 'react';
import Mainpage from './components/mainpage';
import Contactus from './components/contactus';
import Services from './components/services';

import Navbar from './components/navbar';
import Footer from './components/footer';

import Registers from './components/registers';
import Registert from './components/registert';
import Logins from './components/logins';
import Logint from './components/logint';
import Dashboard from './components/dashboard';
import Home from './components/home';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';

function App() {
  return (
    <div className="App">
       <Router>
    <div>
    <Navbar/>
      <Switch>
      <Route exact path="/">
           <Home />
        </Route>
        <Route path="/about">
          <Mainpage />
        </Route>
        <Route path="/Contact">
          <Contactus />
        </Route>
        <Route path="/Pricing">
          <Services/>
        </Route>
        <Route path="/studentDashboard" exact render={() => (<Dashboard/>)}/>
        <Route path="/Registers" render={() => ( <Registers/>)} />  
        <Route path="/Registert" render={() => ( <Registert/>)} />     
        <Route path="/Logins" render={() => ( <Logins/>)} /> 
        <Route path="/Logint" render={() => ( <Logint/>)} />   
      </Switch>
    </div>
    <Footer/>
  </Router>
    </div>
  );
}

export default App;
