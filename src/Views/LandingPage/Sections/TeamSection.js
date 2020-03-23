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
import image2 from "@Assets/images/error.jpeg"
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
      console.log({ evaCon: this.node }, 'evacontainer')
      const height = this.node.clientHeight;
      const width = this.node.clientWidth;
      console.log({ evaCon: this.node }, 'evacontainer')

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
      // Stat abstraction from threejs
      this.stats = new Stats();
      // TEST
      console.log({ newStats: this.stats }, { Stats: Stats }, { renderer: this.renderer }, { scene: this.scene }, 'CDM')
      const fov = 45;
      const aspectRatio = (width / height);
      const nearPlane = 1;
      const farPlane = 5000;
      this.camera = new THREE.PerspectiveCamera(
        fov,
        aspectRatio,
        nearPlane,
        farPlane
      );
      // Set distance from cude
      this.camera.position.set(0, 100, 400);

      // render size of size and add it elm
      this.renderer.setSize(width, height);
      this.renderer.domElement.style.height = '60vh';
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
      this.loadedTex = this.textureCube.load(this.urls)

      this.skyGeometry = new THREE.CubeGeometry(5000, 5000, 5000);
      this.materialArray = [];
      const setMaterial = () => {
        for (let i = 0; i < 6; i++)
          this.materialArray.push(new THREE.MeshBasicMaterial({
            map: this.loadedTex,
            side: THREE.BackSide
            // workaround for Chrome 30 ANGLE bug
            //THREE.DoubleSide;
          }));
      }
      setMaterial();

      this.skyMaterial = this.materialArray;
      this.skyBox = new THREE.Mesh(this.skyGeometry, this.skyMaterial);
      this.scene.add(this.skyBox);

      console.log({ skyBox: this.skyBox }, 'sky cube');
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

      // this.floorTexture = new THREE.TextureLoader().load(`${image2}`);
      // console.log({ flrTrx: this.floorTexture }, 'floor');
      // this.floorTexture.wrapS = THREE.RepeatWrapping;
      // this.floorTexture.wrapT = THREE.RepeatWrapping;
      // this.floorTexture.repeat.set(10, 10);
      // console.log({ flrTrx: this.floorTexture }, 'floor');
      // this.floorMaterial = new THREE.MeshBasicMaterial({
      //   map: this.floorTexture,
      //   side: THREE.DoubleSide
      // });
      // this.floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
      // this.floor = new THREE.Mesh(this.floorGeometry, this.floorMaterial);
      // this.floor.position.y = -100.5;
      // const x = (Math.PI / 2)
      // this.floor.rotation.x = x;
      // this.scene.add(this.floor);


      // RENDER SCENE
      this.requestID = null;
      const render = () => {
        this.controls.update();
        this.renderer.clear();
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











// // FUNCTIONS 		
// function init() {
//   // SCENE
//   scene = new THREE.Scene();
//   // CAMERA
//   var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
//   var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
//   camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
//   scene.add(camera);
//   camera.position.set(0, 100, 400);
//   camera.lookAt(scene.position);
//   // RENDERER
//   if (Detector.webgl)
//     renderer = new THREE.WebGLRenderer({ antialias: true });
//   else
//     renderer = new THREE.CanvasRenderer();
//   renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
//   container = document.getElementById('ThreeJS');
//   container.appendChild(renderer.domElement);
//   // EVENTS
//   THREEx.WindowResize(renderer, camera);
//   THREEx.FullScreen.bindKey({ charCode: 'm'.charCodeAt(0) });
//   // CONTROLS
//   controls = new THREE.OrbitControls(camera, renderer.domElement);
//   controls.addEventListener('change', render);
//   // STATS
//   stats = new Stats();
//   stats.domElement.style.position = 'absolute';
//   stats.domElement.style.bottom = '0px';
//   stats.domElement.style.zIndex = 100;
//   container.appendChild(stats.domElement);
//   // LIGHT
//   var light = new THREE.PointLight(0xffffff);
//   light.position.set(0, 250, 0);
//   scene.add(light);
//   // FLOOR
//   var floorTexture = new THREE.ImageUtils.loadTexture('images/checkerboard.jpg');
//   floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
//   floorTexture.repeat.set(10, 10);
//   var floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
//   var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
//   var floor = new THREE.Mesh(floorGeometry, floorMaterial);
//   floor.position.y = -100.5;
//   floor.rotation.x = Math.PI / 2;
//   //scene.add(floor);

//   // SKYBOX/FOG
//   var imagePrefix = "images/dawnmountain-";
//   var directions = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
//   var imageSuffix = ".png";
//   var skyGeometry = new THREE.CubeGeometry(5000, 5000, 5000);

//   var materialArray = [];
//   for (var i = 0; i < 6; i++)
//     materialArray.push(new THREE.MeshBasicMaterial({
//       map: THREE.ImageUtils.loadTexture(imagePrefix + directions[i] + imageSuffix),
//       side: THREE.BackSide
//     }));
//   var skyMaterial = new THREE.MeshFaceMaterial(materialArray);
//   var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
//   scene.add(skyBox);

//   ////////////
//   // CUSTOM //
//   ////////////

//   var sphereGeom = new THREE.SphereGeometry(100, 32, 16);

//   var moonTexture = THREE.ImageUtils.loadTexture('images/moon.jpg');
//   var moonMaterial = new THREE.MeshBasicMaterial({ map: moonTexture });
//   var moon = new THREE.Mesh(sphereGeom, moonMaterial);
//   moon.position.set(150, 0, -150);
//   scene.add(moon);

//   // create custom material from the shader code above
//   //   that is within specially labeled script tags
//   var customMaterial = new THREE.ShaderMaterial(
//     {
//       uniforms:
//       {
//         "c": { type: "f", value: 1.0 },
//         "p": { type: "f", value: 1.4 },
//         glowColor: { type: "c", value: new THREE.Color(0xffff00) },
//         viewVector: { type: "v3", value: camera.position }
//       },
//       vertexShader: document.getElementById('vertexShader').textContent,
//       fragmentShader: document.getElementById('fragmentShader').textContent,
//       side: THREE.FrontSide,
//       blending: THREE.AdditiveBlending,
//       transparent: true
//     });

//   this.moonGlow = new THREE.Mesh(sphereGeom.clone(), customMaterial.clone());
//   moonGlow.position = moon.position;
//   moonGlow.scale.multiplyScalar(1.2);
//   scene.add(moonGlow);

//   var cubeGeom = new THREE.CubeGeometry(150, 150, 150, 2, 2, 2);
//   var crateTexture = THREE.ImageUtils.loadTexture('images/crate.png');
//   var crateMaterial = new THREE.MeshBasicMaterial({ map: crateTexture });
//   this.crate = new THREE.Mesh(cubeGeom, crateMaterial);
//   crate.position.set(-150, 0, -150);
//   scene.add(crate);

//   var smoothCubeGeom = cubeGeom.clone();
//   var modifier = new THREE.SubdivisionModifier(2);
//   modifier.modify(smoothCubeGeom);

//   this.crateGlow = new THREE.Mesh(smoothCubeGeom, customMaterial.clone());
//   crateGlow.position = crate.position;
//   crateGlow.scale.multiplyScalar(1.5);
//   scene.add(crateGlow);

//   /////////
//   // GUI //
//   /////////

//   gui = new dat.GUI();
//   parameters =
//     { c: 1.0, p: 1.4, bs: false, fs: true, nb: false, ab: true, mv: true, color: "#ffff00" };

//   var top = gui.addFolder('Glow Shader Attributes');

//   var cGUI = top.add(parameters, 'c').min(0.0).max(1.0).step(0.01).name("c").listen();
//   cGUI.onChange(function (value) {
//     moonGlow.material.uniforms["c"].value = parameters.c;
//     crateGlow.material.uniforms["c"].value = parameters.c;
//   });

//   var pGUI = top.add(parameters, 'p').min(0.0).max(6.0).step(0.01).name("p").listen();
//   pGUI.onChange(function (value) {
//     moonGlow.material.uniforms["p"].value = parameters.p;
//     crateGlow.material.uniforms["p"].value = parameters.p;
//   });

//   var glowColor = top.addColor(parameters, 'color').name('Glow Color').listen();
//   glowColor.onChange(function (value) {
//     moonGlow.material.uniforms.glowColor.value.setHex(value.replace("#", "0x"));
//     crateGlow.material.uniforms.glowColor.value.setHex(value.replace("#", "0x"));
//   });
//   top.open();

//   // toggle front side / back side 
//   var folder1 = gui.addFolder('Render side');
//   var fsGUI = folder1.add(parameters, 'fs').name("THREE.FrontSide").listen();
//   fsGUI.onChange(function (value) {
//     if (value) {
//       bsGUI.setValue(false);
//       moonGlow.material.side = THREE.FrontSide;
//       crateGlow.material.side = THREE.FrontSide;
//     }
//   });
//   var bsGUI = folder1.add(parameters, 'bs').name("THREE.BackSide").listen();
//   bsGUI.onChange(function (value) {
//     if (value) {
//       fsGUI.setValue(false);
//       moonGlow.material.side = THREE.BackSide;
//       crateGlow.material.side = THREE.BackSide;
//     }
//   });
//   folder1.open();

//   // toggle normal blending / additive blending
//   var folder2 = gui.addFolder('Blending style');
//   var nbGUI = folder2.add(parameters, 'nb').name("THREE.NormalBlending").listen();
//   nbGUI.onChange(function (value) {
//     if (value) {
//       abGUI.setValue(false);
//       moonGlow.material.blending = THREE.NormalBlending;
//       crateGlow.material.blending = THREE.NormalBlending;
//     }
//   });
//   var abGUI = folder2.add(parameters, 'ab').name("THREE.AdditiveBlending").listen();
//   abGUI.onChange(function (value) {
//     if (value) {
//       nbGUI.setValue(false);
//       moonGlow.material.blending = THREE.AdditiveBlending;
//       crateGlow.material.blending = THREE.AdditiveBlending;
//     }
//   });
//   folder2.open();

//   // toggle mesh visibility
//   var folder3 = gui.addFolder('Miscellaneous');
//   var mvGUI = folder3.add(parameters, 'mv').name("Meshes-Visible").listen();
//   mvGUI.onChange(function (value) {
//     moon.visible = value;
//     crate.visible = value;
//   });
//   folder3.open();

// }

// function animate() {
//   requestAnimationFrame(animate);
//   render();
//   update();
// }

// function update() {
//   controls.update();
//   stats.update();
//   moonGlow.material.uniforms.viewVector.value =
//     new THREE.Vector3().subVectors(camera.position, moonGlow.position);
//   crateGlow.material.uniforms.viewVector.value =
//     new THREE.Vector3().subVectors(camera.position, crateGlow.position);
// }

// function render() {
//   renderer.render(scene, camera);
// }
