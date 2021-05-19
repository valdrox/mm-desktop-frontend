import React from "react";
import { Redirect } from "react-router-dom";
import { Col } from "reactstrap";
import Toolbar from "./InVue/Toolbar";
import WorldView from "./InVue/WorldView";
import PanelLeft from "./InVue/PanelLeft";
import PanelRight from "./InVue/PanelRight";
import Overlay from "./InVue/Overlay";
import "../styles/InVue.css";

const THREE_MOUSE_ROTATE = 0;
const THREE_MOUSE_DOLLY = 1;
const THREE_MOUSE_PAN = 2;

class InVue extends React.Component {
    state = {
        redirectToUpload: false,
        selectedVertebrae: {},
        mouseControls: {
            LEFT: THREE_MOUSE_ROTATE,
            MIDDLE: THREE_MOUSE_DOLLY,
            RIGHT: THREE_MOUSE_PAN,
        },
        screwPosition: {},
        screwRotation: {},
        screw_size: '0.02',
        screwControlMode: '',
        shouldExportScene: false,
        resultFile: null,
        landmarks: null
    };

    constructor(props) {
        super(props)

        const url = 'http://ec2-107-23-76-72.compute-1.amazonaws.com/api/files/32/';
        const request = new Request(url)
        fetch(request)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    resultFile: json["result_file"],
                    landmarks: json["landmarks"]
                })
            })
    }

    /* const [mouseControls, setMouseControls] = useState({
        LEFT: THREE_MOUSE_ROTATE,
        MIDDLE: THREE_MOUSE_DOLLY,
        RIGHT: THREE_MOUSE_PAN,
    }); */

    redirectToUpload = () => {
        window.onload = function() {
            document.getElementById("#root").innerHTML = "";

            this.setState({
                redirectToUpload: true,
            });
        };
    };

    onChangeCameraMode = () => {
        if (this.state.mouseControls.LEFT == THREE_MOUSE_ROTATE) {
            this.setState({
                mouseControls: {
                    LEFT: THREE_MOUSE_PAN,
                    MIDDLE: THREE_MOUSE_DOLLY,
                    RIGHT: THREE_MOUSE_ROTATE,
                },
            });
        } else {
            this.setState({
                mouseControls: {
                    LEFT: THREE_MOUSE_ROTATE,
                    MIDDLE: THREE_MOUSE_DOLLY,
                    RIGHT: THREE_MOUSE_PAN,
                },
            });
        }
    };

    onSelectVertebrae = (selectedVertebrae) => {
        this.setState({ selectedVertebrae });
    };

    updateRightNavPosition = (positions) => {

        this.setState({
            screwPosition: positions
        })

    }

    updateRightNavRotation = (rotations) => {

        this.setState({
            screwRotation: rotations
        })

    }

    updateScrewSize = (size) => {

        this.setState({
            screw_size: size
        })

    }

    selectControlMode = control_mode =>{
        this.setState({
            screwControlMode: control_mode
        })

    }

    selectTranslate = () =>{
        this.setState({
            screwControlMode: 'translate'
        })
    }

    selectRotate = () =>{
        this.setState({
            screwControlMode: 'rotate'
        })
    }

    render() {
        if (this.state.redirectToUpload) return <Redirect to="/upload" />;

        const rotate = this.state.screwControlMode === "rotate" ? "activeScrewControl" : '';
        const translate = this.state.screwControlMode === "translate" ? "activeScrewControl" : '';    

        return (
            <div className="viewer-parent1">
                <div className="upload-navbar">
                    <Toolbar />
                </div>
                <div className="row viewer-main">

                    <PanelLeft onSelectVertebrae={this.onSelectVertebrae} />
                    <Col style={{ backgroundColor: "black" }}>
                        {this.state.resultFile && this.state.landmarks && <WorldView
                            resultFile={this.state.resultFile}
                            landmarks={this.state.landmarks}
                            mouseButtons={this.state.mouseControls}
                            selectedVertebrae={this.state.selectedVertebrae}
                            updatePosition={this.updateRightNavPosition}
                            updateRotation={this.updateRightNavRotation}
                            selectControlMode={this.selectControlMode}
                            controlMode={this.state.screwControlMode}
                            screwSize={this.state.screw_size}
                            shouldExportScene={this.state.shouldExportScene}
                            onExportDone={() =>
                                this.setState({ shouldExportScene: false })
                            }
                        />}
                        <Overlay position="bottom left">
                            <button
                                className="icon"
                                onClick={this.onChangeCameraMode}
                                style={{width: '100%', border: 'none', outline: 'none'}}
                            >
                                <img
                                    src={
                                        this.state.mouseControls.LEFT == THREE_MOUSE_ROTATE
                                            ? "/icons/control-camera-rotate-active.svg"
                                            : "/icons/control-camera-pan-active.svg"
                                    }
                                    className="control-icons"
                                />
                            </button>
                            {/*  <img src="/icons/control-object.svg" /> */}
                        </Overlay>
                        {/*  <Overlay position="top right">
                            <button>&lt;</button>
                        </Overlay>*/}

                        <Overlay position="top right">
                            <div className={`translate_screw transform_screws ${translate}`} onClick={this.selectTranslate}>
                                <img src={this.state.screwControlMode === "translate" ? "/icons/active_translate_screw.svg" : "/icons/translate_screw.png"} alt="translate"/>
                            </div>
                        </Overlay>
                        <Overlay position="top right">
                            <div className={`rotate_screw transform_screws ${rotate}`} onClick={this.selectRotate}>
                                <img src={this.state.screwControlMode === "rotate" ? "/icons/active_rotate_screw.svg" : "/icons/rotate_screw.png"} alt="rotate"/>
                            </div>
                        </Overlay>


                    </Col>
                    <PanelRight
                        screwPosition={this.state.screwPosition}
                        screwRotation={this.state.screwRotation}
                        updateScrewSize={this.updateScrewSize}
                        shouldExportScene={() => this.setState({ shouldExportScene: true })}
                    />
                </div>
            </div>
        );
    }
}

export default InVue;