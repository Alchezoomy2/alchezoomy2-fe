import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import zxcvbn from "zxcvbn";
import { useStyles } from "./passwordMeterStyles";
import returnPasswordLabel from "./returnPasswordLabel";

export default function usePasswordMeter() {
    const classes = useStyles();
    const [strength, setStrength] = useState(0);
    const [label, setLabel] = useState("");
    const [color, setColor] = useState("");

    const checkPasswordStrength = (password = "") => {
        if (password !== "") {
            const { score } = zxcvbn(password);
            console.log("🚀 ~ file: usePasswordMeter.jsx ~ line 16 ~ checkPasswordStrength ~ score", score);

            setStrength(score);
        } else {
            setStrength(0);
        }
        const { returnLabel, returnColor } = returnPasswordLabel(strength);
        console.log("🚀 ~ file: usePasswordMeter.jsx ~ line 21 ~ checkPasswordStrength ~ returnLabel, returnColor ", returnLabel, returnColor);
        setLabel(returnLabel);
        setColor(returnColor);
        return strength;
    };


    const PasswordMeterComponent = () => (
        <div className={classes.root}>
            <progress
                className={classes.progress}
                style={{ backgroundColor: color }}
                value={strength}
                max="4" />
            <Typography>
                {`Password Strength: ${label}`}
            </Typography>
        </div >
    );


    return { checkPasswordStrength, PasswordMeterComponent };

}
