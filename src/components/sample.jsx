import React, { Component } from "react";
import { Link } from "react-router-dom";
import {ExcelRenderer, OutTable} from 'react-excel-renderer';
 
class Sample extends Component
{
   
 f1=()=>{
    const input = document.getElementById('input').files[0];
    ExcelRenderer(input,(err,resp)=>{
        if(err)
        console.log(err)
        else
        {
            console.log(resp.cols)
            console.log(resp.rows)
            this.setState({cols:resp.cols,rows:resp.rows})
        }
    })
    }

    render()
    {
        return (
            <div>
            <input type="file" id="input" />
            <button onClick={()=>{this.f1()}}>Click</button>
            </div>
        )
    }
}
export default Sample;