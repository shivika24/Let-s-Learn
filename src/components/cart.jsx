import React,{Component} from 'react';
import { Link } from "react-router-dom";
class Cart extends Component{
    constructor()
    {
        super();
        this.state={
            cart:[],
            r:0,
            p:0,
            bill:0,
        }
       this.remove=this.remove.bind(this);
       this.getcart=this.getcart.bind(this);
       this.congrats=this.congrats.bind(this);
       this.bill=this.bill.bind(this);
    }
    congrats()
    {
        
        if(this.state.r==1)
        {
            var s="";
           for(var i=0;i<this.state.cart.length;i++)
           {
               s=s+this.state.cart[i].cname;
               if(i!=this.state.cart.length-1)
               s=s+",";
           }
           console.log(s);
            var data={
                
                id:JSON.parse(localStorage.getItem('jwt')).user.id,
                temp:s
            }
            console.log(data);
            fetch('http://localhost:8082/addcoursetostud',
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
                
              })  


              fetch('http://localhost:8082/deletecart',
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
                   this.setState({cart:[]})
                }) 


            window.location.replace("http://localhost:3000/congrats");
        }
        else
        alert("Please Confirm First")
    }
    bill()
    { 
      console.log(this.state.cart);
      if(JSON.parse(localStorage.getItem('jwt')).user.id&&this.state.cart.length!=0)
      {
          console.log("hii");
      var data={
        email:JSON.parse(localStorage.getItem('jwt')).user.id
      }
      fetch('http://localhost:8082/getbill',
      {
        method: "PUT",

          headers:{  "Content-Type":"application/json",  },

            body:JSON.stringify(data),
      } )

      .then( res => {
        
            if(res.ok)
            {
              
             return res.json()  
            }

        } )

      .then( res => {

           
            console.log(res[0].val);

           this.setState({
              bill:res[0].val,
              r:1
        })
        } )
       
    
      }
      else
      alert("OOps! Your Cart is Empty");
      
    }

    remove(d)
    {
      console.log(d)
      var data={
        id:d.cid,
        email:JSON.parse(localStorage.getItem('jwt')).user.id,
      }
      console.log(data);
      fetch('http://localhost:8082/removecart',
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
        this.getcart1();
        this.setState({r:0})          //as item is removed then aagin to confirm
        } )
    }
    getcart1()
    {
       fetch('http://localhost:8082/getcart',
      {
        method: "GET",

      } )

      .then( res => {
        console.log(res)
            if(res.ok)
              return res.json()

        } )

      .then( res => {
         if(res.length==0)
         this.setState({cart:[]})
         else
         this.setState({cart:res})
       
      })
      
    }
    getcart()
    {
      if(this.state.p==0)
      {
       fetch('http://localhost:8082/getcart',
      {
        method: "GET",

      } )

      .then( res => {
        console.log(res)
            if(res.ok)
              return res.json()

        } )

      .then( res => {
         if(res.length==0)
         this.setState({cart:[]})
         else
         this.setState({cart:res})
       
        })
        this.setState({p:1})
      }
      
    }
    render(){
       return ( 
           <div>
           {this.getcart()}
               <div style={{backgroundImage: "linear-gradient(90deg, rgb(0, 140, 186) 17%, rgb(63, 98, 114) 100%)"}}>
       <div className="container">
           <div className="row"> 
               <div className="col" style={{textAlign: "center",padding: "40px"}}>
                   <h1 data-aos="fade-down" style={{color: "white",fontSize: "60px"}}>Check Your Cart Here!!</h1>
               </div>
           </div>
       </div>
   </div>
   <div className="pricing8 py-5">
   <div className="container">
   <div className="row mt-4">
     {console.log(this.state.cart)}
   {
      this.state.cart.map((e) => {return <div className="col-md-4 ml-auto pricing-box align-self-center">
       <div className="card mb-4">
         <div className="card-body p-4 text-center">
         <img  src={e.image} width = {320} height={350}  /> <br/>
           <h5 className="font-weight-normal">{e.cname}</h5>
           <sup>$</sup><span className="text-dark display-5">{e.price}</span>
           <h6 className="font-weight-light font-14">YEARLY</h6>
           <p className="mt-4">{e.description}</p>
         </div>
        
         <button className="btn btn-info-gradiant p-3 btn-block border-0 text-white" href="#" onClick={() => { this.remove(e) }}>Remove This</button>
       </div>
     </div>
   })}
   
   
       <button className="btn btn-info-gradiant p-3 btn-block border-0 text-white" href="#" onClick={() => { this.bill() }}>Click To Confirm</button>    
       <button className="btn btn-info-gradiant p-3 btn-block border-0 text-white" href="#" onClick={() => { this.congrats() }}>Buy for ${this.state.bill}</button>    
   </div>
   </div></div></div>
       )

       
    }

}
export default Cart;
