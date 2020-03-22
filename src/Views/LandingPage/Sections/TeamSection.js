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
const canvas = {
  display: "flex",
  flexDirection: "column"
}

const log = {
  top: "10px",
  left: "10px",
  background: "rgba(20, 120, 20, 0.5)",
  overflow: "auto",
  width: "300px",
  height: "100px",
  fontSize: "1rem",
  position: "absolute",
  border: "3px solid #FFF",
  borderRadius: "5px",
  color: "#FFF",
  fonFamily: "arial"
}


class TeamSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
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
      const width = this.node.clientWidth;
      const height = this.node.clientHeight;
      this.evaContainer = document.createElement("div");
      this.evaContainer.setAttribute("id", "eva");

      this.node.appendChild(this.evaContainer);
      // SET SCENE

      // Create scene
      this.scene = new THREE.Scene();
      // Create skybox scene
      this.sceneCube = new THREE.Scene();
      // Render graphics in dom
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        clearColor: 0xffffff,
        clearAlpha: 1
      });
      // Stat abstraction from threejs
      this.stats = new Stats();
      // TEST
      console.log({ newStats: this.stats }, { Stats: Stats }, { renderer: this.renderer }, { scene: this.scene }, 'CDM')
      const fov = 25;
      const aspectRatio = (width / height);
      const nearPlane = 1;
      const farPlane = 10000;
      this.camera = new THREE.PerspectiveCamera(
        fov,
        aspectRatio,
        nearPlane,
        farPlane
      );
      // Set distance from cude
      this.camera.position.set(40, -10, 100);

      // render size of size and add it elm
      this.renderer.setSize(width, height);
      // make renderer elm child of evacontainer
      this.renderer.domElement.style.position = "relative";
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

      // Creating skybox camera and adding it to skybox scene
      const SBfov = 25;
      const SBaspectRatio = (width / height);
      const SBnearPlane = 1;
      const SBfarPlane = 10000;
      this.cameraCube = new THREE.PerspectiveCamera(
        SBfov,
        SBaspectRatio,
        SBnearPlane,
        SBfarPlane
      );
      this.sceneCube.add(this.cameraCube);

      this.skyBox = 'https://res.cloudinary.com/boredasfawk/image/upload/v1584760885/skybox/'
      this.urls = [
        this.skyBox + "humble_ft.jpg",
        this.skyBox + "humble_rt.jpg",
        this.skyBox + "humble_up.jpg",
        this.skyBox + "humble_dn.jpg",
        this.skyBox + "humble_bk.jpg",
        this.skyBox + "humble_lf.jpg"
      ];
      // Set textures to skybox
      this.textureCube = new THREE.CubeTextureLoader();
      this.textureCube.setCrossOrigin('anonymous');
      this.textureCube.load(this.urls);

      console.log({ tcube: this.textureCube }, { urls: this.urls }, 'texturecube');
      // Stats
      this.stats.showPanel(0);
      this.renderer.domElement.appendChild(this.stats.domElement);
      // CREATE MODELS

      // creating textures for eva
      this.evaTextureHead = new THREE.Texture(this.evaHead);
      this.evaTextureHead.encoding = THREE.sRGBEncoding // color correction NEED
      this.evaTextureHead.needsUpdate = true;
      this.evaTextureBody = new THREE.Texture(this.evaBody);
      this.evaTextureBody.encoding = THREE.sRGBEncoding // color correction NEED
      this.evaTextureBody.needsUpdate = true;

      // Skeleton of object
      this.shader = THREE.ShaderLib["cube"];
      this.shader.uniforms["tCube"] = { value: this.textureCube };
      console.log(this.shader, 'shader');

      this.material = new THREE.ShaderMaterial({
        fragmentShader: this.shader.fragmentShader,
        vertexShader: this.shader.vertexShader,
        uniforms: this.shader.uniforms,
        depthWrite: false,
        side: THREE.BackSide
      });

      console.log(this.material, 'material');
      // workaround for Chrome 30 ANGLE bug
      this.material.side = THREE.DoubleSide;

      this.mesh = new THREE.Mesh(new THREE.CubeGeometry(100, 100, 100), this.material);
      this.sceneCube.add(this.mesh);

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

      //add ground
      this.groundMat = new THREE.MeshPhongMaterial({ color: 0x404040 });
      this.groundGeo = new THREE.PlaneGeometry(400, 400);
      this.ground = new THREE.Mesh(this.groundGeo, this.groundMat);
      console.log({ groundMat: this.ground }, 'for skybox')
      this.ground.envMap = this.textureCube;
      this.ground.combine = THREE.MixOperation;
      this.ground.shininess = 30;
      this.ground.metal = true;
      this.ground.position.y = -80;
      this.negPI = -Math.PI;
      this.devNegPi = (this.negPI / 2);
      this.ground.rotation.x = this.devNegPi;
      //ground.doubleSided = true;
      this.scene.add(this.ground);


      // RENDER SCENE
      this.requestID = null;
      const render = () => {
        this.controls.update();

        this.cameraCube.rotation.copy(this.camera.rotation);
        this.renderer.clear();
        this.renderer.render(this.sceneCube, this.cameraCube);
        this.renderer.render(this.scene, this.camera);
        // Renders sets and cycles animation through event loop
        this.stats.begin();
        this.renderer.render(this.scene, this.camera);
        this.requestID = window.requestAnimationFrame(render);
        this.stats.end();
      }
      render();
      this.stats.update(); // TEST

      // Resizes rendered scene mobil responsiveness
      (this.renderer !== undefined) &&
        window.addEventListener('resize', this.handleWindowResize(width, height, this.renderer, this.camera, this.cameraCube));
    }
  }

  // Removes all event listners 
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
    this.controls.dispose();
  }

  // FUNCTIONS

  // Resizes dom elm based on windows
  handleWindowResize = (width, height, renderer, camera, cameraCube) => {
    // Updates render/camera with current size of dom is then updates position of all cameras
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    cameraCube.aspect = width / height;
    cameraCube.updateProjectionMatrix();
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
          style={canvas}
          className={classes.section}
          ref={ref => this.props.threeRef = ref} id="canvas"
        >
          <h2 className={classes.title} style={{ zIndex: 1 }} >Hello! Nice to meet you :{')'}</h2>
          <div style={{ zIndex: 1 }}>
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
