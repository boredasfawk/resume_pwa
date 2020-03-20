import React, { Component, createRef } from "react";
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from 'stats.js';
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

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
    this.threeRef = createRef();
    this.node = this.threeRef.current;
    // Init global variables
    this.cube = null;
    this.scene = null;
    this.camera = null;
    this.controls = null;
    this.renderer = null;
    this.requestID = null;
    // Stat abstraction from threejs
    this.stats = new Stats();
    // Page Styling
    this.useStyles = makeStyles(styles)
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
    // 3D Graphics
    this.sceneSetup();
    Stats.showPanel(1);
    this.node.appendChild(Stats.dom);
    this.startAnimationLoop();
    this.addCustomSceneObjects();
    // For responsiveness
    window.addEventListener('resize', this.handleWindowResize);

    // Page Styling
    this.classes = this.useStyles();
    this.imageClasses = classNames(
      classes.imgRaised,
      classes.imgRoundedCircle,
      classes.imgFluid
    );
  }
  // Removes all event listners 
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
    this.controls.dispose();
  }

  // FUNCTIONS

  sceneSetup = (scene) => {
    // Get container dimensions and use them for scene sizing
    const width = this.node.clientWidth;
    const height = this.node.clientHeight;
    // Create scene
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75, // fov = field of view
      width / height, // aspect ratio
      0.1, // near plane
      1000 // far plane
    );
    // Set camera controls
    this.controls = new OrbitControls(this.camera, this.node);
    this.controls.enableZoom = false
    // Set distance from cude
    this.camera.position.z = 5;
    // Render graphics in dom
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.node.appendChild(this.renderer.domElement);
  }
  startAnimationLoop = (ani) => {
    Stats.begin();
    // Rotates cube  
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    Stats.end();
    // Renders sets and cycles animation through event loop
    this.renderer.render(this.scene, this.camera);
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  }
  addCustomSceneObjects = (sceneObj) => {
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
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    // creates light for shadows/dimensions
    const lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);

    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(- 100, - 200, - 100);

    this.scene.add(lights[0]);
    this.scene.add(lights[1]);
    this.scene.add(lights[2]);
  }

  handleWindowResize = () => {
    const width = this.node.clientWidth;
    const height = this.node.clientHeight;
    // Updates render/camera with current size of dom is then updates position of all cameras
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }


  render() {
    // Render custom fallback UI
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (

      <div className={classes.section} ref={this.threeRef} style={{ zIndex: 1000 }}>
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

export default TeamSection;
