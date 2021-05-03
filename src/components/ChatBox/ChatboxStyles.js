import { makeStyles } from "@material-ui/core/styles";
import { primaryMain } from "../../styles/colors";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "50vw",
        height: "auto",
        maxHeight: "500px"
    },
    header: {
        width: "90%",
        padding: "5px",
        backgroundColor: primaryMain,
        color: "white"
    },
    list: {
        height: "400px",
        width: "100%",
        overflow: "scroll"
    },
    listItem: {
        width: "100%",
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
    },
    dialogTitle: {
        fontWeight: "bold",
        color: "black"
    },
    dialogSpeaker: {
        fontWeight: "bold",
        fontSize: "1.1em",
        margin: "3px"
    },
    dialogTimestamp: {
        fontSize: ".9em",
        margin: "3px",
        color: "secondary"
    },
    dialogText: {
        margin: "3px"
    },
    replyIcon: {
        transform: "scaleX(-1)"
    }
}));

export default useStyles;
