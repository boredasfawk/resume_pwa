import React from "react";

// @material-ui/core components
import classNames from "classnames";
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

// const canvas = {
//   display: "flex",
//   flexDirection: "column",
//   zIndex: 1
// }

// const log = {
//   background: "rgba(20, 120, 20, 0.5)",
//   overflow: "hidden",
//   width: "18vw",
//   height: "60vh",
//   fontSize: ".7rem",
//   position: "absolute",
//   border: "2px solid #FFF",
//   borderRadius: "1px",
//   color: "#FFF",
//   fontFamily: "arial",
//   left: "3.3rem"
// }

const useStyles = makeStyles(styles);
const TeamSection = (props) => {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <React.Fragment>
      <div
        className={classes.section}
      >
        <h2 className={classes.title} style={{ zIndex: 1 }} >Hi!, here's a lil info about me</h2>
        <div >
          <GridContainer style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}>
            <GridItem id="log" xs={12} sm={12} md={4}>
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
                    I specialize in javascript development.

                    I am proficient in many modern web technologies including  React, Vue, Node, {"&"} Express along with cloud based services.
                    My experience ranges from creating simple sites to complex applications.
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

export default TeamSection;
