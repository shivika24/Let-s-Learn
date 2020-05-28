import React,{Component} from 'react';
import { Link } from "react-router-dom";
class Courses extends Component{
    constructor()
    {
        super();
        this.state={
            courses:[],
            cart:[],
            r:0,
            p:0,
            bill:0
        }
        this.get=this.get.bind(this);
    }
    get()
    {
    if(this.state.r==0)
    {
        this.setState({r:1})
    fetch('http://localhost:8082/getcourse',
    {
      method: "GET",

    } )

    .then( res => {
      console.log(res)
          if(res.ok)
            return res.json()

      } )

    .then( res => {  
      var temp=[]; 
       res.map((e) => {
          temp.push(e);
          console.log(e);
           this.setState({courses:temp})
          
         })
        
       
      })      
    }
    }

       
   
    cart(e)
    {
        if(JSON.parse(localStorage.getItem('jwt')))
        {
         
            var data = {
                id:e.cid,
                email:JSON.parse(localStorage.getItem('jwt')).user.id,
                price:e.price,
                description:e.description,
                cname:e.cname,
                image:e.image
            }
            
            fetch('http://localhost:8082/putcart',
            {
              method: "PUT",
      
                headers:{"Content-Type":"application/json",  },
      
                  body:JSON.stringify(data),
            } )
      
            .then( res => {
                   alert("Added To Cart")
                   var temp = this.state.cart;
                   temp.push(data);
                    this.setState({
                     cart:temp
                 })
                   console.log(this.state.cart);
                 
                  if(res.ok)
                    return res.json()
      
              } )
      
            .then( res => {
              console.log("hi");
              
              } )
            
           
        }
        else 
        {
        alert("Pleasse Login Here");
        window.location.replace("http://localhost:3000/logins");
        }
    }
  gocart()
  {
    window.location.replace("http://localhost:3000/gocart");
  }
    render(){
        return(
            
     <div className="Mainpage">
    {this.get()}
  
    <div style={{backgroundImage: "linear-gradient(90deg, rgb(0, 140, 186) 17%, rgb(63, 98, 114) 100%)"}}>
        <div className="container">
            <div className="row">
                <div className="col" style={{textAlign: "center",padding: "40px"}}>
                    <h1 data-aos="fade-down" style={{color: "white",fontSize: "60px"}}>Our Premium Test Series</h1>
                </div>
                <Link to="/cart" style={{color:"white"}}><i class="fas fa-shopping-cart fa-3x" style={{marginTop:"55px"}}></i></Link>
            </div>
        </div>
    </div>
    {/* <!-- End: 1 Row 1 Column --> */}
    <div className="pricing8 py-5">
    <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-8 text-center">
        <h3 className="mb-3">Test Series to make your Future Bright</h3>
        <h6 className="subtitle font-weight-normal">We offer 100% satisafaction and Money back Guarantee</h6>
      </div>
    </div>
   
    <div className="row mt-4">
      {
       this.state.courses.map((e) => {return <div className="col-md-4 ml-auto pricing-box align-self-center">
        <div className="card mb-4">
          <div className="card-body p-4 text-center">



          {/* <img  src={require('./java.jpg')} width = {250} height={250}  /> */}
          <img  src={e.image} width = {320} height={350}  />



            <h5 className="font-weight-normal">{e.cname}</h5>
            <sup>$</sup><span className="text-dark display-5">{e.price}</span>
            <h6 className="font-weight-light font-14">YEARLY</h6>
            <p className="mt-4">{e.description}</p>
          </div>
          <button className="btn btn-info-gradiant p-3 btn-block border-0 text-white" href="#" onClick={() => { this.cart(e) }}>Add To Cart</button>
        </div>
      </div>
    })}
         <button className="btn btn-info-gradiant p-3 btn-block border-0 text-white" href="#" onClick={() => { this.gocart() }}>Go To Cart</button>    
   
    </div>
    </div>
  </div>
 
    </div>
            
        )
    }

}
export default Courses;