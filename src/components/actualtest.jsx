import React, { Component } from "react";
import { Link } from "react-router-dom";
class Actualtest extends Component{
    constructor()
    {
        super();
        this.state={
            mcqs:[],
            r:0
        }
    }
    getmcqs()
    {
        console.log("hello");
        if(this.state.r==0)
        {
        var data = {
            test : this.props.testname
        }
        fetch('http://localhost:8082/getmcqs',
      {
        method: "PUT",

          headers:{  "Content-Type":"application/json",  },

            body:JSON.stringify(data),
      } )

      .then( res => {

            if(res.ok)
              return res.json()

        } )

      .then( res => {
        
           this.setState(
               {
                   mcqs:res,
                   r:1
               }
           )
           console.log(this.state.mcqs);
        
        } )
    }

    }
    render(){
        return (<div>
            {this.getmcqs()}
        </div>)
    }
}

export default Actualtest;