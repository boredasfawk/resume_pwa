import React, { Component } from "react";
import * as THREE from 'three';
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
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
// import image2 from "@Assets/images/error.jpeg"
const canvas = {
  display: "flex",
  flexDirection: "column",
  zIndex: 1
}

// background: rgba(20, 120, 20, 0.5);
// overflow: hidden;
// width: 18vw;
// height: 60vh;
// font-size: 0.7rem;
// position: absolute;
// border: 3px solid rgb(255, 255, 255);
// border-radius: 1px;
// color: rgb(255, 255, 255);
// font-family: arial;
// left FONT-WEIGHT: 100;
// left: 3.3rem;

const log = {
  background: "rgba(20, 120, 20, 0.5)",
  overflow: "hidden",
  width: "18vw",
  height: "60vh",
  fontSize: ".7rem",
  position: "absolute",
  border: "2px solid #FFF",
  borderRadius: "1px",
  color: "#FFF",
  fontFamily: "arial",
  left: "3.3rem"
}


class TeamSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    }

    // Functions
    // this.handleWindowResize = this.handleWindowResize.bind(this)
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
    //TEXTURES

    //CORS! CORS!
    THREE.ImageUtils.crossOrigin = "";
    // Build eva head image
    this.evaHead = new Image();
    this.evaHead.crossOrigin = ''
    this.evaHead.src = 'https://res.cloudinary.com/boredasfawk/image/upload/v1584760821/eva/T_CH_Eva_MHead01_D01_V01_SK1_aeticm.jpg';
    // Build eva body image
    this.evaBody = new Image();
    this.evaBody.crossOrigin = "";
    this.evaBody.src = 'https://res.cloudinary.com/boredasfawk/image/upload/v1584760821/eva/T_CH_Eva_MBody01_D01_V01_SK1_ovsh2r.jpg';

    if (this.props.threeRef.id === 'canvas') {
      // TEST
      console.log({ currProps: this.props }, { currentRef: this.props.threeRef }, 'CDM - ref')
      // set current ref to dom elem in var then get dom w/h
      this.node = this.props.threeRef;
      this.evaContainer = document.createElement("div");
      this.evaContainer.setAttribute("id", "eva");
      this.node.style.height = '60vh';
      const height = this.node.clientHeight;
      const width = this.node.clientWidth;

      this.node.appendChild(this.evaContainer);
      // SET SCENE

      // Create scene
      this.scene = new THREE.Scene();
      // Render graphics in dom
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        clearColor: 0xffffff,
        clearAlpha: 1
      });
      this.renderer.autoClear = false;
      // Stat abstraction from threejs
      this.stats = new Stats();
      // TEST
      console.log({ newStats: this.stats }, { Stats: Stats }, { renderer: this.renderer }, { scene: this.scene }, 'CDM')
      const fov = 45;
      const aspectRatio = (width / height);
      const nearPlane = 1;
      const farPlane = 1000;
      this.camera = new THREE.PerspectiveCamera(
        fov,
        aspectRatio,
        nearPlane,
        farPlane
      );
      // Set distance from cude
      this.camera.position.set(0, 100, 200);

      // render size of size and add it elm

      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(width, height);
      this.node.style.height = 'initial';
      // Stats
      this.stats.showPanel(0);
      this.renderer.domElement.appendChild(this.stats.dom);

      this.evaContainer.appendChild(this.renderer.domElement);
      this.renderer.autoClear = false;
      // Set camera controls to render in dom elem
      this.controls = new TrackballControls(this.camera, this.renderer.domElement);
      this.controls.dynamicDampingFactor = 0.25;
      this.controls.enableZoom = false;
      // Renderer color correction and shading
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      this.renderer.physicallyBasedShading = true;
      // SKYBOX
      // Load images into mesh
      this.urls = [
        // back side
        new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load('https://res.cloudinary.com/boredasfawk/image/upload/v1584760885/skybox/humble_bk.jpg'),
          side: THREE.BackSide
        }),
        // front side
        new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load('https://res.cloudinary.com/boredasfawk/image/upload/v1584760885/skybox/humble_ft.jpg'),
          side: THREE.BackSide
        }),
        // Top side
        new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load('https://res.cloudinary.com/boredasfawk/image/upload/v1584760885/skybox/humble_up.jpg'),
          side: THREE.BackSide
        }),
        // Bottom side
        new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load('https://res.cloudinary.com/boredasfawk/image/upload/v1584760885/skybox/humble_dn.jpg'),
          side: THREE.BackSide
        }),
        // right side
        new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load('https://res.cloudinary.com/boredasfawk/image/upload/v1584760885/skybox/humble_rt.jpg'),
          side: THREE.BackSide
        }),
        // left side
        new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load('https://res.cloudinary.com/boredasfawk/image/upload/v1584760885/skybox/humble_lf.jpg'),
          side: THREE.BackSide
        })
      ];

      // Skybox
      this.Skyboxcube = new THREE.CubeGeometry(1000, 1000, 1000);
      // Setcube & materials to skybox
      this.materialCube = new THREE.MeshBasicMaterial({ map: this.urls });
      this.skyBox = new THREE.Mesh(this.Skyboxcub, this.materialCube);
      this.scene.add(this.skyBox);

      console.log({ skyBox: this.skyBox }, { skymaterial: this.materialCube }, { skyGeometry: this.Skyboxcube }, 'sky cube');
      // CREATE MODELS

      // creating textures for eva
      this.evaTextureHead = new THREE.Texture(this.evaHead);
      this.evaTextureHead.encoding = THREE.sRGBEncoding // color correction NEED
      this.evaTextureHead.needsUpdate = true;
      this.evaTextureBody = new THREE.Texture(this.evaBody);
      this.evaTextureBody.encoding = THREE.sRGBEncoding // color correction NEED
      this.evaTextureBody.needsUpdate = true;

      // LIGHTS
      this.light = new THREE.PointLight(0xffffff, 1);
      this.light.position.set(2, 5, 1);
      this.light.position.multiplyScalar(30);
      this.scene.add(this.light);

      this.light = new THREE.PointLight(0xffffff, 0.75);
      this.light.position.set(-12, 4.6, 2.4);
      this.light.position.multiplyScalar(30);
      this.scene.add(this.light);

      this.scene.add(new THREE.AmbientLight(0x050505));

      // LOADER
      this.dateObj = new Date();
      this.start = this.dateObj.getTime();
      this.OBJLoader = new OBJLoader();

      this.position = new THREE.Vector3(0, -80, 0);
      this.scale = new THREE.Vector3(1, 1, 1);

      this.OBJLoader.load(
        'https://res.cloudinary.com/boredasfawk/raw/upload/v1584764455/eva/EVA01_kbg7rq.obj',
        (content) => {
          console.log(content, 'in OBJloader');
          // hackMaterials(materials);
          // let mesh = new THREE.Mesh(
          //   geometry,
          //   new THREE.MeshFaceMaterial(materials)
          // );
          // mesh.scale = scale;
          // mesh.position = position;
          this.scene.add(content);
          let end = this.dateObj.getTime();
          console.log("load time:", end - this.start, "ms", 'in jsonloader');
        }
      );

      // Create ground
      this.groundMat = new THREE.MeshPhongMaterial({ color: 0x404040 });
      this.groundGeo = new THREE.PlaneGeometry(400, 400);
      this.ground = new THREE.Mesh(this.groundGeo, this.groundMat);
      this.ground.combine = THREE.MixOperation;
      this.ground.shininess = 30;
      this.ground.metal = true;
      this.ground.position.y = -80;
      this.negPI = -Math.PI;
      this.devNegPi = (this.negPI / 2);
      this.ground.rotation.x = this.devNegPi;
      this.ground.doubleSided = true;
      this.scene.add(this.ground);

      // RENDER SCENE
      this.requestID = null;
      const render = () => {
        this.skyBox.position.copy(this.camera.position);
        // Renders sets and cycles animation through event loop
        this.stats.begin();
        this.renderer.render(this.scene, this.camera);
        this.requestID = window.requestAnimationFrame(render);
        this.stats.end();
      }
      render();

      // Resizes dom elm based on windows
      const handleWindowResize = (width, height, renderer, camera) => {
        // Updates render/camera with current size of dom is then updates position of all cameras
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }

      // Resizes rendered scene mobil responsiveness
      window.addEventListener('resize', handleWindowResize(width, height, this.renderer, this.camera));
    }
  }

  // Removes all event listners 
  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.handleWindowResize);
  //   window.cancelAnimationFrame(this.requestID);
  //   this.controls.dispose();
  // }

  // FUNCTIONS




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
          id="canvas"
          className={classes.section}
          ref={ref => this.props.threeRef = ref}
        >
          <h2 className={classes.title} style={{ zIndex: 1 }} >Hello! Nice to meet you :{')'}</h2>
          <div style={canvas}>
            <GridContainer >
              <GridItem id="log" style={log} xs={12} sm={12} md={4}>
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
