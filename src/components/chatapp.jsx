import React, { Component, PropTypes ,useState } from "react";
import "./chatapp.css";
import EmojiButton from "@joeattardi/emoji-button";
import Message from './message'

class Chatapp extends Component {
  state = {
    user: "Wellcome to Chat area",
    msg: "", //your message value
    reciveremail: "",
    senderemail: "",
    arr:[],
    sendornot:true
  };
  constructor() {
    super();
    this.mymsgsend = this.mymsgsend.bind(this);
    this.searhboxmail = this.searhboxmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.historyuser()
    
  }
  componentDidMount(){
    this.historyuser();
  }
  passmsg = (email1 = 0) => {
    this.setState({ reciveremail: email1 });
    this.setState({ senderemail: JSON.parse(localStorage.getItem("jwt")).user.id,})
  };
  

  mymsgsend(event) {
    this.setState({ msg: event.target.value });
  }
  searhboxmail(event) {
    
    // console.log(this.state.reciveremail);
    if(document.getElementById("searchinp").value=="")
    this.historyuser();
    else
    {
      const user={
      email:this.state.reciveremail,
      e1:JSON.parse(localStorage.getItem("jwt")).user.id,
      type:JSON.parse(localStorage.getItem("jwt")).user.type
    }
    fetch("http://localhost:8082/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
      })
    .then(res=> res.json())
      .then(res => {
         console.log(res.code)
        var temp=[];
        for(var i=0;i<res.code.length;i++)
        {
        if(JSON.parse(localStorage.getItem("jwt")).user.type=="teacher")
        {
        temp.push(res.code[i].semail);
        }
        else
        {
        temp.push(res.code[i].temail);
        }
        }
        this.setState({arr:temp})
        if(this.arr==null)
    {
      console.log(this.state.arr)
      // this.historyuser();
    }
      })
    this.setState({ reciveremail: event.target.value });
    
    }
  }

  historyuser=(event)=> {
    const user={
      email:'',
      e1:JSON.parse(localStorage.getItem("jwt")).user.id,
      type:JSON.parse(localStorage.getItem("jwt")).user.type
    }
    fetch("http://localhost:8082/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
      })
    .then(res=> res.json())
      .then(res => {
         console.log(res.code)
         var temp=[];
        for(var i=0;i<res.code.length;i++)
        temp.push(res.code[i].reciever);
        this.setState({arr:temp})
      })
    // this.setState({ reciveremail: event.target.value });
  }

  
  handleSubmit(event) {
    event.preventDefault();
    const user={
      sender:JSON.parse(localStorage.getItem("jwt")).user.id,
      reciever:this.state.reciveremail,
      message:this.state.msg
    }
    fetch("http://localhost:8082/addmsg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
      })
    .then(res=> res.json())
      .then(res => {
        if(res.code===1)
        {
        alert("Message Added");
        this.setState({reciveremail:user.reciever})
        }
        else
        alert("Message Not Added");
      })
      // if(this.state.arr==null)
      // {
      //   this.historyuser();
      // }

  }
  searchmail = () => {
   
   alert("reciveremail : " + this.state.reciveremail);
  };

  //create function for get id and search use reciver id present in state
  //create function for post msg use reciver sender and msg state

  render() {
    window.addEventListener("DOMContentLoaded", () => {
      const button = document.querySelector("#emoji-button");
      const picker = new EmojiButton();

      picker.on("emoji", (emoji) => {
        document.getElementById("inputvalue").value += emoji;
        var newval = document.getElementById("inputvalue").value;
        this.setState({ msg: newval });
      });
      button.addEventListener("click", () => {
        picker.togglePicker(button);
      });
    });
    
    return (
      <div style={{background:"rgb(26, 157, 199)" , padding:"20px"}}>
        <div className="container">
          <div className="row myconta">
            <div className="col-12 col-md-4" id="left">
              <div className="row">
                
                <div className="input-group" style={{ padding: "10px" }}>
                  {/* search reciver mail */}
                  <input
                    type="text"
                    onChange={this.searhboxmail}
                    className="form-control"
                    placeholder="search"
                    id="searchinp"
                  />
                  <div
                    className="input-group-append"
                    onClick={() => {
                      this.searchmail();
                    }}
                  >
                    <span className="input-group-text">
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </span>
                  </div>
                </div>
                <hr/>

                <div
                  className="col-12 mt-4"
                  style={{ height: "550px", overflow: "scroll" }}
                >
                {this.state.arr.map((i)=>{return <div
                  className="listprofile"
                  onClick={() => {
                    this.passmsg(i);
                  }}
                >
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQtFb5KR5e9qSqvLmU94XSIFrHKVhcJolh-vUdnvY0A7sVOJoLd&usqp=CAU" />
                  <p>{i}</p>
                </div>
                })}

                </div>
              </div>
            </div>
            <div className="col-12 col-md-8" id="right">
              <div>
                <Message reciver={this.state.reciveremail} sender={this.state.senderemail} sendornot={this.state.sendornot} />
                
              </div>
              <div className="msgbox">
                <div className="input-group" style={{ padding: "10px" }}>
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="emoji-button">
                      <i className="far fa-smile"></i>
                    </span>
                  </div>

                  <input
                    type="text"
                    className="form-control"
                    id="inputvalue"
                    value={this.state.msg}
                    onChange={this.mymsgsend}
                    placeholder="Type a message"
                  />

                  <div className="input-group-append" onClick={this.handleSubmit}>
                    <span className="input-group-text">
                      <i className="fa fa-paper-plane" aria-hidden="true"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chatapp;
