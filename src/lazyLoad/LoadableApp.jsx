import React, { Component } from "react";
import Loadable from "react-loadable";

const LoadApp = Loadable({
  // tells loadable to import our specified component
  loader: () => import("../App.js"),
  // displays while loadable imports component
  loading() {
    return <div>Loading...</div>;
  },
  // if it isnt loadable it times CHECK HERE FOR BUGS
  timeout: 10000 // 10 seconds
});
// exports our imported components in HOC
export default class LoadableApp extends Component {
  render() {
    return <LoadApp />
  }
}