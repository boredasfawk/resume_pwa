import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
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
import olani from "@Assets/images/Olani.jpeg";


const useStyles = makeStyles(styles);

const TeamSection = () => {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Hello! Nice to meet you :{')'}</h2>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img alt="picture of developer" src={olani} className={imageClasses} />
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
    </div>
  );
}

export default TeamSection;
