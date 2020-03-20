import React, { Component } from "react";
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from 'stats.js';
import classNames from "classnames";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "@Components/Hero/Grid/GridContainer.js";
import GridItem from "@Components/Hero/Grid/GridItem.js";
import Card from "@Components/Hero/Card/Card.js";
import CardBody from "@Components/Hero/Card/CardBody.js";
// Styles
import styles from "@Styles/teamStyle.js";
// Images
import image from "@Assets/images/olo.jpeg";



class TeamSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: true
    }

    // Set ref for threejs to use dom node
    this.threeRef = React.createRef();
    // Init global variables
    this.node = null;
    this.cube = null;
    this.scene = null;
    this.camera = null;
    this.controls = null;
    this.renderer = null;
    this.requestID = null;
    // Stat abstraction from threejs
    this.stats = new Stats();
    // Functions
    this.sceneSetup = this.sceneSetup.bind(this)
    this.startAnimationLoop = this.startAnimationLoop.bind(this)
    this.addCustomSceneObjects = this.addCustomSceneObjects.bind(this)
  }

  // LIFECYCLES

  // Help properly display errors and show diff page
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // On mount call graphic/styling functions
  componentDidMount() {
    // set current ref to dom elem in var
    this.node = this.threeRef.current;
    // 3D Graphics
    this.sceneSetup(this.node, this.scene, this.camera, this.controls, this.renderer);
    Stats.showPanel(1);
    this.node.appendChild(Stats.dom);
    this.startAnimationLoop(this.cube, this.renderer, this.requestID, this.scene, this.camera);
    this.addCustomSceneObjects(this.scene, this.cube);
    // For responsiveness
    window.addEventListener('resize', this.handleWindowResize(this.node, this.renderer, this.camera));
  }
  // Removes all event listners 
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize(this.node, this.renderer, this.camera));
    window.cancelAnimationFrame(this.requestID);
    this.controls.dispose();
  }

  // FUNCTIONS

  sceneSetup = (node, scene, camera, controls, renderer) => {
    // Get container dimensions and use them for scene sizing
    const width = node.clientWidth;
    const height = node.clientHeight;
    // Create scene
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75, // fov = field of view
      width / height, // aspect ratio
      0.1, // near plane
      1000 // far plane
    );
    // Set camera controls
    controls = new OrbitControls(camera, node);
    controls.enableZoom = false
    // Set distance from cude
    camera.position.z = 5;
    // Render graphics in dom
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    node.appendChild(renderer.domElement);
  }
  startAnimationLoop = (cube, renderer, requestID, scene, camera) => {
    Stats.begin();
    // Rotates cube  
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    Stats.end();
    // Renders sets and cycles animation through event loop
    renderer.render(scene, camera);
    requestID = window.requestAnimationFrame(this.startAnimationLoop);
  }
  addCustomSceneObjects = (cube, scene) => {
    // Skeleton of object
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    // Skin of object
    const material = new THREE.MeshPhongMaterial({
      color: 0x156289,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      flatShading: true
    });
    // Body that combines both geo and mat
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // creates light for shadows/dimensions
    const lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);

    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(- 100, - 200, - 100);

    scene.add(lights[0]);
    scene.add(lights[1]);
    scene.add(lights[2]);
  }

  handleWindowResize = (node, renderer, camera) => {
    const width = node.clientWidth;
    const height = node.clientHeight;
    // Updates render/camera with current size of dom is then updates position of all cameras
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }


  render() {
    // Page Styling
    const { classes } = this.props;
    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRoundedCircle,
      classes.imgFluid
    );
    // Render custom fallback UI
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (

      <div className={classes.section} ref={this.threeRef} id="canvas" style={{ zIndex: 1000 }}>
        <h2 className={classes.title} style={{ zIndex: 1 }} >Hello! Nice to meet you :{')'}</h2>
        <div style={{ zIndex: 1 }}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                  <img alt="picture of developer" src={image} className={imageClasses} />
                </GridItem>
                <h4 className={classes.cardTitle}>
                  Olonny Taylor
                <br />
                  <small className={classes.smallTitle}>Javascript Developer</small>
                </h4>
                <CardBody>
                  <p className={classes.description}>
                    I am proficient in many modern web technologies including  React, Vue, Node, {"&"} Express along cloud based services.
                    I create applications that are beautiful, functional, and focused on a great user experience.
                </p>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div >
    );
  }
}

export default withStyles(styles)(TeamSection);
