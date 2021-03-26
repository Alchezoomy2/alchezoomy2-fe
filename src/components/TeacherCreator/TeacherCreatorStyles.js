import { makeStyles } from "@material-ui/core/styles";
// import { primaryColor, textColor } from "./constants.js";

export const useStyles = makeStyles({
    root: {
        height: "90vh",
        flexDirection: "column",
        display: "flex",
        justifyItems: "center",
        alignItems: "center"
    },
    card: {
        height: "500px",
        width: "70vw"
    },
    list: {
        listStyleType: "none",
        display: "flex",
        width: "350px",
        justifyContent: "space-around"
    },

});

export default useStyles;
