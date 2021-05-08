import { makeStyles } from "@material-ui/core/styles";
import { primaryMain } from "../../../styles/colors";

export const useStyles = makeStyles({
    root: {
        height: "500px",
        flexDirection: "column",
        display: "flex",
        justifyContents: "center",
        alignItems: "center",
        zIndex: "1000"
    },
    title: {
        backgroundColor: primaryMain,
        color: "white"
    },
    colorFrame: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        width: "90%",
        height: "100%",
    },
    list: {
        listStyleType: "none",
        display: "flex",
        justifyContent: "space-around",
        width: "100%",
        padding: 0
    },

});

export default useStyles;
