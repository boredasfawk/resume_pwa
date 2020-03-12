import React from "react";
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

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Olonnye Taylor-Watson"
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
              <h1 className={classes.title}>Your ideas becoming reality</h1>
              <h4>
                I specialize in javascript development. My experience ranges from creating
                anything from simple sites to complex applications.
                I am proficient in many modern web technologies including  React, Vue, Node, & Express along cloud based services.
                I create applications that are beautiful, functional, and focused on a great user experience.
              </h4>
              <br />
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
          <TeamSection />
          <WorkSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}
