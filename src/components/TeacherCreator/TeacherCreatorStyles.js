import { makeStyles } from "@material-ui/core/styles";
// import { primaryColor, textColor } from "./constants.js";

export const useStyles = makeStyles({
    root: {
        height: "100vh",
        flexDirection: "column",
        display: "flex",
        justifyItems: "center",
        alignItems: "center"
    },
    list: {
        listStyleType: "none",
        display: "inline"
    },

});

export default useStyles;
