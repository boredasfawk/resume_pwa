//DEPS
import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader";
// 3D graphics
import * as THREE from "three";
import FOG from "@Assets/js/3D/vanta.fog.min.js";

// COMPONENTS
import LandingPage from './Views/LandingPage/LandingPage'
import Error from '@Components/Hero/Error/Error';


// Styles
import Container from '@material-ui/core/Container';

const App = (props) => {
  const [vantaEffect, setVantaEffect] = useState(0);
  useEffect(() => {
    console.log({ props }, 'landing page - use effect - vanta');
    // const rootBody = window.document.querySelector('#root')
    // rootBody.style.height = '2800px';
    if (props.vantaRef !== null && props.vantaRef.id === 'wholeCanvas') {
      if (!vantaEffect) {
        setVantaEffect(FOG({
          el: props.vantaRef,
          THREE: THREE,
          mouseControls: false,
          touchControls: false,
          minHeight: 2800.00,
          minWidth: 1200.00,
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

  return (
    <>
      <Container
        ref={ref => props.vantaRef = ref}
        id="wholeCanvas"
        maxWidth="xl"
      >

        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="*" component={Error} />
        </Switch>
      </Container>
    </>
  );
};

// helps perserve state on each reload in dev
export default hot(module)(
  React.forwardRef(
    (props, ref) => (
      <App vantaRef={ref} {...props} />
    )
  )
);
