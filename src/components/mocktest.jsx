import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

class Mocktest extends Component
{
    constructor()
    {
        super();
        this.state={
            arr:[]
        }
    }
    componentDidMount()
    {
        {this.getdata()}
    }
    getdata=()=>{
          fetch("http://localhost:8082/getmocktest", {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },
            })
          .then(res=> res.json())
            .then(res => {
              this.setState({arr:res.code})
            })      
    }
    render()
    {
        return (
            <div>
            <div class="container">
            <div class="row justify-content-center">
            <div class="col-md-8 text-center">
            <h3 class="my-3" style={{color:"#108092"}}>Practice Mock Tests</h3>
            <h6 class="subtitle font-weight-normal">You can relay on our amazing mock tests to prepare yourself for upcoming placemnets and to make you industry ready.</h6>
           </div>
           </div>
                <div class="row">
                    {this.state.arr.map((i)=>{return <div class="col-auto col-sm-12 col-md-12 col-lg-4 col-xl-4" style={{paddingTop: "15px",paddingBottom: "15px",paddingRight: "15px",paddingLeft: "15px"}}>
                        <div class="bg-light border rounded shadow card"><img class="card-img-top" src={i.image} style={{height:"250px"}}/>
                            <div class="card-body">
                                <h3 class="card-title" style={{fontFamily: "Antic, sans-serif",color: "rgb(81,87,94)"}}>{i.testname}</h3>
                                <p id="lorem">{i.about}</p>
                                <Link to="/mcq1" onClick={()=>this.props.settest(i.testid)}><button class="btn btn-outline-success" type="button" style={{fontWeight: "normal",fontFamily: "Antic, sans-serif"}}>Take Test</button></Link></div>
                            </div>
                        </div>
                    })}

                    </div>
               </div>

            </div>
        );
    }
}
export default Mocktest;