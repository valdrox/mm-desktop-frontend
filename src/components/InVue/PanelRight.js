import React, { useState } from "react";
import PanelScan from "./PanelScan";
import Export from '../../icons/export.svg';
import "./Panel.css";

export default function PanelRight(props) {

    const [tab, setTab] = useState("implants");
    const [screw_size, setScrewSize] = useState("screw_size");

    function changeScrewSize(event){
        setScrewSize(event.target.value)

        props.updateScrewSize(event.target.value);

    }

    return (
        <div className="Panel right">
            <div className="row options">
                <h5 onClick={() => setTab("scans")} style={{color: tab === "scans" && '#3589FF', paddingLeft: '5px'}}>
                    CT Scans
                </h5>
                <h5 onClick={() => setTab("implants")} style={{color: tab === "implants" && '#3589FF', paddingRight: '5px'}}>
                    Implant Options
                </h5>
            </div>
            {tab === "scans" && (
                <React.Fragment>
                    <PanelScan image="/placeholder/ct-front.png" />
                    <PanelScan image="/placeholder/ct-side.png" />
                    <PanelScan image="/placeholder/ct-top.png" />
                </React.Fragment>
            )}
            {tab === "implants" && (
                <div className="rightbar_information">
                    {/*  <button onClick={props.addNewImplant}>Add Implant</button>
                      <select size="1">
                        <option>Screw 1</option>
                    </select>*/}

                    <div className="row screw_size">
                        <select name="screw_scale" value={screw_size} onChange={changeScrewSize} className="screw_size_select">
                            <option value="screw_size" disabled>Screw Size</option>
                            <option value="0.01">0.01</option>
                            <option value="0.02">0.02</option>
                            <option value="0.03">0.03</option>
                            <option value="0.04">0.04</option>
                            <option value="0.05">0.05</option>
                        </select>
                    </div>

                    <div className="row screw_position">
                        <div className="col-sm-6">
                            Position<br />
                            <div className="row no-gutters">
                                <div className="col-sm-2">X</div>
                                <div className="col-sm-10"><input type="text" value={props.screwPosition.x && props.screwPosition.x.toFixed(2)} disabled /> <br/></div>
                            </div>
                            <div className="row no-gutters">
                                <div className="col-sm-2">Y</div>
                                <div className="col-sm-10"><input type="text" value={props.screwPosition.y && props.screwPosition.y.toFixed(2)} disabled /> <br/></div>
                            </div>
                            <div className="row no-gutters">
                                <div className="col-sm-2">Z</div>
                                <div className="col-sm-10"><input type="text" value={props.screwPosition.z && props.screwPosition.z.toFixed(2)} disabled /> <br/></div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            Rotation<br />
                            <div className="row no-gutters">
                                <div className="col-sm-2">X</div>
                                <div className="col-sm-10"><input type="text" value={props.screwRotation.x && props.screwRotation.x.toFixed(2)} disabled /> <br/></div>
                            </div>
                            <div className="row no-gutters">
                                <div className="col-sm-2">Y</div>
                                <div className="col-sm-10"><input type="text" value={props.screwRotation.y && props.screwRotation.y.toFixed(2)} disabled /> <br/></div>
                            </div>
                            <div className="row no-gutters">
                                <div className="col-sm-2">Z</div>
                                <div className="col-sm-10"><input type="text" value={props.screwRotation.z && props.screwRotation.z.toFixed(2)} disabled /> <br/></div>
                            </div>
                        </div>

                    </div>

                    <div style={{height: '140px'}}></div>

                    <div className="export_plan_parent">
                        <button className="export_plan" onClick={props.shouldExportScene}><img src={Export} /><br />Export Plan</button>
                    </div>

                </div>
            )}
        </div>
    );
}