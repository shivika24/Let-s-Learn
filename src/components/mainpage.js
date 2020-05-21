import React, { Component } from 'react';
import img from './imgs.jpg';
class Mainpage extends Component{
    render(){
        return(
    <div className="Mainpage">
    <div className="video-background-holder">
  <div className="video-background-overlay"></div>
   <img  className="video-background-overlay" src={img} style={{ width:"100vw" }}/>

  <div className="video-background-content container h-100">
    <div className="d-flex h-100 text-center align-items-center">
      <div className="w-100 text-white">
        <h1 className="display-4">Our Vision</h1>
        <p className="lead mb-0">  Build a World Class Digital Talent Platform Powered by Talent DNA Enabling the Creation & Sustenance of Talent Ecosystem. </p>
      </div>
    </div>
  </div>
</div>
    <section id="team" className="bg-light-gray">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h2 data-aos="zoom-in" className="section-heading">Our Amazing Team</h2>
                    <h3 className="section-subheading text-muted">Skilled developers </h3>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4 col-md-3">
                    <div className="team-member"><img className="rounded-circle img-fluid" src="assets/img/Larry.jpg"/>
                        <h4>Shivesh Gupta</h4>
                        <p className="text-muted">Lead Designer</p>
                    </div>
                </div>
                <div className="col-sm-4 col-md-3">
                    <div className="team-member"><img className="rounded-circle img-fluid" src="assets/img/Kay.jpg"/>
                        <h4>Shivika Singla</h4>
                        <p className="text-muted">Lead Developer</p>
                    </div>
                </div>
                <div className="col-sm-4 col-md-3">
                    <div className="team-member"><img className="rounded-circle img-fluid" src="assets/img/Kay.jpg"/>
                        <h4>Shivani Goyal</h4>
                        <p className="text-muted">Lead Developer</p>
                    </div>
                </div>
                <div className="col-sm-4 col-md-3">
                    <div className="team-member"><img className="rounded-circle img-fluid" src="assets/img/Larry.jpg"/>
                        <h4>Sanchit Goyal</h4>
                        <p className="text-muted">Lead Developer</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-8 offset-lg-2 text-center" data-aos="fade-up">
                    <p className="large text-muted">Our Mission is to be an Equal Opportunity Enabler levelling the Opportunity Landscape for Talent Transformation.Let's Learn strives to create a Talent Ecosystem for Sustainability through comprehensive Platform based services.</p>
                </div>
            </div>
        </div>
    </section>
    {/* <!-- End: Team --> */}
    </div>

        )
    }
}
export default Mainpage;
