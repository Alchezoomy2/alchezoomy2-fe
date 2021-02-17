import { makeStyles } from "@material-ui/core/styles";
import { primaryColor, textColor } from "./constants.js";

export const useStyles = makeStyles({
    root: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignContent: "center"
    },
    button: {
        height: "15px",
        width: "75px",
        backgroundColor: primaryColor,
        color: textColor
    }
});

export default useStyles;
