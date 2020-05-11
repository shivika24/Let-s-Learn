import React, { Component } from 'react';

class Contactus extends Component{
    render(){
        return(
            <div className="Mainpage">
                {/* <!-- Start: 1 Row 1 Column --> */}
    <div style={{backgroundImage: "linear-gradient(90deg, #58a5ff 17%, #3a4e6d 100%)"}}>
        <div className="container">
            <div className="row">
                <div className="col" style={{textAlign: "center",padding: "40px"}}>
                    <h1 data-aos="fade-down" style={{color: "white",fontSize: "60px"}}>Contact Us</h1>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- End: 1 Row 1 Column --> */}
    {/* <!-- Start: ebs contact form --> */}
    <div className="container" id="info-container">
        <div className="row">
            <div className="col-12 col-sm-6 col-md-6" id="contact-box">
                <p id="contact-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel nam magnam natus tempora cumque, aliquam deleniti voluptatibus voluptas. Repellat vel, et itaque commodi iste ab, laudantium voluptas deserunt nobis. </p>
                <div className="info-box"><i className="fa fa-map-marker my-info-icons"></i><span className="text-uppercase text-info">Address: </span><span>MCC Road, Aba, Abia State Nigeria</span></div>
                <div className="info-box"><i className="fa fa-envelope my-info-icons"></i><span className="text-uppercase text-info">Email: </span><span>contact@ensignhospital.org </span></div>
                <div className="info-box"><i className="fa fa-phone-square my-info-icons"></i><span className="text-uppercase text-info">Phone: </span><span>+234000000000 </span></div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 site-form">
                <form id="my-form">
                    <div className="form-group"><label className="sr-only" for="firstname">First Name</label><input className="form-control" type="text" id="firstname" name="firstname" placeholder="First Name" autofocus=""/></div>
                    <div className="form-group"><label className="sr-only" for="phonenumber">Phone Number</label><input className="form-control" type="tel" id="phonenumber" name="phonenumber" required="" placeholder="Phone"/></div>
                    <div className="form-group"><label className="sr-only" for="email">Email Address</label><input className="form-control" type="text" id="email" name="email" required="" placeholder="Email"/></div>
                    <div className="form-group"><label className="sr-only" for="messages">Your message</label><textarea className="form-control" name="messages" required="" placeholder="Message" rows="8"></textarea></div>
                    <button className="btn btn-light btn-lg" id="form-btn" type="submit" style={{backgroundColor: "#58a5ff",color:"White",borderRadius: "8px"}}>SEND </button>
                </form>
            </div>
            <div className="clearfix"></div>
        </div>
    </div>
            </div>
        )
    }
}
export default Contactus;
