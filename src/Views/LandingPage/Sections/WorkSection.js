import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "@Components/Hero/Grid/GridContainer.js";
import GridItem from "@Components/Hero/Grid/GridItem.js";
import CustomInput from "@Components/CustomInput/CustomInput.js";
import Button from "@Components/CustomButtons/Button.js";

import styles from "@Styles/workStyle.js";

const useStyles = makeStyles(styles);

const WorkSection = () => {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={8}>
          <h2 className={classes.title}>Ready to get started?</h2>
          <h4 className={classes.description}>
            Feel free to Write a few lines about the vision you have for your project.
            I will respond back as quickly to discuss a scope of work and project expectations.
          </h4>
          <form action="https://formspree.io/oloagency@gmail.com" method="POST">
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Your Name"
                  id="name"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Your Email"
                  id="email"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <CustomInput
                labelText="Your Message"
                id="message"
                formControlProps={{
                  fullWidth: true,
                  className: classes.textArea
                }}
                inputProps={{
                  multiline: true,
                  rows: 5
                }}
              />
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={4} className={classes.textCenter}>
                  <Button color="primary">Send Message</Button>
                </GridItem>
              </GridContainer>
            </GridContainer>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default WorkSection;