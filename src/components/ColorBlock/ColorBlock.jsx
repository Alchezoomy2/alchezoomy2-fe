import React from "react";
import useStyles from "./ColorBlockStyles.js";

export default function ColorBlock({ color, selectedColor, handleColorChange }) {
    const classes = useStyles();
    return (
        <li>
            <label>
                <input
                    className={classes.radioButton}
                    name="color-block"
                    id={`color${color}`}
                    type="radio"
                    value={color}
                    checked={color === selectedColor}
                    onChange={() => handleColorChange(color)}
                    required />
                <div
                    className={classes.colorBlock}
                    style={{ backgroundColor: color }}
                />
            </label>
        </li>
    );
}