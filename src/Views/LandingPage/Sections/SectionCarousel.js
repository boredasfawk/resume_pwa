import React from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// @material-ui/icons
import GitHubIcon from '@material-ui/icons/GitHub';
import LanguageSharpIcon from '@material-ui/icons/LanguageSharp';
// core components
import GridContainer from "@Components/Hero/Grid/GridContainer.js";
import GridItem from "@Components/Hero/Grid/GridItem.js";
import Card from "@Components/Hero/Card/Card.js";
// Images
import image1 from "@Assets/images/resort.png";
import image2 from "@Assets/images/Tea.png";
import image3 from "@Assets/images/jackieweb.png";

import styles from "@Styles/carouselStyle.js";

const useStyles = makeStyles(styles);

export default function SectionCarousel() {
  const classes = useStyles();
  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8} className={classes.marginAuto}>
            <Card carousel>
              <Carousel {...settings}>
                <div>
                  <img src={image1} alt="First slide" className="slick-image" />
                  <div className="slick-caption">
                    <h4>

                      <Button>
                        <LanguageSharpIcon color="primary" className="slick-icons" />
                        View website
                      </Button>
                      <Button>
                        <GitHubIcon color="primary" className="slick-icons" />
                        View Live Code
                      </Button>
                    </h4>
                  </div>
                </div>
                <div>
                  <img
                    src={image2}
                    alt="Second slide"
                    className="slick-image"
                  />
                  <div className="slick-caption">
                    <h4>

                      <Button>
                        <LanguageSharpIcon color="primary" className="slick-icons" />
                        View website
                      </Button>
                      <Button>
                        <GitHubIcon color="primary" className="slick-icons" />
                        View Live Code
                      </Button>
                    </h4>
                  </div>
                </div>
                <div>
                  <img src={image3} alt="Third slide" className="slick-image" />
                  <div className="slick-caption">
                    <h4>

                      <Button>
                        <LanguageSharpIcon color="primary" className="slick-icons" />
                        View website
                      </Button>
                      <Button>
                        <GitHubIcon color="primary" className="slick-icons" />
                        View Live Code
                      </Button>
                    </h4>
                  </div>
                </div>
              </Carousel>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
