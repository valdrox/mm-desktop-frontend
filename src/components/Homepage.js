import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Background from '../images/first_section.png';
import Img1 from '../images/img1.png';
import Logo from '../images/logo.png';
import Col1 from '../images/col1.png';
import Col2 from '../images/col2.png';
import Col3 from '../images/col3.png';
import Col4 from '../images/col4.png';
import '../styles/Homepage.css';

class Homepage extends Component{

    state = {
        viewer: false
    }

    preventEventDefault = e => {
        e.preventDefault();
    }

    redirectToViewer = () => {

        this.setState({
            viewer: true
        })

    }

    render() {
        return (
            <div>

                { this.state.viewer && <Redirect to="/upload" /> }

                <nav className="navbar navbar-light">
                    <div className="container">
                        <a className="navbar-brand">
                            <img src={Logo} />
                        </a>
                        <form className="form-inline">

                            <a className="nav-link" href="#">Products <span className="sr-only">(current)</span></a>
                            <a className="nav-link" href="#">About Us <span className="sr-only">(current)</span></a>
                            <a className="nav-link" href="#"><span className="sr-only">(current)</span></a>

                            <span style={{display: 'inline-block', width: '100px'}}></span>

                            <button className="login" onClick={this.preventEventDefault}>Login</button>
                            <button className="start-now">Start Now</button>

                        </form>
                    </div>
                </nav>

                <div className="first_section" style={{background: `url(${Background}) no-repeat`, backgroundSize: '100% 100%'}}>

                    <div className="text">

                        <h1>Plan Faster.</h1>
                        <h1>Plan Smarter.</h1> <br />
                        <p>Streamline spinal surgury planning by leveraging the power of deep learning neural networks</p>
                        <br/><br/><br/><br/>
                        <button id="start-demo" onClick={this.redirectToViewer}>Try Our Demo</button>

                    </div>

                </div>

                <div className="second_section">

                    <div className="text">

                        <h2>Imagine What’s Possible.</h2> <br /><br />

                        <p>Imagine a future where surgeons can understand what to do as soon as they start planning the patient’s surgery procedure. For us, the future is today.</p>

                        <p>Powered by our AI predictive model, our surgical planning software equips clinical professionals and teams with rapid and precise 3D simulations for traumatology. Surgeons will know at a glance the best positions of pedicle screws for spinal fusion procedures with AI assisted implant suggestions, streamlining their planning process and allowing more time for physicians to spend more time with patients. </p>

                    </div>

                </div>

                <div className="third_section row no-gutters">

                    <div className="col-sm-6 first_column">

                        <div>

                            <h2>Smart Segmentation</h2> <br /><br />

                            <p>Using machine learning, our planning software’s identifies segments of the spine from patient CT scan data, isolate each part for model generation and detect irregularites for suggested treatment.</p>
                            <p>Automating segmentation frees up physicians’ time to focus on planning for only the most at risk and complicated parts of the procedure.</p>

                        </div>


                    </div>
                    <div className="col-sm-6 second_column">
                        <img src={Img1} alt=""/>
                    </div>

                </div>

                <div className="third_section row no-gutters">

                    <div className="col-sm-6 second_column">

                        <img src={Img1} alt=""/>

                    </div>

                    <div className="col-sm-6 first_column">

                        <div>

                            <h2>Streamlined Implant Planning</h2> <br /><br />

                            <p>Mango’s software automatically generates 3D models and structures and suggests pedical screw types and location based on the disorders detected as well as proximity to the  Cauda Equina. </p>
                            <p>This provides surgeons a reference for what is happening and what is the best way to proceed in the OR room with minimal risk for the patient.</p>

                        </div>

                    </div>

                </div>

                <div className="fourth_section container">

                    <div>
                        <h1 style={{fontWeight: '600'}}>Benefits of Invue</h1> <br /><br />

                        <div className="row">

                            <div className="col-sm-6">
                                <img src={Col1} alt=""/> <br /><br />
                                <h6>Precise Modelling</h6>
                                <p>Our AI powered modeling creates precise and accurate 3D models for clinical use so that surgeons have the tools they need.</p>
                            </div>

                            <div className="col-sm-6">
                                <img src={Col2} alt=""/> <br /><br />
                                <h6>Higher Efficiency </h6>
                                <p>See the ideal procedure outcome before the surgery and deliver more personalized treatment plans for patients.</p>
                            </div>

                        </div>

                        <br /><br /><br /><br />

                        <div className="row">

                            <div className="col-sm-6">
                                <img src={Col3} alt=""/> <br /><br />
                                <h6>Web-based Solution</h6>
                                <p>Whether you are working from a private practice, a clinic, a hospital or even on the go, access our solution anywhere and start planning.</p>
                            </div>

                            <div className="col-sm-6">
                                <img src={Col4} alt=""/> <br /><br />
                                <h6>Secure & Private</h6>
                                <p>Sensitive patient data is encrypted before it ever leaves your device, ensuring that no patient data gets into the wrong hands.</p>
                            </div>

                        </div>

                    </div>

                </div>

                <div className="fifth_section">

                    <div className="content">

                        <h2 style={{fontSize: '44px'}}>Learn More about Invue</h2>

                        <p style={{color: '#6F6F6F'}}>Get in touch with us and we will answer any questions you may have.</p>

                        <br /><br/>

                        <div className="input-group mb-3" style={{width: '500px'}}>
                            <input type="text" className="form-control" placeholder="Email" aria-label="Email"
                                   aria-describedby="basic-addon1" />
                        </div>

                        <button className="get-in-touch">Get in touch</button>

                    </div>

                    <br />



                </div>

                <div className="footer">

                    <div className="content">

                        <p>Mango Medical</p>

                        <br />

                        <p>© 2020 Mango Medical | DPS | All rights reserved | Impressum</p>

                    </div>

                </div>

            </div>
        );
    }

}

export default Homepage;