import React, { Component, PropTypes } from "react";
import "./chatapp.css";
import EmojiButton from "@joeattardi/emoji-button";

function Message(props) {

    // create get function for finding msgs 
  return (
    <div>
      <div className="headmsg">
          {/* use these props in get function */}
        <h2>{props.reciver}   : {props.sender}</h2>
      </div>
      <div style={{ height: "550px", overflow: "scroll" }} className="packmsg">
       
       {/* className="sendermsg" for reciver className="receivermsg" for sender */}
       
        <div className="sendermsg">
          This is some text. This is some text. This is some text This is some
          text. This is some text. This is some text This is some text. This is
          some text. This is some text
        </div>
        <div className="receivermsg">
          This is some text. This is some text. This is some text This is some
          text. This is some text. This is some text This is some text. This is
          some text. This is some text
        </div>
        <div className="sendermsg">
          This is some text. This is some text. This is some text This is some
          text. This is some text. This is some text This is some text. This is
          some text. This is some text
        </div>
        <div className="receivermsg">
          This is some text. This is some text. This is some text This is some
          text. This is some text. This is some text This is some text. This is
          some text. This is some text
        </div>



      </div>
    </div>
  );
}
class Chatapp extends Component {
  state = {
    user: "Wellcome to Chat area",
    msg: "", //your message value
    reciveremail: "",
    senderemail: "",
  };
  constructor() {
    super();
    this.mymsgsend = this.mymsgsend.bind(this);
    this.searhboxmail = this.searhboxmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  passmsg = (email1 = 0) => {
    this.setState({ reciveremail: email1 });
  };

  mymsgsend(event) {
    this.setState({ msg: event.target.value });
  }
  searhboxmail(event) {
    this.setState({ reciveremail: event.target.value });
  }
  handleSubmit(event) {
    alert("your message" + this.state.msg);
    event.preventDefault();
  }
  searchmail = () => {
    alert("reciveremail : " + this.state.reciveremail);
  };

  //create function for get id and search
  //create function for post msg

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
      <div>
        <div className="container">
          <div className="row mt-4 mb-4 myconta">
            <div className="col-12 col-md-4">
              <div className="row">
                <div className="input-group" style={{ padding: "10px" }}>
                  {/* search reciver mail */}
                  <input
                    type="text"
                    onChange={this.searhboxmail}
                    className="form-control"
                    placeholder="search"
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

                <div
                  className="col-12 mt-4"
                  style={{ height: "550px", overflow: "scroll" }}
                >
                  <div
                    className="listprofile"
                    onClick={() => {
                      this.passmsg("email1");
                    }}
                  >
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQtFb5KR5e9qSqvLmU94XSIFrHKVhcJolh-vUdnvY0A7sVOJoLd&usqp=CAU" />
                    <p>click 1</p>
                  </div>
                  <div
                    className="listprofile"
                    onClick={() => {
                      this.passmsg("email2");
                    }}
                  >
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQtFb5KR5e9qSqvLmU94XSIFrHKVhcJolh-vUdnvY0A7sVOJoLd&usqp=CAU" />
                    <p>click 1</p>
                  </div>
                  <div
                    className="listprofile"
                    onClick={() => {
                      this.passmsg("email3");
                    }}
                  >
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQtFb5KR5e9qSqvLmU94XSIFrHKVhcJolh-vUdnvY0A7sVOJoLd&usqp=CAU" />
                    <p>click 1</p>
                  </div>
                  <div
                    className="listprofile"
                    onClick={() => {
                      this.passmsg("email4");
                    }}
                  >
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQtFb5KR5e9qSqvLmU94XSIFrHKVhcJolh-vUdnvY0A7sVOJoLd&usqp=CAU" />
                    <p>click 1</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-8">
              <div>
                <Message reciver={this.state.reciveremail} sender={this.state.senderemail} />
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
