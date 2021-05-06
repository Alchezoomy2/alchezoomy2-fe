import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import zxcvbn from "zxcvbn";
import { useStyles } from "./passwordMeterStyles";
import returnPasswordLabel from "./returnPasswordLabel";

export default function usePasswordMeter() {
    const [strength, setStrength] = useState(0);
    const [label, setLabel] = useState("");
    const [color, setColor] = useState("");
    const props = { progressColor: color };
    const classes = useStyles(props);

    const checkPasswordStrength = (password = "") => {
        if (password !== "") {
            const { score } = zxcvbn(password);
            setStrength(score);
        } else {
            setStrength(0);
        }
        const { returnLabel, returnColor } = returnPasswordLabel(strength);

        setLabel(returnLabel);
        setColor(returnColor);
        return strength;
    };


    const PasswordMeterComponent = () => (
        <div className={classes.root}>
            <Typography>
                {`Password Strength: ${label}`}
            </Typography>
            <progress
                className={classes.progress}
                style={{ backgroundColor: color }}
                value={strength}
                max="4" />
        </div >
    );


    return { checkPasswordStrength, PasswordMeterComponent };

}
