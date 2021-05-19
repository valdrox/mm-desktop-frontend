import React, { Component } from 'react';
import { BarLoader } from "react-spinners";
import { Redirect } from 'react-router-dom';
import Tick from '../images/tick.png';
import File from "../icons/file.png";
import Export from "../icons/export.png";
import '../styles/Processing.css';

class Processing extends Component{

    state = {
        loading: true,
        showLoadingFile: false,
        showRenderingModel: false,
        placeSrew: false,
        showButton: false,
        toViewer: false
    }

    componentDidMount() {

        setTimeout(() => {

            this.setState({
                showLoadingFile: true
            })

            this.renderModel();

        }, 2000)

    }

    renderModel = () => {

        setTimeout(() => {

            this.setState({
                showRenderingModel: true
            })

            this.showButton()

        }, 2000)

    }

    showButton = () => {

        setTimeout(() => {

            this.setState({ showButton: true })

        }, 2000)

    }

    redirectToViewer = () => {

        this.setState({
            showButton: true
        })

    }

    slowlyRedirectToViewer = () => {

        this.setState({
            toViewer: true
        })

    }

    render() {

        const override = {
            display: 'block',
            margin: '0 auto',
            borderColor:'red'
        }

        return (
            <div className="processing">

                { this.state.toViewer && <Redirect to="/viewer" /> }

                <div className="row no-gutters upload-navbar">

                    <div className="col-md-0.1">
                    </div>

                    <div className="col-md-10">
                        <div className="row">
                            <div className="col-sm-1">
                                <img src={File} /> <br />
                                <a href="#">File</a>
                            </div>
                            <div className="col-sm-1">
                                <img src={Export} /> <br />
                                <a href="#">Export</a>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="loading">
                    <div>

                        <BarLoader css={override} width={500} color={"orange"} loading={!this.state.showButton ? true : false} />

                        <br />
                        <br />
                        <br />

                        <div>
                            <div className={this.state.showLoadingFile ? 'showing' : 'hidden'}>
                                Loading sample_file.glb <span style={{display: 'inline-block', width: '18px'}}></span>
                                <img src={Tick} />
                            </div>

                            <br />

                            <div className={this.state.showRenderingModel ? 'showing' : 'hidden'}>
                                Rendering 3D Model <span style={{display: 'inline-block', width: '36px'}}></span>
                                <img src={Tick} />
                            </div>

                            <br />

                            <div className={this.state.showButton ? 'showing' : 'hidden'}>
                                <button className="to-planning" onClick={this.slowlyRedirectToViewer}>To Planning</button>
                            </div>


                        </div>

                    </div>

                </div>

            </div>
        );
    }

}

export default Processing;