import { makeStyles } from "@material-ui/core/styles";
import { primaryMain } from "../../styles/colors";

export const useStyles = makeStyles({
    root: {
        height: "300px",
        width: "700px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        border: "1px solid red"
    },
    title: {
        backgroundColor: primaryMain,
        color: "white"
    },
    colorFrame: {
        flexDirection: "column",
        justifyItems: "space-around",
        alignContent: "center",
        border: "1px solid purple"
    },
    list: {
        listStyleType: "none",
        display: "flex",
        width: "100%",
        justifyContent: "space-around",
        margin: "5px",
        border: "1px solid green"
    },

});

export default useStyles;
