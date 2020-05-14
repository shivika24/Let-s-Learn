import React, { Component } from 'react';
import Mainpage from './components/mainpage';
import Contactus from './components/contactus';
import Services from './components/services';
import TestDashboard from './components/testDashboard.js'
import Mcq from './components/mcq.js';
import TestNavbar from './components/testnavbar.js';
import Sidebar from './components/sideBar.js';
import Navbar from './components/navbar';
import Footer from './components/footer';

import Registers from './components/registers';
import Registert from './components/registert';
import Logins from './components/logins';
import Logint from './components/logint';
import Dashboard from './components/dashboard';
import Tdashboard from './components/tdashboard';
import Home from './components/home';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state={
      flag:true,
      test:[
        // {
        //     ques:"Which of the following can be operands of arithmetic operators?",
        //     choices:["Numeric","Boolean","Character","Both Numeric & Characters"]
        // },
        // {
        //     ques:"Modulus operator, %, can be applied to which of these?",
        //     choices:["Integers","Floating-NUmbers","Both Integers and floating – point numbers","NOT"]
        // },
        // {
        //     ques:"Decrement operator, −−, decreases the value of variable by what number?",
        //     choices:["1","2","3","4"]
        // }
    ]
    }
    this.setTofalse=this.setTofalse.bind(this);
    this.selectMcq=this.selectMcq.bind(this);
    this.clickedMcq=this.clickedMcq.bind(this);
  }
  componentDidMount(){
    fetch(` http://localhost:8082/mcq`, {
      method: "GET",
      headers:{  "Content-Type":"application/json", },
  })
.then(res => {return res.json()})
.then(res => {
      console.log(res);
      var i=0;var obj=[{ques:"",choices:[]}]
      res.map((r)=>{
            obj[i].ques=r.question;
            obj[i].choices.push(r.option1);
            obj[i].choices.push(r.option2)
            obj[i].choices.push(r.option3)
            obj[i].choices.push(r.option4)
            i++;
      })
     this.setState({test:obj})
     console.log(this.state.test)
})
  }
   selectMcq(mcq,i){
    // console.log(event);
    this.setState({selectedMcq:mcq,index:i});
  }
  clickedMcq(i)
  {
    this.setState({selectedMcq:this.state.test[i],index:i})
  }
  setTofalse()
  {
    this.setState({flag:false})
  }
  render(){
  return (
    this.state.flag === true?
    <div className="App">
       <Router>
    <div>
    <Navbar test={this.setTofalse}/>
      <Switch>
      <Route exact path="/">
           <Home/>
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
        <Route path="/studentDashboard"  render={() => (<Dashboard/>)}/>
        <Route path="/teacherDashboard"  render={() => (<Tdashboard/>)}/>
        <Route path="/Registers" render={() => ( <Registers/>)} />  
        <Route path="/Registert" render={() => ( <Registert/>)} />     
        <Route path="/Logins" render={() => ( <Logins/>)} /> 
        <Route path="/Logint" render={() => ( <Logint/>)} />   
      </Switch>
    </div>
    <Footer/>
  </Router>
    </div>:
    <div id="wrapper">
    <Router>
    <Sidebar len={this.state.test.length} selectMCQ={this.clickedMcq}></Sidebar>
    <div id="content-wrapper" class="d-flex flex-column">
    <div id="content">
       <TestNavbar  ></TestNavbar>
       <div class="container-fluid">
       
         <Switch>
         <Route exact path = "/test" render={()=><TestDashboard test={this.state.test} selectMCQ={this.selectMcq}></TestDashboard>}/> 
         <Route path = "/mcq" render={ () => <Mcq mcq={this.state.selectedMcq} len={this.state.test.length} nextMcq={this.clickedMcq} idx={this.state.index}></Mcq>}/>
         </Switch>
      
      </div>
      </div>
      </div>
      </Router> 
  </div>
  )
  }
}

export default App;
