import React from 'react';
import SingleOption from "./SingleOption";
import '../../styles/LeftNavbar.css';

const LeftNavbar = () => {

    return(

        <>

            <div className="accordion" id="accordionExample">
                <div className="card">
                    <div className="card-header" id="headingOne">
                        <h2 className="mb-0">
                            <button className="btn btn-block text-left" type="button"
                                    data-toggle="collapse" data-target="#collapseOne" aria-expanded="true"
                                    aria-controls="collapseOne">
                                Cervical
                            </button>
                        </h2>
                    </div>

                    <div id="collapseOne" className="collapse collapses" aria-labelledby="headingOne">
                        <div className="card-body">

                            <SingleOption value="C1" />
                            <SingleOption value="C2" />
                            <SingleOption value="C3" />
                            <SingleOption value="C4" />
                            <SingleOption value="C5" />
                            <SingleOption value="C6" />
                            <SingleOption value="C7" />

                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="headingTwo">
                        <h2 className="mb-0">
                            <button className="btn btn-block text-left collapsed" type="button"
                                    data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false"
                                    aria-controls="collapseTwo">
                                Thoracic
                            </button>
                        </h2>
                    </div>
                    <div id="collapseTwo" className="collapse collapses" aria-labelledby="headingTwo">
                        <div className="card-body">

                            <SingleOption value="T1" />
                            <SingleOption value="T2" />
                            <SingleOption value="T3" />
                            <SingleOption value="T4" />
                            <SingleOption value="T5" />
                            <SingleOption value="T6" />
                            <SingleOption value="T7" />
                            <SingleOption value="T8" />
                            <SingleOption value="T9" />
                            <SingleOption value="T10" />
                            <SingleOption value="T11" />
                            <SingleOption value="T12" />

                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="headingThree">
                        <h2 className="mb-0">
                            <button className="btn btn-block text-left collapsed" type="button"
                                    data-toggle="collapse" data-target="#collapseThree"
                                    aria-expanded="false" aria-controls="collapseThree">
                                Lumbar
                            </button>
                        </h2>
                    </div>
                    <div id="collapseThree" className="collapse collapses" aria-labelledby="headingThree">
                        <div className="card-body">

                            <SingleOption value="L1" />
                            <SingleOption value="L2" />
                            <SingleOption value="L3" />
                            <SingleOption value="L4" />
                            <SingleOption value="L5" />

                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="headingFour">
                        <h2 className="mb-0">
                            <button className="btn btn-block text-left collapsed" type="button"
                                    data-toggle="collapse" data-target="#collapseFour"
                                    aria-expanded="false" aria-controls="collapseFour">
                                Sacrum & Coccyx
                            </button>
                        </h2>
                    </div>
                    <div id="collapseFour" className="collapse collapses" aria-labelledby="headingFour">
                        <div className="card-body">

                            <SingleOption value="S1" />
                            <SingleOption value="S2" />
                            <SingleOption value="S3" />
                            <SingleOption value="S4" />
                            <SingleOption value="S5" />

                        </div>
                    </div>
                </div>
            </div>

        </>

    )

};

export default LeftNavbar;