import React, { Component } from "react";
// Threejs
import * as THREE from 'three';
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
// Utils
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
        // clearColor: 0xffffff,
        // clearAlpha: 1
      });
      this.renderer.autoClear = false;
      // Stat abstraction from threejs
      this.stats = new Stats();
      // TEST
      console.log({ newStats: this.stats }, { Stats: Stats }, { renderer: this.renderer }, { scene: this.scene }, 'CDM')
      const fov = 75;
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
      this.camera.position.set(-40, 150, 220);

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
        'https://res.cloudinary.com/boredasfawk/image/upload/v1584760885/skybox/humble_up.jpg',
        'https://res.cloudinary.com/boredasfawk/image/upload/v1584760885/skybox/humble_dn.jpg',
        'https://res.cloudinary.com/boredasfawk/image/upload/v1584760885/skybox/humble_lf.jpg',
        'https://res.cloudinary.com/boredasfawk/image/upload/v1584760885/skybox/humble_rt.jpg'
      ])
      this.scene.background = this.textureCube;
      // CREATE MODELS

      // creating textures for eva
      // this.evaTextureHead = new THREE.Texture(this.evaHead);
      // this.evaTextureHead.encoding = THREE.sRGBEncoding // color correction NEED
      // this.evaTextureHead.needsUpdate = true;
      // this.evaTextureBody = new THREE.Texture(this.evaBody);
      // this.evaTextureBody.encoding = THREE.sRGBEncoding // color correction NEED
      // this.evaTextureBody.needsUpdate = true;

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

      // LOADER

      // this.position = new THREE.Vector3(0, -80, 0);
      // this.scale = new THREE.Vector3(1, 1, 1);

      // this.OBJLoader.load(
      //   'https://res.cloudinary.com/boredasfawk/raw/upload/v1584764455/eva/EVA01_kbg7rq.obj',
      //   (content) => {
      //     console.log(content, 'in OBJloader - object');
      //     const mtlLoader = new MTLLoader();
      //     mtlLoader.load('resources/models/windmill/windmill.mtl', (mtlParseResult) => {


      //       const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
      //       console.log({ mtlLoader }, { materials }, { mtlParseResult }, 'in OBJloade - material');
      //       this.OBJLoader.addMaterials(materials);
      //     });
      //     this.scene.add(content);
      //   }
      // );
      this.OBJLoader = new OBJLoader();
      // Load materials for cloud and add to scene
      const addMaterials = (materials, OBJLoader, scene) => {
        // Adds new objcet to scene and adjusts position
        const addScene = (object, scene) => {
          object.position.y = -95;
          scene.add(object);
        }
        // Loads materials from cloud
        materials.preload();
        console.log({ materials }, 'mtlloader', { objldr: this.OBJLoader }, 'objloader')
        // Sets materials to obj
        OBJLoader.setMaterials(materials);
        // Load objec from cloud and add materials
        OBJLoader.load('https://res.cloudinary.com/boredasfawk/raw/upload/v1585091899/eva/EVA01.obj',
          (object) => addScene(object, scene)
        );
      }
      this.MTLLoader = new MTLLoader();
      this.MTLLoader.setPath('https://res.cloudinary.com/boredasfawk/image/upload/v1585095975/eva/');
      this.MTLLoader.load('EVA01.mtl',
        (materials) => addMaterials(materials, this.OBJLoader, this.scene)
      );

      // Create ground
      this.groundMat = new THREE.MeshPhongMaterial({ color: 0x404040 });
      this.groundGeo = new THREE.PlaneGeometry(400, 400);
      this.ground = new THREE.Mesh(this.groundGeo, this.groundMat);
      this.ground.combine = THREE.MixOperation;
      this.ground.shininess = 30;
      this.ground.metal = true;
      this.ground.position.y = 0;
      this.negPI = -Math.PI;
      this.devNegPi = (this.negPI / 2);
      this.ground.rotation.x = this.devNegPi;
      this.ground.doubleSided = true;
      this.scene.add(this.ground);

      // RENDER SCENE
      this.requestID = null;
      const render = () => {
        this.controls.update();
        //this.skyBox.position.copy(this.camera.position);
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

// use to wrap materials around obj
/*
this.materialCreator = new THREE.MTLLoader.MaterialCreator()
this.materialCreator.prototype.createMaterial(materialName) = > {

  let scope = this;
  let mat = this.materialsInfo[ materialName ];
  let params = {
   name: materialName
   };


  for ( var prop in mat ) {

       var value = mat[ prop ];
       var n;

       if ( value === '' ) continue;

        switch ( prop.toLowerCase() ) {

          case 'map_kd':

             // Diffuse texture map

             setMapForType( "map", value );

             break;

         default:
           break;

        }
}

*/
// createMaterial_: function ( materialName ) {

//   // Create material

//   var scope = this;
//   var mat = this.materialsInfo[ materialName ];
//   var params = {

//     name: materialName,
//     side: this.side

//   };

//   function resolveURL( baseUrl, url ) {

//     if ( typeof url !== 'string' || url === '' )
//       return '';

//     // Absolute URL
//     if ( /^https?:\/\//i.test( url ) ) return url;

//     return baseUrl + url;

//   }

//   function setMapForType( mapType, value ) {

//     if ( params[ mapType ] ) return; // Keep the first encountered texture

//     var texParams = scope.getTextureParams( value, params );
//     var map = scope.loadTexture( resolveURL( scope.baseUrl, texParams.url ) );

//     map.repeat.copy( texParams.scale );
//     map.offset.copy( texParams.offset );

//     map.wrapS = scope.wrap;
//     map.wrapT = scope.wrap;

//     params[ mapType ] = map;

//   }

//   for ( var prop in mat ) {

//     var value = mat[ prop ];
//     var n;

//     if ( value === '' ) continue;

//     switch ( prop.toLowerCase() ) {

//       // Ns is material specular exponent

//       case 'kd':

//         // Diffuse color (color under white light) using RGB values

//         params.color = new THREE.Color().fromArray( value );

//         break;

//       case 'ks':

//         // Specular color (color when light is reflected from shiny surface) using RGB values
//         params.specular = new THREE.Color().fromArray( value );

//         break;

//       case 'ke':

//         // Emissive using RGB values
//         params.emissive = new THREE.Color().fromArray( value );

//         break;

//       case 'map_kd':

//         // Diffuse texture map

//         setMapForType( "map", value );

//         break;

//       case 'map_ks':

//         // Specular map

//         setMapForType( "specularMap", value );

//         break;

//       case 'map_ke':

//         // Emissive map

//         setMapForType( "emissiveMap", value );

//         break;

//       case 'norm':

//         setMapForType( "normalMap", value );

//         break;

//       case 'map_bump':
//       case 'bump':

//         // Bump texture map

//         setMapForType( "bumpMap", value );

//         break;

//       case 'map_d':

//         // Alpha map

//         setMapForType( "alphaMap", value );
//         params.transparent = true;

//         break;

//       case 'ns':

//         // The specular exponent (defines the focus of the specular highlight)
//         // A high exponent results in a tight, concentrated highlight. Ns values normally range from 0 to 1000.

//         params.shininess = parseFloat( value );

//         break;

//       case 'd':
//         n = parseFloat( value );

//         if ( n < 1 ) {

//           params.opacity = n;
//           params.transparent = true;

//         }

//         break;

//       case 'tr':
//         n = parseFloat( value );

//         if ( this.options && this.options.invertTrProperty ) n = 1 - n;

//         if ( n > 0 ) {

//           params.opacity = 1 - n;
//           params.transparent = true;

//         }

//         break;

//       default:
//         break;

//     }

//   }

//   this.materials[ materialName ] = new THREE.MeshPhongMaterial( params );
//   return this.materials[ materialName ];

// },