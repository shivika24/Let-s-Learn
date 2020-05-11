import React, { Component } from 'react';
import img from './imgs.jpg';
class Mainpage extends Component{
    render(){
        return(
    <div className="Mainpage">
    {/* <!-- Start: Bootstrap 4 - Full Video Background v2 --> */}
    <div className="video-background-holder">
  <div className="video-background-overlay"></div>
  {/* <video playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop">
        <source src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4" type="video/mp4"/>
    </video> */}
   <img  className="video-background-overlay" src={img} style={{ width:"100vw" }}/>

  <div className="video-background-content container h-100">
    <div className="d-flex h-100 text-center align-items-center">
      <div className="w-100 text-white">
        <h1 className="display-4">Our Vision</h1>
        <p className="lead mb-0">With HTML5 and Bootstrap 4</p>
      </div>
    </div>
  </div>
</div>
    {/* <!-- End: Bootstrap 4 - Full Video Background v2 --> */}
    {/* <!-- Start: featured products slider --> */}
    <section>
        <div data-bs-parallax-bg="true" id="w_shop_105" className="carousel slide w_shop_105_indicators w_shop_105_control_button thumb_scroll_x swipe_x ps_easeOutInCubic" data-ride="carousel" data-pause="hover" data-interval="8000" data-duration="2000">
            {/* <!-- Start: Header of Slider --> */}
            <div className="w_shop_105_main_header">
                <h1><span style={{color: "#58a5ff"}}><strong>featured</strong></span><span style={{color: "#58a5ff"}}><strong>products</strong></span></h1>
            </div>
            {/* <!-- End: Header of Slider --> */}
            {/* <!-- Start: Indicators --> */}
            <ol className="carousel-indicators">
                {/* <!-- Start: 1st Indicator --> */}
                <li className="active" data-target="#w_shop_105" data-slide-to="0" style={{filter: "blur(0px)"}}></li>
                {/* <!-- End: 1st Indicator --> */}
                {/* <!-- Start: 2nd Indicator --> */}
                <li data-target="#w_shop_105" data-slide-to="1"></li>
                {/* <!-- End: 2nd Indicator --> */}
                {/* <!-- Start: 3rd Indicator --> */}
                <li data-target="#w_shop_105" data-slide-to="2"></li>
                {/* <!-- End: 3rd Indicator --> */}
            </ol>
            {/* <!-- End: Indicators --> */}
            {/* <!-- Start: Wrapper For Slides --> */}
            <div className="carousel-inner" role="listbox" style={{color: "#58a5ff"}}>
                {/* <!-- Start: 1st Slide --> */}
                <div className="carousel-item active"><img src="assets/img/w_shop_105_01.png" alt="w_shop_105_01"/>
                    {/* <!-- Start: Left Box --> */}
                    <div className="w_shop_105_left_box"><span data-animation="animated fadeInLeft" style={{fontFamily: "roboto"}}>$535.00</span>
                        <h1 className="left-h" data-animation="animated fadeInLeft">product name and modal number</h1>
                        <p data-animation="animated fadeInLeft">Lorem ipsum dolor sit amet onsectetuer adipiscing elit unc varius facilisis eros in velit quis arcu ornare laoreet urabitur adipiscing luctus massa.</p><a href="#" data-animation="animated fadeInLeft" style={{backgroundColor: "#58a5ff"}}>order now</a></div>
                    {/* <!-- End: Left Box --> */}
                    {/* <!-- Start: Right Box --> */}
                    <div className="w_shop_105_right_box" data-animation="animated fadeInRight">
                        <ul>
                            <li data-animation="animated fadeInRight">some features</li>
                            <li data-animation="animated fadeInRight">some other features</li>
                            <li data-animation="animated fadeInRight">some more features</li>
                            <li data-animation="animated fadeInRight">other features</li>
                            <li data-animation="animated fadeInRight">features and features</li>
                        </ul>
                    </div>
                    {/* <!-- End: Right Box --> */}
                </div>
                {/* <!-- End: 1st Slide --> */}
                {/* <!-- Start: 2nd Slide --> */}
                <div className="carousel-item"><img src="assets/img/w_shop_105_02.png" alt="w_shop_105_02"/>
                    {/* <!-- Start: Left Box --> */}
                    <div className="w_shop_105_left_box"><span data-animation="animated fadeInLeft" style={{fontFamily: "roboto"}}>$535.00</span>
                        <h1 className="left-h" data-animation="animated fadeInLeft">product name and modal number</h1>
                        <p data-animation="animated fadeInLeft">Lorem ipsum dolor sit amet onsectetuer adipiscing elit unc varius facilisis eros in velit quis arcu ornare laoreet urabitur adipiscing luctus massa.</p><a href="#" data-animation="animated fadeInLeft" style={{backgroundColor: "#58a5ff"}}>order now</a></div>
                    {/* <!-- End: Left Box --> */}
                    {/* <!-- Start: Right Box --> */}
                    <div className="w_shop_105_right_box" data-animation="animated fadeInRight">
                        <ul>
                            <li data-animation="animated fadeInRight">some features</li>
                            <li data-animation="animated fadeInRight">some other features</li>
                            <li data-animation="animated fadeInRight">some more features</li>
                            <li data-animation="animated fadeInRight">other features</li>
                            <li data-animation="animated fadeInRight">features and features</li>
                        </ul>
                    </div>
                    {/* <!-- End: Right Box --> */}
                </div>
                {/* <!-- End: 2nd Slide --> */}
                {/* <!-- Start: 3rd Slide --> */}
                <div className="carousel-item"><img src="assets/img/w_shop_105_03.png" alt="w_shop_105_03"/>
                    {/* <!-- Start: Left Box --> */}
                    <div className="w_shop_105_left_box"><span data-animation="animated fadeInLeft" style={{fontFamily: "roboto"}}>$535.00</span>
                        <h1 className="left-h" data-animation="animated fadeInLeft">product name and modal number</h1>
                        <p data-animation="animated fadeInLeft">Lorem ipsum dolor sit amet onsectetuer adipiscing elit unc varius facilisis eros in velit quis arcu ornare laoreet urabitur adipiscing luctus massa.</p><a href="#" data-animation="animated fadeInLeft" style={{backgroundColor: "#58a5ff"}}>order now</a></div>
                    {/* <!-- End: Left Box --> */}
                    {/* <!-- Start: Right Box --> */}
                    <div className="w_shop_105_right_box" data-animation="animated fadeInRight">
                        <ul>
                            <li data-animation="animated fadeInRight">some features</li>
                            <li data-animation="animated fadeInRight">some other features</li>
                            <li data-animation="animated fadeInRight">some more features</li>
                            <li data-animation="animated fadeInRight">other features</li>
                            <li data-animation="animated fadeInRight">features and features</li>
                        </ul>
                    </div>
                    {/* <!-- End: Right Box --> */}
                </div>
                {/* <!-- End: 3rd Slide --> */}
            </div>
            {/* <!-- End: Wrapper For Slides --> */}
        </div>
    </section>
    {/* <!-- End: featured products slider --> */}
    {/* <!-- Start: Team --> */}
    <section id="team" className="bg-light-gray">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h2 data-aos="zoom-in" className="section-heading">Our Amazing Team</h2>
                    <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur. </h3>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4 col-md-3">
                    <div className="team-member"><img className="rounded-circle img-fluid" src="assets/img/Kay.jpg"/>
                        <h4>Kay Garland</h4>
                        <p className="text-muted">Lead Designer</p>
                    </div>
                </div>
                <div className="col-sm-4 col-md-3">
                    <div className="team-member"><img className="rounded-circle img-fluid" src="assets/img/Kay.jpg"/>
                        <h4>Kay Garland</h4>
                        <p className="text-muted">Lead Designer</p>
                    </div>
                </div>
                <div className="col-sm-4 col-md-3">
                    <div className="team-member"><img className="rounded-circle img-fluid" src="assets/img/Larry.jpg"/>
                        <h4>Larry Parker</h4>
                        <p className="text-muted">Lead Marketer</p>
                    </div>
                </div>
                <div className="col-sm-4 col-md-3">
                    <div className="team-member"><img className="rounded-circle img-fluid" src="assets/img/Diana.jpg"/>
                        <h4>Diana Pertersen</h4>
                        <p className="text-muted">Lead Developer</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-8 offset-lg-2 text-center" data-aos="fade-up">
                    <p className="large text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut eaque, laboriosam veritatis, quos non quis ad perspiciatis, totam corporis ea, alias ut unde.</p>
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
