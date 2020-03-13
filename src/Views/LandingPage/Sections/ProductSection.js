import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "@Components/Hero/Grid/GridContainer.js";
import GridItem from "@Components/Hero/Grid/GridItem.js";
import SectionCarousel from "./SectionCarousel";

import styles from "@Styles/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Past projects</h2>
        </GridItem>
      </GridContainer>

      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <SectionCarousel />
        </GridItem>
      </GridContainer>

    </div>
  );
}
