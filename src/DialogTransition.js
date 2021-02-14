import React from "react";
import { Slide } from "@material-ui/core";

export const Transition = React.forwardRef(function Transition(props, ref) {

    const slideDirections = ["up", "down", "right", "left"];
    const transitionDirection = Math.floor(Math.random() * Math.floor(4));
    return <Slide
        direction={slideDirections[transitionDirection]} ref={ref} {...props} />;
});

export default Transition;