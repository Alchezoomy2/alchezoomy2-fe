import { makeStyles } from "@material-ui/core/styles";
import { primaryMain } from "../../../styles/colors";

export const useStyles = makeStyles({
    root: {
        height: "300px",
        width: "500px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
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
        height: "90%",
    },
    list: {
        listStyleType: "none",
        display: "flex",
        justifyContent: "space-around",
        width: "100%",
        padding: 0
    },
    buttonDiv: {
        width: "100%",
        display: "flex",
        justifyContent: "center"
    }

});

export default useStyles;
