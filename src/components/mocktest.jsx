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
                <div class="row">
                    {this.state.arr.map((i)=>{return <div class="col-auto col-sm-12 col-md-12 col-lg-4 col-xl-4" style={{paddingTop: "15px",paddingBottom: "15px",paddingRight: "15px",paddingLeft: "15px"}}>
                        <div class="bg-light border rounded shadow card"><img class="card-img-top" src={i.image} style={{height:"250px"}}/>
                            <div class="card-body">
                                <h3 class="card-title" style={{fontFamily: "Antic, sans-serif",color: "rgb(81,87,94)"}}>{i.testname}</h3>
                                <p id="lorem">{i.about}</p>
                                <Link to="/" onClick={()=>this.props.settest(i.testid)}><button class="btn btn-outline-success" type="button" style={{fontWeight: "normal",fontFamily: "Antic, sans-serif"}}>Take Test</button></Link></div>
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