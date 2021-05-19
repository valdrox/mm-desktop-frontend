import React from 'react'
import { Redirect } from 'react-router-dom';
import { GLTFExporter } from '../exporters/GLTFExporter'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three/build/three.module';
import Export from '../icons/export.png';
import spine from '../stls/combine.glb';
import Label from '../icons/label.png'
import Measure from '../icons/measure.png'
import Angle from '../icons/angle.png'
import Crosshair from '../icons/crosshair.png'
import Layout from '../icons/layout.png'
import screw from '../stls/screw.glb';
import combined from '../stls/spine1.glb'
import LeftNavbar from "./LeftNavbar/LeftNavbar";
import '../styles/Three.css';

class Three extends React.Component{

    state = {
        control: 'translate',
        redirectToUpload: false,
        activeMenu: 'translate',
        panTooltipOpen: false,
        objectLoaded: spine,
        loading: true,
        screw: screw,
        leftScrew: false,
        rightScrew: false
    }


    loadViewer = async () => {

        const renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight - 95 );
        document.getElementById("viewer").appendChild( renderer.domElement );

        const aspect = window.innerWidth / window.innerHeight;

        const cameraPersp = new THREE.PerspectiveCamera( 50, aspect, 0.01, 30000 );
        const cameraOrtho = new THREE.OrthographicCamera( - 600 * aspect, 600 * aspect, 600, - 600, 0.01, 30000 );
        const currentCamera = cameraPersp;
//1000,500,1000
        currentCamera.position.set( 0, 500, 1000 );
        currentCamera.lookAt( 0, 200, 0 );

        const scene = new THREE.Scene();
        scene.background = new THREE.Color('black');
        scene.add( new THREE.GridHelper( 5000, 6, 0x888888, 0x444444 ) );

        const  light = new THREE.DirectionalLight( 0xffffff, 2 );
        light.position.set( 1, 1, 1 );
        scene.add( light );

        const  light2 = new THREE.DirectionalLight( 0xffffff, 2 );
        light2.position.set( -1, -1, -1 );
        scene.add( light2 );



        /* const  texture = new THREE.TextureLoader().load( require('../textures/crate.gif'), () => renderer.render( scene, currentCamera ) );
         texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

         const material = new THREE.MeshBasicMaterial( { map: texture } )
         const newMaterial = new THREE.MeshStandardMaterial({color: 0x2F80ED});*/

        const gltfLoader = new GLTFLoader();
        let angle = 0;
        let radius = 500;
/*
          await axios.get('http://mangomedical.herokuapp.com/api/files/')
              .then(res =>{

                  console.log(res)


                  res.data.forEach((object, index) => {

                      axios.get(object.file, {
                          responseType: "arraybuffer"
                      })
                          .then(res2 => {

                              gltfLoader.parse(res2.data, "", (gltf) => {

                                  const root = gltf.scene;
                                  root.scale.set(2, 2, 2);

                                  if(index === 0){

                                      document.getElementById("C5").addEventListener("click", () => {

                                          root.traverse((o) => {
                                              if (o.isMesh) {
                                                  o.material.emissive = new THREE.Color( 0x00ffff );
                                              }
                                          });

                                          renderer.render( scene, currentCamera )

                                      })

                                  }

                                  scene.add(root);

                              })


                          })

                  })

              })*/



        gltfLoader.load(combined, (gltf) => {

            const root = gltf.scene;
            root.scale.set(2,2,2);

            root.traverse((o) => {
                if (o.isMesh) {
                    o.material.opacity = 0.6;
                    o.material.transparent = true;
                }
            });

            const box = new THREE.Box3().setFromObject( gltf.scene );
            const center = box.getCenter( new THREE.Vector3() );

            gltf.scene.position.x += ( gltf.scene.position.x - center.x );
            gltf.scene.position.y += ( gltf.scene.position.y - center.y );
            gltf.scene.position.z += ( gltf.scene.position.z - center.z );
            scene.add(root);

            /* document.querySelector(".export").addEventListener('click', () => {

                 scene.traverse (function (object)
                 {

                    // console.log(object);
                     const gltfExporter = new GLTFExporter();
                     const options = {};

                     if(object.type==="Group"){

                         gltfExporter.parse( object, function ( result ) {
                             if ( result instanceof ArrayBuffer ) {
                                 this.saveArrayBuffer( result, 'scene.glb' );
                             } else {
                                 const output = JSON.stringify( result, null, 2 );
                                 //console.log( output );
                                 //this.saveString( output, 'scene.gltf' );

                                 const blob = new Blob( [ output ], { type: 'text/plain' } );

                                 zip.file("scene.glb", blob);
                             }
                         }, options );

                     }
                 });
             /*    const link = document.createElement( 'a' );
                 link.style.display = 'none';
                 document.body.appendChild( link ); // Firefox workaround, see #6594

                 link.href = URL.createObjectURL( zip );
                 link.download = 'scene_content.zip';
                 link.click();


             });
*/
        });


        /*
                const pointA = new THREE.Vector3( 800, 100, 500 );
                const pointB = new THREE.Vector3();

                const markerA = new THREE.Mesh( new THREE.SphereGeometry( 0.1, 10, 20 ), new THREE.MeshBasicMaterial( { color: 0xFF5555, depthTest: false, depthWrite: false } ) );
                const markerB = markerA.clone();
                scene.add( markerA );
                scene.add( markerB );

                let line = null;

                document.addEventListener('mousedown', (event) => {

                    const vector = new THREE.Vector2();

                    vector.set(
                        ( event.clientX / window.innerWidth ) * 2 - 1,
                        - ( event.clientY / window.innerHeight ) * 2 + 1 );

                    const raycaster = new THREE.Raycaster();
                    raycaster.setFromCamera( vector, currentCamera );

                    const intersects = raycaster.intersectObjects( scene.children );

                    if( intersects.length > 0 ){


                        markerA.position.copy( pointA );
                        markerB.position.copy( pointB );

                        const distance = pointA.distanceTo( pointB );

                        if ( line instanceof THREE.Line ) {
                            scene.remove( line );
                        }
                        if ( distance > 0 ) {
                            console.log( "distance", distance );
                            //line = getLine( pointA, pointB );

                            const geometry = new THREE.Geometry();
                            geometry.vertices.push( pointA );
                            geometry.vertices.push( pointB );
                            const material = new THREE.LineBasicMaterial({
                                color: 0xFF5555,
                                depthWrite: false,
                                depthTest: false
                            });
                            line = new THREE.Line( geometry, material );

                            scene.add(line);
                        }
                    }

                }, false); */

        /*
                gltfLoader.load(this.state.screw, (gltf) => {

                    const root = gltf.scene;

                    /* root.traverse((o) => {
                         if (o.isMesh) o.material = material;
                     });

                    root.scale.set(4, 4, 4);
                    root.position.set(250,0,0);

        /*
                    const orbit2 = new OrbitControls( currentCamera, renderer.domElement );
                    orbit2.update();
                    orbit2.addEventListener( 'change', () => renderer.render( scene, currentCamera ) );

                    const control2 = new TransformControls( currentCamera, renderer.domElement );
                    control2.addEventListener( 'change', () => renderer.render( scene, currentCamera ) );
                    control2.setMode( this.state.control );
                    control2.position.x = 0;
                    control2.position.y = 0;
                    control2.position.z = 0;
                    control2.addEventListener( 'dragging-changed', function ( event ) {

                        orbit2.enabled = ! event.value;

                    } );

                    control2.attach( root );
                    scene.add( control2 );

                    scene.add(root)
        */

        /*
                    window.addEventListener( 'keydown', function ( event ) {

                        switch ( event.keyCode ) {

                            case 87: // W
                                control2.setMode( "translate" );
                                break;

                            default:
                                control2.setMode( "rotate" );

                        }

                    } );

                    document.querySelector(".rotate").addEventListener('click', () => {

                        control2.setMode( "rotate" );

                        this.setState({
                            activeMenu: 'rotate'
                        })

                    });

                    document.querySelector(".translate").addEventListener('click', () => {

                        control2.setMode( "translate" );

                        this.setState({
                            activeMenu: 'translate'
                        })

                    });

                    window.addEventListener( 'keydown', function ( event ) {

                        switch ( event.keyCode ) {

                            case 87: // W
                                control2.detach(root)

                            default:
                                control2.setMode( "translate" );

                        }

                    } );

                });*/

        const orbit2 = new OrbitControls( currentCamera, renderer.domElement );
        orbit2.update();
        orbit2.addEventListener( 'change', () => renderer.render( scene, currentCamera ) );

        gltfLoader.load(this.state.screw, (gltf) => {

            const root = gltf.scene;

            /*   const raycaster = new THREE.Raycaster();
               const mouse = new THREE.Vector2()

               renderer.domElement.addEventListener('click', (event) => {

                   event.preventDefault();

                   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

                   raycaster.setFromCamera(mouse, currentCamera);

                   const intersects = raycaster.intersectObject(scene, true);

                   if (intersects.length > 0) {

                       const object = intersects[0].object;

                       if(object.type === "Mesh" && object.id === 18){

                           const control = new TransformControls( currentCamera, renderer.domElement );
                           control.addEventListener( 'change', () => renderer.render( scene, currentCamera ) );
                           control.setMode( this.state.control );
                           control.position.x = 0;
                           control.position.y = 0;
                           control.position.z = 0;
                           control.addEventListener( 'dragging-changed', function ( event ) {

                               orbit2.enabled = ! event.value;

                           } );

                           control.attach( object );
                           scene.add( control );

                       }

                   }

                   renderer.render( scene, currentCamera );

               }, false); */


            document.getElementById("enable-right-control").addEventListener("click", (event) => {

                this.setState({
                    rightScrew: true
                })

                const control = new TransformControls( currentCamera, renderer.domElement );
                control.addEventListener( 'change', () => renderer.render( scene, currentCamera ) );
                control.setMode( this.state.control );
                control.position.x = 0;
                control.position.y = 0;
                control.position.z = 0;
                control.addEventListener( 'dragging-changed', function ( event ) {

                    orbit2.enabled = ! event.value;

                } );


                document.getElementById("disable-right-control").addEventListener("click", (event) => {

                    this.setState({
                        rightScrew: false
                    })

                    control.detach(root);

                    renderer.render( scene, currentCamera )

                });

                document.getElementById("translate-right").addEventListener("click", (event) => {

                    control.setMode("translate")

                    renderer.render( scene, currentCamera )

                });

                document.getElementById("rotate-right").addEventListener("click", (event) => {

                    control.setMode("rotate")

                    renderer.render( scene, currentCamera )

                });

                control.attach( root );
                scene.add( control );
                renderer.render( scene, currentCamera )

            });



            root.scale.set(4, 4, 4);
            root.position.set(250,0,0);

            scene.add(root)

        });

        gltfLoader.load(this.state.screw, (gltf) => {

            const root = gltf.scene;

            const raycaster = new THREE.Raycaster();
            const mouse = new THREE.Vector2()

            renderer.domElement.addEventListener('click', (event) => {

                event.preventDefault();

                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

                raycaster.setFromCamera(mouse, currentCamera);

                const intersects = raycaster.intersectObject(scene, true);

                if (intersects.length > 0) {

                    const object = intersects[0].object;

                    if(object.type === "Mesh" && object.id === 19){

                        const control2 = new TransformControls( currentCamera, renderer.domElement );
                        control2.addEventListener( 'change', () => renderer.render( scene, currentCamera ) );
                        control2.setMode( this.state.control );
                        control2.position.x = 0;
                        control2.position.y = 0;
                        control2.position.z = 0;
                        control2.addEventListener( 'dragging-changed', function ( event ) {

                            orbit2.enabled = ! event.value;

                        } );

                        control2.attach( object );
                        scene.add( control2 );

                    }

                }

                renderer.render( scene, currentCamera );

            }, false);

            document.getElementById("enable-left-control").addEventListener("click", (event) => {

                this.setState({
                    leftScrew: true
                })

                const control2 = new TransformControls( currentCamera, renderer.domElement );
                control2.addEventListener( 'change', () => renderer.render( scene, currentCamera ) );
                control2.setMode( this.state.control );
                control2.position.x = 0;
                control2.position.y = 0;
                control2.position.z = 0;
                control2.addEventListener( 'dragging-changed', function ( event ) {

                    orbit2.enabled = ! event.value;

                } );

                document.getElementById("disable-left-control").addEventListener("click", (event) => {

                    this.setState({
                        leftScrew: false
                    })

                    control2.detach(root);

                    renderer.render( scene, currentCamera )

                });

                document.getElementById("translate-left").addEventListener("click", (event) => {

                    control2.setMode("translate")

                    renderer.render( scene, currentCamera )

                });

                document.getElementById("rotate-left").addEventListener("click", (event) => {

                    control2.setMode("rotate")

                    renderer.render( scene, currentCamera )

                });

                control2.attach( root );
                scene.add( control2 );
                renderer.render( scene, currentCamera )

            });

            root.scale.set(4, 4, 4);
            root.position.set(-250,0,0);

            scene.add(root)

        });
        /*
                const raycaster = new THREE.Raycaster();
                const mouse = new THREE.Vector2()

                renderer.domElement.addEventListener('click', (event) => {

                    event.preventDefault();

                    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

                    raycaster.setFromCamera(mouse, currentCamera);

                    const intersects = raycaster.intersectObject(scene, true);

                    if (intersects.length > 0) {

                        const object = intersects[0].object;

                        if(object.type === "Mesh"){

                        }

                    }

                    renderer.render( scene, currentCamera );

                }, false);*/


    }

    exportGLTF = ( input ) => {

        const gltfExporter = new GLTFExporter();

        const options = {};

        gltfExporter.parse( input, function ( result ) {

            if ( result instanceof ArrayBuffer ) {

                //this.saveArrayBuffer( result, 'scene.glb' );

            } else {

                const output = JSON.stringify( result, null, 2 );
                console.log( output );
                //this.saveString( output, 'scene.gltf' );

                const blob = new Blob( [ output ], { type: 'text/plain' } );

                const link = document.createElement( 'a' );
                link.style.display = 'none';
                document.body.appendChild( link ); // Firefox workaround, see #6594

                link.href = URL.createObjectURL( blob );
                link.download = 'scene.gltf';
                link.click();

            }

        }, options );

    }


    componentDidMount = async () => {

        this.loadViewer();

    }

    redirectToUpload = () => {

        window.onload = function () {

            document.getElementById("#root").innerHTML = "";

            this.setState({
                redirectToUpload: true
            })

        };

    }

    togglePanTooltip = () => {

        //  setTimeout(() => {
        this.setState({ panTooltipOpen: !this.state.panTooltipOpen })
        //  }, 1500);

    }


    render() {

        return (

            <>

                <div className="viewer-parent">
                    {console.log(this.state)}
                    { this.state.redirectToUpload && <Redirect to="/upload" /> }

                    <div className="row no-gutters upload-navbar">

                        <div className="col-md-0.1">
                        </div>

                        <div className="col-md-10">
                            <div className="row">

                                <div className={`col-sm-1`}>
                                    <a className="translate">
                                        <img src={Label} /> <br />
                                        Label
                                    </a>
                                </div>

                                <div className={`col-sm-1`}>
                                    <a className="rotate">
                                        <img src={Measure} /> <br />
                                        Measure
                                    </a>
                                </div>

                                <div className={`col-sm-1`}>
                                    <a className="rotate">
                                        <img src={Angle} /> <br />
                                        Angle
                                    </a>
                                </div>

                                <div className={`col-sm-1`}>
                                    <a className="rotate">
                                        <img src={Crosshair} /> <br />
                                        Crosshair
                                    </a>
                                </div>


                                <div className={`col-sm-1`}>
                                    <a className="rotate">
                                        <img src={Layout} /> <br />
                                        Layout
                                    </a>
                                </div>

                                <div className="col-sm-1">
                                    <a className="export">
                                        <img src={Export} /> <br />
                                        Export
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>

                <div className="row no-gutters">

                    <div className="col-md-2 controls">

                        <div className="screws">

                            <h4>Left Screw</h4>

                            <div className="row">
                                <div className="col-sm-6">
                                    <button id="enable-left-control">Enable</button>
                                </div>
                                <div className="col-sm-6">
                                    <button id="disable-left-control">Disable</button>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-6">
                                    <button id="rotate-left" disabled={this.state.leftScrew === false ? true : false}>Rotate</button>
                                </div>
                                <div className="col-sm-6">
                                    <button id="translate-left" disabled={this.state.leftScrew === false ? true : false}>Translate</button>
                                </div>
                            </div>

                        </div>

                        <div className="screws">

                            <h4>Right Screw</h4>

                            <div className="row">
                                <div className="col-sm-6">
                                    <button id="enable-right-control">Enable</button>
                                </div>
                                <div className="col-sm-6">
                                    <button id="disable-right-control">Disable</button>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-6">
                                    <button id="rotate-right" disabled={this.state.rightScrew === false}>Rotate</button>
                                </div>
                                <div className="col-sm-6">
                                    <button id="translate-right" disabled={this.state.rightScrew === false}>Translate</button>
                                </div>
                            </div>

                        </div>


                        <LeftNavbar />
                    </div>

                    <div className="col-md-10" id="viewer"></div>

                </div>

            </>
        );
    }

}

export default Three;