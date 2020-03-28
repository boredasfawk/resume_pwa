/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import ListItemText from '@material-ui/core/ListItemText';

// @material-ui/icons
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
// core components
import Button from "@Components/CustomButtons/Button.js";

import styles from "@Styles/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>


      <ListItem className={classes.listItem}>

        <Tooltip
          id="instagram-twitter"
          title="Connect on Github"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://https://github.com/boredasfawk"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <GitHubIcon color="secondary" />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="Connect on Linkedin"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.linkedin.com/in/olonnye"
            target="_blank"
            className={classes.navLink}
          >
            <LinkedInIcon color="secondary" />
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
}
