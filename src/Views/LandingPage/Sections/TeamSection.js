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
      hasError: false
    }

    // Functions
    this.handleWindowResize = this.handleWindowResize.bind(this)
  }

  // LIFECYCLES

  // Help properly display errors and show diff page
  static getDerivedStateFromError(error) {
    // TEST
    console.log({ error }, 'derived state from error');
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  // On mount call graphic/styling functions

  componentDidMount(prevProps) {
    // TEST
    console.log({ prevProps }, { currProps: this.props }, 'CDM - render')

    if (this.props.threeRef.id === 'canvas') {
      // TEST
      console.log({ currProps: this.props }, { currentRef: this.props.threeRef }, 'CDM - ref')
      // set current ref to dom elem in var then get dom w/h
      this.node = this.props.threeRef;
      const width = this.node.clientWidth;
      const height = this.node.clientHeight;
      // SET SCENE

      // Create scene
      this.scene = new THREE.Scene();
      // Render graphics in dom
      this.renderer = new THREE.WebGLRenderer();
      // Stat abstraction from threejs
      this.stats = new Stats();
      // TEST
      console.log({ newStats: this.stats }, { Stats: Stats }, { renderer: this.renderer }, { scene: this.scene }, 'CDM')
      const fov = 75;
      const aspectRatio = (width / height);
      const nearPlane = 0.1
      const farPlane = 1000
      this.camera = new THREE.PerspectiveCamera(
        fov,
        aspectRatio,
        nearPlane,
        farPlane
      );
      // Set camera controls
      this.controls = new OrbitControls(this.camera, this.node);
      this.controls.enableZoom = false
      // Set distance from cude
      this.camera.position.z = 5;
      this.renderer.setSize(width, height);
      this.node.appendChild(this.renderer.domElement);
      // Set stats
      this.stats.showPanel(1);
      this.node.appendChild(this.stats.dom);
      // CREATE MODELS

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
      this.scene.add(lights[0]);
      this.scene.add(lights[1]);
      this.scene.add(lights[2]);
      // RENDER SCENE

      this.stats.begin(); // TEST
      // Rotates cube  
      this.cube.rotation.x += 0.01;
      this.cube.rotation.y += 0.01;
      this.stats.end(); // TEST
      // Renders sets and cycles animation through event loop
      this.renderer.render(this.scene, this.camera);
      this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
      // Resizes rendered scene mobil responsiveness
      (this.renderer !== undefined) &&
        window.addEventListener('resize', this.handleWindowResize(width, height, this.renderer, this.camera));
    }
  }

  // Removes all event listners 
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
    this.controls.dispose();
  }

  // FUNCTIONS

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
