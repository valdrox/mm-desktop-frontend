import React, { useRef, useState } from "react";
import { useThree } from "react-three-fiber";
import { useHelper } from "@react-three/drei";
import { useGesture } from "react-use-gesture";
import * as THREE from "three";

function SliceHandle(props) {
    const { size, viewport } = useThree();
    const aspect = size.width / viewport.width;
    const [position, setPosition] = useState(props.position);
    const [startPosition, setStartPosition] = useState(props.position);
    const bind = useGesture({
        onDragStart: () => {
            /* @todo – there's a bug when using the handle repeatedly, which leads to some jumping around */
            setStartPosition(position);
            props.onTransform({ cameraControlsEnabled: false });
        },
        onDrag: ({ offset: [x, y] }) => {
            setPosition([
                startPosition[0],
                startPosition[1],
                startPosition[2] - x / aspect,
            ]);
            /* @todo the onChange should probably be normalized to -1 .. +1 based on the bounding box */
            props.onChange(startPosition[2] - x / aspect);
        },
        onDragEnd: () => props.onTransform({ cameraControlsEnabled: true }),
        /* @todo – for some reason the dragEnd doesn't release the mouse, so now camera is moving – needs some investigation */
    });

    const [handleHover, setHandleHover] = useState(false);

    return (
        <mesh
            position={position}
            onPointerOver={(e) => setHandleHover(true)}
            onPointerOut={(e) => setHandleHover(false)}
            {...bind()}
        >
            <boxBufferGeometry args={[0.02, 1, 0.02]} />
            <meshStandardMaterial color={handleHover ? "hotpink" : "lightblue"} />
        </mesh>
    );
}

export default function Vertebra(props) {
    const mesh = useRef();
    //const plane = useRef();

    const [hover, setHover] = useState(false);
    const [active, setActive] = useState(false);

    const [clipOffset, setClipOffset] = useState(0);

    useHelper(mesh, active ? THREE.BoxHelper : null, "#272740"); // https://codesandbox.io/s/r3f-use-helper-ly6kw

    if (hover) {
        props.material.color.set(0x3589ff);
    } else if (active) {
        props.material.color.set(0x00ffa1);
    } else {
        props.material.color.set(0xafafaf);
    }

    // @todo – find a proper visual+interaction for selecting vertebrae from the side panel
    props.material.wireframe = props.isSelected;

    // Clip vertebrae – @todo design an interaction model – should it be based on screw position or should it be directly manipulated by the user
    const clipPlanes = [
        //new THREE.Plane(new THREE.Vector3(1, 0, 0), -0.3),
        //new THREE.Plane(new THREE.Vector3(0, 1, 0), 0),
        new THREE.Plane(new THREE.Vector3(0, 0, -1), clipOffset),
    ];
    props.material.clippingPlanes = clipPlanes;
    //props.material.side = THREE.DoubleSide;

    const clipPlanesWireframe = [
        //new THREE.Plane(new THREE.Vector3(1, 0, 0), 0),
        //new THREE.Plane(new THREE.Vector3(0, 1, 0), 0),
        new THREE.Plane(new THREE.Vector3(0, 0, 1), -clipOffset),
    ];

    const fillMaterial = new THREE.MeshBasicMaterial({
        color: hover ? 0x3589ff : active ? 0x00ffa1 : 0xffffff,
        side: THREE.BackSide,
    });
    fillMaterial.clippingPlanes = clipPlanes;

    // Copy material for a second mesh to display the vertebra outline even when we slice it
    const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ffa1,
        wireframe: true,
        transparent: true,
        opacity: 0.1,
        clippingPlanes: clipPlanesWireframe,
    });

    const handlePosition = [...props.position];
    handlePosition[0] += 2;

    /* @todo – slice handle position and movement clamping should be calculated based on vertebra bounding box */

    return (
        <>
            <mesh
                ref={mesh}
                material={props.material}
                geometry={props.geometry}
                position={props.position}
                rotation={props.rotation}
                onClick={() => setActive(!active)}
                onPointerOver={(e) => setHover(true)}
                onPointerOut={(e) => setHover(false)}
            />
            <mesh
                material={fillMaterial}
                geometry={props.geometry}
                position={props.position}
                rotation={props.rotation}
            />
            <mesh
                material={wireframeMaterial}
                geometry={props.geometry}
                position={props.position}
                rotation={props.rotation}
            />
            {active && <SliceHandle
                position={handlePosition}
                onTransform={props.onTransform}
                onChange={(p) => setClipOffset(p)}
            />}
        </>
    );
}