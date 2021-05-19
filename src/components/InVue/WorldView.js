import React, {useRef, useState, Suspense, useEffect} from "react";
import { Canvas, useThree } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFExporter } from "../../exporters/GLTFExporter";

import Spine from "./Spine";
import Screw from "./Screw";

const RenderSettings = () => {
    const { gl } = useThree();
    gl.localClippingEnabled = true;
    return null;
};

const ExportScene = (props) => {
    const { scene } = useThree();

    const gltfExporter = new GLTFExporter();
    const options = {};

    scene.traverse (function (object) {

        const gltfExporter = new GLTFExporter();
        const options = {};

        if (object.type === "Group") {

            gltfExporter.parse(object, function (result) {
                if (result instanceof ArrayBuffer) {
                    this.saveArrayBuffer(result, 'scene.glb');
                } else {
                    const output = JSON.stringify(result, null, 2);
                    //console.log( output );
                    //this.saveString( output, 'scene.gltf' );

                    const blob = new Blob([output], {type: 'text/plain'});

                    const link = document.createElement("a");
                    link.style.display = "none";
                    document.body.appendChild(link); // Firefox workaround, see #6594

                    link.href = URL.createObjectURL(blob);
                    link.download = "scene.gltf";
                    link.click();
                }
            }, options);

        }

    })

    props.onDone();

    return null;
};

export default function WorldView(props) {
    const orbit = useRef();
    const canvas = useRef();

    const screws = [];
    const [selectedScrew, setSelectedScrew] = useState("")

    for(const [key, _] of Object.entries(props.landmarks)) {
        const screw1Position = props.landmarks[key].landmark1.slice(1, -1).split(",")
        screw1Position[0] *= 0.01
        screw1Position[1] *= 0.01
        screw1Position[2] *= 0.03
        const screw1Rotation = props.landmarks[key].normal1.slice(1, -1).split(",")
        
        const screw2Position = props.landmarks[key].landmark2.slice(1, -1).split(",")
        screw2Position[0] *= 0.01
        screw2Position[1] *= 0.01
        screw2Position[2] *= 0.03
        const screw2Rotation = props.landmarks[key].normal2.slice(1, -1).split(",")

        screws.push(
            <Screw key={key + "screw1"}
                position={screw1Position}
                rotation={screw1Rotation}
                scale={[props.screwSize, props.screwSize, props.screwSize]}
                selectControlModeOverlay={props.selectControlMode}
                //updateInitialPosition={props.updatePosition}
                //updateInitialRotation={props.updateRotation}
                controlMode={props.controlMode}
                isSelected={selectedScrew == key + "screw1"}
                onClick={() => {
                    setSelectedScrew(key + "screw1")
                }}
                onDrag={event => {
                    //props.updatePosition(event.target.children[1].position)
                    //props.updateRotation(event.target.children[1].rotation)
                }}
                onTransform={(event) => {
                    orbit.current.enabled = !event.value;
                    props.updatePosition(event.target.children[1].position)
                    props.updateRotation(event.target.children[1].rotation)
                }}
            />
            );

        screws.push(
            <Screw key={key + "screw2"}
                position={screw2Position}
                rotation={screw2Rotation}
                scale={[props.screwSize, props.screwSize, props.screwSize]}
                selectControlModeOverlay={props.selectControlMode}
                //updateInitialPosition={props.updatePosition}
                //updateInitialRotation={props.updateRotation}
                controlMode={props.controlMode}
                isSelected={selectedScrew == key + "screw2"}
                onDrag={event => {
                    //props.updatePosition(event.target.children[1].position)
                    //props.updateRotation(event.target.children[1].rotation)
                }}
                onClick={(event) => {
                    setSelectedScrew(key + "screw2")
                }}
                onTransform={(event) => {
                    orbit.current.enabled = !event.value;
                    props.updatePosition(event.target.children[1].position)
                    props.updateRotation(event.target.children[1].rotation)
                }}
            />
            );
    }


    return (
        <Canvas
            onPointerMissed={() => {
                setSelectedScrew("")
                props.selectControlMode("");
                //props.updatePosition({x: 0, y: 0, z:0})
                //props.updateRotation({x: 0, y: 0, z:0})
            }}
            ref={canvas}
        >
            <RenderSettings />
            {props.shouldExportScene && <ExportScene onDone={props.onExportDone} />}
            <ambientLight intensity={0.2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <Suspense fallback={null}>
                <Spine
                    resultFile={props.resultFile}
                    /*position={[0, 12, 0]}  */
                    scale={[0.01, 0.01, 0.03]}
                    selectedVertebrae={props.selectedVertebrae}
                    onTransform={(event) => {
                        orbit.current.enabled = event.cameraControlsEnabled;
                    }}
                ></Spine>

                {screws}

{/*
                <Screw
                    position={[2.21, 0.69, -0.19]} // TODO ADD predicted position
                    scale={[props.screwSize, props.screwSize, props.screwSize]}
                    isSelected={screw1Selected}
                    selectControlModeOverlay={props.selectControlMode}
                    updateInitialPosition={props.updatePosition}
                    updateInitialRotation={props.updateRotation}
                    controlMode={props.controlMode}
                    onClick={() => {
                        setScrew1Selected(!screw1Selected);
                        setScrew2Selected(false);
                    }}
                    onDrag={event => {
                        props.updatePosition(event.target.children[1].position)
                        props.updateRotation(event.target.children[1].rotation)
                    }}
                    onTransform={(event) => {
                        orbit.current.enabled = !event.value;
                        props.updatePosition(event.target.children[1].position)
                        props.updateRotation(event.target.children[1].rotation)
                    }}
                />



                <Screw
                    position={[2.10, 0.68, 0.23]} // TODO ADD predicted position
                    scale={[props.screwSize, props.screwSize, props.screwSize]}
                    isSelected={screw2Selected}
                    selectControlModeOverlay={props.selectControlMode}
                    updateInitialPosition={props.updatePosition}
                    updateInitialRotation={props.updateRotation}
                    controlMode={props.controlMode}
                    onDrag={event => {
                        props.updatePosition(event.target.children[1].position)
                        props.updateRotation(event.target.children[1].rotation)
                    }}
                    onClick={(event) => {
                        setScrew1Selected(false);
                        setScrew2Selected(!screw2Selected);
                    }}
                    onTransform={(event) => {
                        orbit.current.enabled = !event.value;
                        props.updatePosition(event.target.children[1].position)
                        props.updateRotation(event.target.children[1].rotation)
                    }}
                />*/}

            </Suspense>
            <OrbitControls ref={orbit} mouseButtons={props.mouseButtons} />
        </Canvas>
    );
}

/*import React, { useRef, useState, Suspense } from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";

import Spine from "./Spine";
import Screw from "./Screw";

export default function WorldView(props) {
    const orbit = useRef();

    const [screw1Selected, setScrew1Selected] = useState(false);
    const [screw2Selected, setScrew2Selected] = useState(false);

    return (
        <Canvas
            onPointerMissed={() => {
                setScrew1Selected(false);
                setScrew2Selected(false);
            }}
        >
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <Suspense fallback={null}>
                <Spine
                    position={[0, -12, 0]}
                    scale={[0.5, 0.5, 0.5]}
                    selectedVertebrae={props.selectedVertebrae}
                ></Spine>
                <Screw
                    position={[-1, 0, 0]}
                    scale={[0.05, 0.05, 0.05]}
                    isSelected={screw1Selected}
                    onClick={() => {
                        setScrew1Selected(!screw1Selected);
                        setScrew2Selected(false);
                    }}
                    onTransform={(event) => {
                        orbit.current.enabled = !event.value;
                    }}
                />
                <Screw
                    position={[4, 0, 0]}
                    scale={[0.05, 0.05, 0.05]}
                    isSelected={screw2Selected}
                    onClick={() => {
                        setScrew1Selected(false);
                        setScrew2Selected(!screw2Selected);
                    }}
                    onTransform={(event) => {
                        orbit.current.enabled = !event.value;
                    }}
                />
            </Suspense>
            <OrbitControls ref={orbit} mouseButtons={props.mouseButtons} />
        </Canvas>
    );
}*/