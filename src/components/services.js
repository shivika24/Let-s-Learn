import React, { Component } from 'react';

class Services extends Component{
    render(){
        return(
            <div className="Mainpage">
                {/* <!-- Start: 1 Row 1 Column --> */}
    
    <div style={{backgroundImage: "linear-gradient(90deg, rgb(0, 140, 186) 17%, rgb(63, 98, 114) 100%)"}}>
        <div className="container">
            <div className="row">
                <div className="col" style={{textAlign: "center",padding: "40px"}}>
                    <h1 data-aos="fade-down" style={{color: "white",fontSize: "60px"}}>Our Pricing</h1>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- End: 1 Row 1 Column --> */}
    <div className="pricing8 py-5">
    <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-8 text-center">
        <h3 className="mb-3">Pricing to make your Work Effective</h3>
        <h6 className="subtitle font-weight-normal">We offer 100% satisafaction and Money back Guarantee</h6>
      </div>
    </div>
    {/* <!-- row  --> */}
    <div className="row mt-4">
      {/* <!-- column  --> */}
      <div className="col-md-4 ml-auto pricing-box align-self-center">
        <div className="card mb-4">
          <div className="card-body p-4 text-center">
            <h5 className="font-weight-normal">Regular Plan</h5>
            <sup>$</sup><span className="text-dark display-5">39</span>
            <h6 className="font-weight-light font-14">YEARLY</h6>
            <p className="mt-4">The Master license allows you to customize, store and even host your website using your platform</p>
          </div>
          <a className="btn btn-info-gradiant p-3 btn-block border-0 text-white" href="#">CHOOSE PLAN </a>
        </div>
      </div>
      {/* <!-- column  --> */}
      {/* <!-- column  --> */}
      <div className="col-md-4 ml-auto pricing-box align-self-center">
        <div className="card mb-4">
          <div className="card-body p-4 text-center">
            <h5 className="font-weight-normal">Master Plan</h5>
            <sup>$</sup><span className="text-dark display-5">49</span>
            <h6 className="font-weight-light font-14">YEARLY</h6>
            <p className="mt-4">The Master license allows you to customize, store and even host your website using your platform</p>
          </div>
          <a className="btn btn-danger-gradiant p-3 btn-block border-0 text-white" href="#">CHOOSE PLAN </a>
        </div>
      </div>
      {/* <!-- column  --> */}
      {/* <!-- column  --> */}
      <div className="col-md-4 ml-auto pricing-box align-self-center">
        <div className="card mb-4">
          <div className="card-body p-4 text-center">
            <h5 className="font-weight-normal">Premium Plan</h5>
            <sup>$</sup><span className="text-dark display-5">69</span>
            <h6 className="font-weight-light font-14">YEARLY</h6>
            <p className="mt-4">The Master license allows you to customize, store and even host your website using your platform</p>
          </div>
          <a className="btn btn-info-gradiant p-3 btn-block border-0 text-white" href="#">CHOOSE PLAN </a>
        </div>
      </div>
      {/* <!-- column  --> */}
    </div>
    </div>
  </div>
            </div>
        )
    }
}
export default Services;
