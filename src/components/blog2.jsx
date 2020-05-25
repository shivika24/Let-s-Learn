import React, { Component } from 'react';
import { Link } from "react-router-dom";
import StarRatingComponent from 'react-star-rating-component';
import '../stylesheet/Article-Cards.css';
import '../stylesheet/Latest-Blog.css';
import '../stylesheet/Contact-Form-Clean.css';
import '../stylesheet/cards.css';
import '../stylesheet/card-3-column-animation-shadows-images.css';

class Blog2 extends Component
{
    constructor()
    {
        super();
        this.state={
            arr:[],
            l:'',
            rating:''
        }
    }
    handleSubmit = event => {
        event.preventDefault();

        if(JSON.parse(localStorage.getItem('jwt')))
        {
        var obj={
            email:'',
            name:'',
            college:'',
            course:'',
            blo:'',
            image:'',
            date:'',
            time:'',
            rate:0,
            count:0,
        }

        obj.email = JSON.parse(localStorage.getItem('jwt')).user.id;

        obj.image = document.getElementById("t6").value;

        obj.name = document.getElementById("t1").value;

        obj.college = document.getElementById("t2").value;

        obj.course = document.getElementById("t3").value;

        obj.blo = document.getElementById("t4").value;
        
        var tempDate = new Date();

        var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() ;
        
        var time =  tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();

        obj.rate = this.state.rating;

        obj.date = date;
        
        obj.time = time;

        obj.count = 0;

        this.setState({p:'ffff'});
  
      
       this.add(obj);

      }
      else
      alert("Please Login Or Signup to comment!!")

    }
    add(data)
    {
      fetch('http://localhost:8082/putevent',
      {
        method: "PUT",

          headers:{  "Content-Type":"application/json",  },

            body:JSON.stringify(data),
      } )

      .then( res => {
            if(res.ok)
            alert("Blog Added");
        } )
    }
    onStarClick(nextValue)
    {
      this.setState( { rating: nextValue } );
    }
    getblog=()=>{
        fetch("http://localhost:8082/getblog", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          })
        .then(res=> res.json())
          .then(res => {
              console.log(res.code);
            this.setState({arr:res.code})
          })
    
      }
    componentDidMount()
    {
    {this.getblog()}
    }
    render()
    {
        return (
            this.state.arr[0]?<div>
            <div class="blog-home3 py-5">
            <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8 text-center">
        <h3 class="my-3">Latest News and Blog</h3>
        <h6 class="subtitle font-weight-normal">You can relay on our amazing features list and also our customer services will be great experience for you without doubt</h6>
      </div>
    </div>
    
    <div class="row mt-4">
        {this.state.arr.map((i,index)=>{return <div style={{minHeight: "67%"}} className={index==0||index==5?"col-lg-6":"col-md-3"}>
        {index==0||index==5?
      <div class="animate__animated animate__pulse card border-0 mb-4">
          <Link to="/viewblog" onClick={()=>this.props.setData(i.sn)}><img style={{height:"260px"}} class="card-img-top" src={i.image} alt="wrappixel kit"/></Link>
          <div class="date-pos text-center text-white p-3 bg-success-gradiant">{i.name} &nbsp; &nbsp; {i.date}</div>
          <h5 class="font-weight-medium mt-3"><a href="#" class="link text-decoration-none">{i.course}</a></h5>
      </div>:
      <div class="animate__animated animate__pulse card border-0 mb-4">
      <Link to="/viewblog" onClick={()=>this.props.setData(i.sn)}><img style={{height:"260px"}}  class="card-img-top" src={i.image}/></Link>
        <div class="date-pos text-center text-white p-3 bg-success-gradiant">{i.name} &nbsp; &nbsp; {i.date}</div>
        <h6 class="font-weight-medium mt-3"><a href="#" class="link text-decoration-none">{i.course}</a></h6>
      </div>
}    
      
    </div>

        })}
        </div>
  </div>
</div>
{localStorage.getItem("jwt")?<div class="contact-clean">
<form onSubmit = {this.handleSubmit} method="post">
<h2 class="text-center">Enter your blog</h2>
<div class="form-group"><input class="form-control mb-2" type="text" id="t1" name="name" placeholder="Enter Your Name"/></div>
<div class="form-group"><input class="form-control mb-2" type="text" id="t2" name="clg" placeholder="Enter Your College"/></div>
<div class="form-group"><input class="form-control mb-2" type="text" id="t3" name="head" placeholder="Enter Blog Title"/></div>
<div class="form-group"><input class="form-control mb-2" type="text" id="t6" name="image" placeholder="Enter Image Url"/></div>
<div class="form-group"><textarea class="form-control mb-2" id="t4" name="content" placeholder="Enter Blog Content" rows="14"></textarea></div>
<h4> RATE YOUR EXPERIENCE </h4>
<StarRatingComponent   starCount={10}  value={this.state.rating}   onStarClick={this.onStarClick.bind(this)}   />
<br/>
<div class="form-group"><button class="btn btn-primary" type="submit">send </button></div>
</form>
</div>:<div></div>}
    
            
           </div>:<div>no</div>
        )
    }
}
export default Blog2;