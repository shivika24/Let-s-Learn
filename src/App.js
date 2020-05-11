import React from 'react';
import Mainpage from './components/mainpage';
import Contactus from './components/contactus';
import Services from './components/services';

import Navbar from './components/navbar';
import Footer from './components/footer';

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
        <Route path="/about">
          <Mainpage />
        </Route>
        <Route path="/Contact">
          <Contactus />
        </Route>
        <Route path="/Pricing">
          <Services/>
        </Route>
      </Switch>
    </div>
    <Footer/>
  </Router>
    </div>
  );
}

export default App;
