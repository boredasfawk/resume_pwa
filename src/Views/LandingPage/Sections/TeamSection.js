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
import { tsUndefinedKeyword } from "@babel/types";



class TeamSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    }

    // Set ref for threejs to use dom node
    // this.threeRef = React.createRef();
    // Functions
    this.sceneSetup = this.sceneSetup.bind(this)
    this.startAnimationLoop = this.startAnimationLoop.bind(this)
    this.addCustomSceneObjects = this.addCustomSceneObjects.bind(this)
  }

  // LIFECYCLES

  // Help properly display errors and show diff page
  static getDerivedStateFromError(error) {
    console.log({ error }, 'derived state from error');
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // On mount call graphic/styling functions

  componentDidMount(prevProps) {
    console.log({ prevProps }, { currProps: this.props }, 'CDM - render')
    // Init global variables
    this.cube = null;
    this.scene = null;
    this.camera = null;
    this.controls = null;
    this.renderer = null;
    this.requestID = null;
    // Stat abstraction from threejs
    this.stats = new Stats();

    if (this.props.threeRef.id === 'canvas') {

      console.log({ currProps: this.props }, { currentRef: this.props.threeRef }, 'CDM - ref')
      // Init global variables
      this.cube = null;
      // Create scene
      this.scene = new THREE.Scene();
      this.camera = null;
      this.controls = null;
      // Render graphics in dom
      this.renderer = new THREE.WebGLRenderer();
      this.requestID = null;
      // set current ref to dom elem in var then get dom w/h
      this.node = this.props.threeRef;
      const width = this.node.clientWidth;
      const height = this.node.clientHeight;
      // Stat abstraction from threejs
      this.stats = new Stats();
      console.log({ newStats: this.stats }, { Stats: Stats }, { renderer: this.renderer }, 'CDM')
      // Set scene
      this.sceneSetup(width, height, this.node, this.scene, this.camera, this.controls, this.renderer);
      // Set stats
      this.stats.showPanel(1);
      this.node.appendChild(this.stats.dom);
      // Create models
      this.addCustomSceneObjects(this.scene, this.cube);
      // Start rendering Scene
      this.startAnimationLoop(this.cube, this.renderer, this.requestID, this.scene, this.camera, this.stats);
      // Resizes rendered scene mobil responsiveness
      (this.renderer !== undefined) &&
        window.addEventListener('resize', this.handleWindowResize(width, height, this.renderer, this.camera));
    }
  }

  // Removes all event listners 
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize(width, height, this.renderer, this.camera));
    window.cancelAnimationFrame(this.requestID);
    this.controls.dispose();
  }

  // FUNCTIONS

  sceneSetup = (width, height, node, scene, camera, controls, renderer) => {

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

    renderer.setSize(width, height);
    node.appendChild(renderer.domElement);
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

    // Creates light for shadows/dimensions
    const lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);
    // Set posiition of lights
    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(- 100, - 200, - 100);
    // Add lights into scene
    scene.add(lights[0]);
    scene.add(lights[1]);
    scene.add(lights[2]);
  }

  startAnimationLoop = (cube, renderer, requestID, scene, camera, stats) => {
    stats.begin();
    // Rotates cube  
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    stats.end();
    // Renders sets and cycles animation through event loop
    renderer.render(scene, camera);
    requestID = window.requestAnimationFrame(this.startAnimationLoop);
  }

  handleWindowResize = (width, height, renderer, camera) => {
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
      <React.Fragment>
        <div
          name='threeCanvas'
          id="threeCanvas"
          className={classes.section}
          ref={ref => this.props.threeRef = ref} id="canvas"
        >
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
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(React.forwardRef(
  (props, ref) => (
    <TeamSection threeRef={ref} {...props} />
  )
));
