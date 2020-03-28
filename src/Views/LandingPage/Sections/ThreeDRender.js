import React, { Component } from "react";
// Threejs
import * as THREE from 'three';
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// Utils
import Stats from 'stats.js';
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
// Styles
import styles from "@Styles/teamStyle.js";
// Images


class ThreeDRender extends Component {
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
    // this.evaHead = new Image();
    // this.evaHead.crossOrigin = ''
    // this.evaHead.src = 'https://res.cloudinary.com/boredasfawk/image/upload/v1584760821/eva/T_CH_Eva_MHead01_D01_V01_SK1_aeticm.jpg';
    // // Build eva body image
    // this.evaBody = new Image();
    // this.evaBody.crossOrigin = "";
    // this.evaBody.src = 'https://res.cloudinary.com/boredasfawk/image/upload/v1584760821/eva/T_CH_Eva_MBody01_D01_V01_SK1_ovsh2r.jpg';

    if (this.props.threeRef.id === 'canvas') {
      // TEST
      console.log({ currProps: this.props }, { currentRef: this.props.threeRef }, 'CDM - ref')
      // set current ref to dom elem in var then get dom w/h
      this.node = this.props.threeRef;
      this.evaContainer = document.createElement("div");
      this.evaContainer.setAttribute("id", "eva");
      this.node.style.height = '80vh';
      const height = this.node.clientHeight;
      const width = this.node.clientWidth;

      this.node.appendChild(this.evaContainer);
      // SET SCENE

      // Create scene
      this.scene = new THREE.Scene();
      // Render graphics in dom
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        // clearColor: 0xffffff,
        // clearAlpha: 1
      });
      this.renderer.autoClear = false;
      // Stat abstraction from threejs
      this.stats = new Stats();
      // TEST
      console.log({ newStats: this.stats }, { Stats: Stats }, { renderer: this.renderer }, { scene: this.scene }, 'CDM')
      const fov = 100;
      const aspectRatio = (width / height);
      const nearPlane = 1;
      const farPlane = 2400;
      this.camera = new THREE.PerspectiveCamera(
        fov,
        aspectRatio,
        nearPlane,
        farPlane
      );
      // Set distance from cude
      this.camera.position.set(-17, 148, 460);
      // render size of size and add it elm

      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(width, height);
      this.node.style.height = 'initial';
      this.evaContainer.appendChild(this.renderer.domElement);
      this.renderer.autoClear = false;
      // Stats
      this.stats.showPanel(0);
      this.evaContainer.appendChild(this.stats.dom);
      // Set camera controls to render in dom elem
      this.controls = new TrackballControls(this.camera, this.renderer.domElement);
      this.controls.dynamicDampingFactor = 0.25;
      this.controls.enableZoom = false;
      // Renderer color correction and shading
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      this.renderer.physicallyBasedShading = true;
      // SKYBOX
      // Load images into mesh
      this.texLoader = new THREE.CubeTextureLoader();

      // Skybox
      this.textureCube = this.texLoader.load([
        'https://res.cloudinary.com/boredasfawk/image/upload/v1584760885/skybox/humble_bk.jpg',
        'https://res.cloudinary.com/boredasfawk/image/upload/v1584760885/skybox/humble_ft.jpg',
        'https://res.cloudinary.com/boredasfawk/image/upload/a_180/v1584760885/skybox/humble_up.jpg',
        'https://res.cloudinary.com/boredasfawk/image/upload/a_180/v1584760885/skybox/humble_dn.jpg',
        'https://res.cloudinary.com/boredasfawk/image/upload/v1584760885/skybox/humble_lf.jpg',
        'https://res.cloudinary.com/boredasfawk/image/upload/v1584760885/skybox/humble_rt.jpg'
      ])
      this.scene.background = this.textureCube;

      // LIGHTS
      this.light = new THREE.PointLight(0xffffff, 1);
      this.light.position.set(2, 5, 1);
      this.light.position.multiplyScalar(30);
      this.scene.add(this.light);

      this.light2 = new THREE.PointLight(0xffffff, 0.75);
      this.light2.position.set(-12, 4.6, 2.4);
      this.light2.position.multiplyScalar(30);
      this.scene.add(this.light2);

      this.ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5)
      this.scene.add(this.ambientLight);

      // CREATE MODELS
      this.OBJLoader = new OBJLoader();
      // Load materials for cloud and add to scene
      const addMaterials = (materialCreator, OBJLoader, scene, refTextures) => {
        // Adds new objcet to scene and adjusts position
        const addScene = (object, scene) => {
          console.log({ graphicObj: object }, 'objLoader')
          object.position.y = 95;
          scene.add(object);
        }
        // Loads materials from cloud
        materialCreator.preload();
        // Access materials to add depth with city reflection
        let mBody = materialCreator.materials["Material__467"];
        mBody.envMap = refTextures;
        mBody.combine = THREE.MixOperation;
        mBody.reflectivity = 0.33;
        let mHead = materialCreator.materials["Material__463"];
        mHead.envMap = refTextures;
        mHead.combine = THREE.MixOperation;
        mHead.reflectivity = 0.33;
        let mWire = materialCreator.materials["wire_174186203"];
        mWire.visible = false;
        console.log({ materials: materialCreator }, 'mtlloader', { objldr: this.OBJLoader }, 'objloader')
        // Sets materials to obj
        OBJLoader.setMaterials(materialCreator);
        // Load objec from cloud and add materials
        OBJLoader.load('https://res.cloudinary.com/boredasfawk/raw/upload/v1585108949/eva/EVA02.obj',
          (object) => addScene(object, scene)
        );
      }
      this.MTLLoader = new MTLLoader();
      this.MTLLoader.setPath('https://res.cloudinary.com/boredasfawk/raw/upload/v1585095975/eva/');
      this.MTLLoader.setResourcePath('https://res.cloudinary.com/boredasfawk/image/upload/v1585095975/eva/');
      this.MTLLoader.load('EVA01.mtl',
        (materialCreator) => addMaterials(materialCreator, this.OBJLoader, this.scene, this.textureCube)
      );

      // Create ground

      // Creating Virtual city model for ground
      this.GLTFLoader = new GLTFLoader();
      this.clock = new THREE.Clock();
      let mixer;

      const startAnimation = (gltf) => {
        gltf.scene.scale.set(25, 25, 25);
        mixer = new THREE.AnimationMixer(gltf.scene);
        console.log({ gltfmixer: mixer }, { gltfScene: gltf }, 'gltf animation');
        gltf.animations.forEach((clip) => {
          mixer.clipAction(clip).play();
        });
        this.scene.add(gltf.scene);
      }
      this.GLTFLoader.load("https://res.cloudinary.com/boredasfawk/raw/upload/v1585118785/VC/virtual_city.gltf",
        (gltf) => startAnimation(gltf)
      );

      // this.groundMat = new THREE.MeshPhongMaterial({ color: 0x404040 });
      // this.groundGeo = new THREE.PlaneGeometry(420, 420);
      // this.ground = new THREE.Mesh(this.groundGeo, this.groundMat);
      // this.ground.combine = THREE.MixOperation;
      // this.ground.shininess = 30;
      // this.ground.metal = true;
      // this.ground.position.y = 0;
      // this.negPI = -Math.PI;
      // this.devNegPi = (this.negPI / 2);
      // this.ground.rotation.x = this.devNegPi;
      // this.ground.doubleSided = true;
      // this.scene.add(this.ground);

      // RENDER SCENE

      this.requestID = null;
      const render = () => {
        this.controls.update();
        //using timer to rotate camera

        // this.camera.position.x = + .05;
        // console.log(this.camera.position)
        // Renders sets and cycles animation through event loop
        this.stats.begin();
        this.renderer.render(this.scene, this.camera);
        let delta = this.clock.getDelta();
        if (mixer !== undefined) mixer.update(delta);
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
          {this.props.children}
        </div >
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(React.forwardRef(
  (props, ref) => (
    <ThreeDRender threeRef={ref} {...props} />
  )
));
