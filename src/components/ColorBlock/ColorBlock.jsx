import { PropTypes } from "mobx-react";
import React from "react";
import useStyles from "./ColorBlockStyles.js";

export default function ColorBlock({ color, selectedColor, handleColorChange }) {
    const classes = useStyles();
    return (
        <li>
            <label className={classes.label}>
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
                    className={selectedColor === color ? classes.colorBlock : classes.selected}
                    style={{ backgroundColor: color }}
                />
            </label>
        </li>
    );
}

ColorBlock.propTypes = {
    color: PropTypes.string,
    selectedColor: PropTypes.string,
    handleColorChange: PropTypes.func
};

