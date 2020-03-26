import React, { useEffect, useState } from "react";
// 3D graphics
import * as THREE from "three";
import FOG from "@Assets/js/3D/vanta.fog.min.js";
// Utils
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

// core components
import Header from "@Components/Hero/Header/Header.js";
import Footer from "@Components/Hero/Footer/Footer.js";
import GridContainer from "@Components/Hero/Grid/GridContainer.js";
import GridItem from "@Components/Hero/Grid/GridItem.js";
import HeaderLinks from "@Components/Hero/Header/HeaderLinks.js";
import Parallax from "@Components/Parallax/Parallax.js";

import styles from "@Styles/landingPage.js";
import Image from "@Assets/images/landing-bg.jpeg"

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";
import WorkSection from "./Sections/WorkSection.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

const LandingPage = (props) => {
  const [vantaEffect, setVantaEffect] = useState(0);
  useEffect(() => {
    console.log({ props }, 'landing page - use effect - vanta');
    const body = document.body
    if (props.vantaRef !== null && props.vantaRef.id === 'wholeCanvas') {
      if (!vantaEffect) {
        setVantaEffect(FOG({
          el: body,
          THREE: THREE,
          mouseControls: false,
          touchControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          highlightColor: 0x0,
          midtoneColor: 0x8e1b80,
          lowlightColor: 0xfb1bb,
          baseColor: 0x846c6c,
          blurFactor: 0.28,
          speed: 1.20,
          zoom: 1
        }))
      }
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  },
    [vantaEffect]
  );

  const classes = useStyles();
  const { ...rest } = props;
  const [brand, setBrand] = React.useState({ value: '[JS DEVELOPER]', type: 0 });

  let windowsScrollTop = window.pageYOffset;

  const update = (windowsScrollTop) => {

    if (windowsScrollTop > 522 && brand.type === 0) {
      console.log("should be olani")
      setBrand({
        value: 'OLONNYE :D',
        type: 1
      });
    } else if (windowsScrollTop < 520 && brand.type === 1) {
      console.log("should be dev")
      setBrand({
        value: '[JS DEVELOPER]',
        type: 0
      });
    }
    console.log(brand);
  }

  window.addEventListener("scroll", update(windowsScrollTop))



  return (
    <div
      ref={ref => props.vantaRef = ref}
      id="wholeCanvas"
    >
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand={brand.value}
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />

      <Parallax filter image={Image}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Your ideas becoming <span style={{ color: '#ffff08' }}>reality</span></h1>
              <h4>
                I specialize in javascript development. My experience ranges from creating
                anything from simple sites to complex applications.
                </h4>
              <br />
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div
        className={classNames(classes.main, classes.mainRaised)}
      >
        <div className={classes.container}>
          <TeamSection />
          <ProductSection />
          <WorkSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default React.forwardRef(
  (props, ref) => (
    <LandingPage vantaRef={ref} {...props} />
  )
)