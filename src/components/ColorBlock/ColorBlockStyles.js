import { makeStyles } from "@material-ui/core/styles";
// import { primaryColor, textColor } from "./constants.js";

export const useStyles = makeStyles({
    radioButton: {
        display: "none"
    },
    colorBlock: {
        height: "50px",
        width: "50px"
    },
    label: {
        "&aria-checked=true": {
            border: "1px solid blue"
        }
    },
    selected: {
        border: "3px solid orange",
        height: "50px",
        width: "50px"
    }
});

export default useStyles;
