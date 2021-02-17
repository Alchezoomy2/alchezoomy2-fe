import { makeStyles } from "@material-ui/core/styles";
import { primaryColor, textColor } from "./constants.js";

export const useStyles = makeStyles({
    root: {
        height: "100vh",
        flexDirection: "column",
        display: "flex",
        justifyContent: "center",
        alignContent: "center"
    },
    button: {
        height: "50px",
        width: "150px",
        backgroundColor: primaryColor,
        color: textColor
    },
    mainLogo: {
        height: "500px",
    }
});

export default useStyles;
