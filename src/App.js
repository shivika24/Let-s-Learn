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
import Profile from './components/profile';
import Registers from './components/registers';
import Registert from './components/registert';
import Logins from './components/logins';
import Logint from './components/logint';
import Dashboard from './components/dashboard';
import Tdashboard from './components/tdashboard';
import Home from './components/home';
import Calender from './components/calender';
import Testhistory from './components/testhistory';
import ViewTeachTest from './components/viewTeachtest';
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
      history:[],
      viewTestArr:[],
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
    this.sethistory=this.sethistory.bind(this);
    this.showTest=this.showTest.bind(this);
  }
  componentDidMount(){
   // var temp:[]
    fetch(` http://localhost:8082/mcq`, {
      method: "GET",
      headers:{  "Content-Type":"application/json" },
  })
.then(res => {return res.json();})
.then(res => {
      console.log(res);
      var temp=[]
      
      res.map((r)=>{
        var obj={ques:"",choices:[]}
            obj.ques=r.question;
            obj.choices.push(r.option1);
            obj.choices.push(r.option2)
            obj.choices.push(r.option3)
            obj.choices.push(r.option4)
            temp.push(obj);
      })
     this.setState({test:temp})
     console.log(this.state.test)
})
fetch(` http://localhost:8082/prevTot?temail=${JSON.parse(localStorage.getItem("jwt")).user.id}`, {
  method: "GET",
  headers:{  "Content-Type":"application/json" },
})
.then(res => {return res.json();})
.then(res => {
  console.log(res.code);
 this.setState({prevTot:res.code})
 console.log(this.state.prevTot)
})
  }
  showTest(tid)
  {
  console.log(tid)
  const user={
    testid:tid
  }
  fetch("http://localhost:8082/testdetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
      })
    .then(res=> res.json())
      .then(res => {
       // console.log(JSON.stringify(res));
        this.setState({viewTestArr:res,prevTot:res.length})
      })
  }
  sethistory(hist)
  {
    this.setState({history:hist});
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
        <Route path="/teacherDashboard"  render={() => (<Tdashboard setHist={this.sethistory} tot={this.state.prevTot}/>)}/>
        <Route path="/Registers" render={() => ( <Registers/>)} />  
        <Route path="/Registert" render={() => ( <Registert/>)} />     
        <Route path="/Logins" render={() => ( <Logins/>)} /> 
        <Route path="/Logint" render={() => ( <Logint/>)} />   
        <Route path="/profile" render={() => ( <Profile/>)} /> 
        <Route path="/calender" render={() => ( <Calender/>)} /> 
        <Route path="/testhistory" render={() => ( <Testhistory prevTest={this.state.history} showT={this.showTest}/>)} /> 
        <Route path='/viewteachtest' render={()=><ViewTeachTest prevTest={this.state.viewTestArr}></ViewTeachTest>}></Route>
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
