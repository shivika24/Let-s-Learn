import React, { Component } from 'react';

class Message extends Component {
    state={
        sarr:[],
        reciver:''
    }
    componentDidMount(){
    }
    get=()=>{
      console.log("wun")
        this.user={
            sender:this.props.sender,
            reciever:this.props.reciver
          }
           fetch("http://localhost:8082/sendermsg", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(this.user)
            })
          .then(res=> res.json())
            .then(res => {
              // console.log(res.code)
              this.setState({
                sarr: [ ...this.state.sarr, res.code ]
              })
            }) 
    }
   
    componentDidUpdate(){

        if(this.props.reciver!=this.state.reciver)
        {
            this.setState({reciver:this.props.reciver})
            this.setState({sarr:[]})
            setInterval(this.get(),4000)
        }
      
        
        
    }
    render() {

        return (
            <div>
            <div className="headmsg">
            <h2>{this.props.reciver}</h2>
            </div>
            <div style={{ height: "550px", overflow: "scroll" }} className="packmsg">
           {
            // console.log(this.state.sarr[0]),
               this.state.sarr[0]?this.state.sarr[0].map((i,index)=>{return( 
                <div key="index" className={JSON.parse(localStorage.getItem("jwt")).user.id===i.sender?"sendermsg":"receivermsg"}>
                 {i.message}
                 </div>
                  )
                 }):<div>No data found...</div>
           }
             </div>
            </div>
        );
    }
}

export default Message;