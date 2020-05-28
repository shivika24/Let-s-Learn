import React,{Component} from 'react';
import {Link} from 'react-router-dom';

export default class extends Component{
 constructor(){
   super();
   this.state={
     submitted:[],
   }
   this.f1=this.f1.bind(this);
 }
 f1(e,check,ans,iid)
 {
   e.preventDefault();
   console.log(check)
   console.log(ans)
   var arr=document.getElementsByName(check);
   var i,cans="";
   for(i=0;i<arr.length;i++)
   {
     if(arr[i].checked)
     cans=arr[i].value;
   }
   if(cans==ans)
   document.getElementById(iid).innerHTML="Correct Answer";
   else if(cans=="")
   document.getElementById(iid).innerHTML="Please Select An Option First!!!";
   else
   document.getElementById(iid).innerHTML="Incorrect Answer... Correct Answer is Option "+ans;
 }
 
    render()
    {
        return(        
          <div>
                {console.log(this.props.mcq)}
                {this.props.mcq.map((i,index)=>{return <div class="card" style={{width: "80%",marginTop:"3%",marginLeft:"10%",backgroundImage:"linear-gradient(180deg, rgb(66, 179, 213) 10%, rgb(210, 249, 255) 100%)"}}>
                <div class="card-body">
                <h5 class="card-title" style={{color:"#093367"}}>Ques:- {i.question}</h5>
                <div id={index+"*"+i.answer}>
                {i.option1}<input type="radio" name={"option"+index}  value="1" style={{marginLeft: "-37%",marginRight: "-36%",marginTop: "0%"}}/><br/>
                {i.option2}<input type="radio" name={"option"+index}  value="2" style={{marginLeft: "-37%",marginRight: "-36%",marginTop: "0%"}}/><br/>
                {i.option3}<input type="radio" name={"option"+index}  value="3" style={{marginLeft: "-37%",marginRight: "-36%",marginTop: "0%"}}/><br/>
                {i.option4}<input type="radio" name={"option"+index}  value="4" style={{marginLeft: "-37%",marginRight: "-36%",marginTop: "0%"}}/>
                <br/>
                <div id={"data"+index} style={{color:"red"}}></div>
                <button style={{width:"17%"}} id="submitbut1"onClick={(e)=>{this.f1(e,"option"+index,i.answer,"data"+index)}}>Check Answer</button>
                </div>
                </div>
                </div>})}
                </div>          
        )
    }
}