import React, { Component } from 'react';


function Message(props){
    return(
        <div style={{height:"550px",overflow:"scroll"}}>
            {console.log(props.title)}
            {props.title}
            hello
        </div>
    )
}
class Chatapp extends Component {
    state={
        user:'hello'
    }
    passmsg=(username=0)=>{
        this.setState({user:username})
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <div className="row">
                                <div className="col-12">
                                    <input type="text" placeholder="search" className="form-control"/>
                                </div>
                                <div className="col-12" style={{height:"550px",overflow:"scroll"}}>
                            <p onClick={()=>{this.passmsg('user1')}}>click 1</p>
                            <p onClick={()=>{this.passmsg('user2')}}>click 2</p>
                            <p onClick={()=>{this.passmsg('user3')}}>click 3</p>
                            <p onClick={()=>{this.passmsg('user4')}}>click 4</p>
                            <p onClick={()=>{this.passmsg('user5')}}>click 5</p>
                                </div>
                            </div>
                           
                        </div>
                        <div className="col-8">
                            <div>
                                <Message title={this.state.user}/>
                            </div>
                            {/* <div>
                                <input type="text" className="form-control" placeholder="Send message"/>
                            </div> */}

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chatapp;