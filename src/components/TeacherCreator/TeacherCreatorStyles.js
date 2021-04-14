import { makeStyles } from "@material-ui/core/styles";
// import { primaryColor, textColor } from "./constants.js";

export const useStyles = makeStyles({
    root: {
        height: "90vh",
        flexDirection: "column",
        display: "flex",
        justifyContents: "center",
        alignItems: "center",
        zIndex: "1000"
    },
    card: {
        height: "500px",
        width: "300p"
    },
    list: {
        listStyleType: "none",
        display: "flex",
        width: "350px",
        justifyContent: "space-around"
    },

});

export default useStyles;
