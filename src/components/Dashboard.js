import React, { Component } from 'react';
import axios from 'axios';
import File from '../icons/file.png';
import Export from '../icons/export.png';
import { Redirect } from 'react-router-dom'
import { Modal, ModalBody } from 'reactstrap';
import '../styles/Dashboard.css';

class Dashboard extends Component{

    state = {
        file: null,
        setModal: false,
        redirectToViewer: false
    }

    onFormSubmit = e => {
        e.preventDefault() // Stop form submit
        this.fileUpload(this.state.file).then((response)=>{
            console.log(response.data);
        })
    }

    onChange = e => {
        this.setState({file:e.target.files[0]})
    }

    fileUpload = file =>{
        const url = 'https://mangomedical.herokuapp.com/upload/';
        const formData = new FormData();
        formData.append('med-file', file)
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'content-type': 'multipart/form-data'
            }
        }
        return  axios.post(url, formData,config)
    }

    fileDropped = () => {

        this.setState({
            setModal: true
        })

    }

    redirectToViewer = () => {

        this.setState({
            redirectToViewer: true
        })

    }

    render() {
        return (

            <div  className="upload-parent">

                { this.state.redirectToViewer && <Redirect to="/viewer" /> }

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

                <div className="upload-body">

                    <form onSubmit={this.onFormSubmit} className="form" >

                        <div className="form-group files color">
                            <br />
                            <label htmlFor="file-upload">Please select a file or drop a file here</label>
                            <input type="file" className="form-control" accept=".nii, .nii.gz" onChange={this.fileDropped} />
                        </div>

                    </form>

                </div>

                <Modal isOpen={true/* this.state.setModal */} backdrop="static" size="lg" centered>
                    <ModalBody>
                        <div className="modalContent">
                            <h5>Our application is currently under development</h5>
                            <br />Thank you for your interest in Mango Medical’s Invue procedure planning application. Our application is still currently being developed and will be available shortly.
                            <br /><br />In the meantime, feel free to test out how Invue works using our sample file.
                            <br /><br />
                            <button onClick={this.redirectToViewer} className="useSampleFile">Use Sample File</button>
                        </div>
                    </ModalBody>

                </Modal>

            </div>

        );
    }
}

export default Dashboard;