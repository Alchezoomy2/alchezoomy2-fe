import { makeStyles } from "@material-ui/core/styles";
import { root, frame, component } from "../../../styles/frames";
import { primaryMain } from "../../../styles/colors";

const useStyles = makeStyles((theme) => ({
    root, frame, component,
    list: {
        width: "100%",
        height: "85vh",
        overflowY: "scroll",
        overflowX: "hidden"
    },
    listItem: {
        width: "650px",
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
    },
    dialogTitle: {
        backgroundColor: primaryMain,
        color: "white"
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
}));

export default useStyles;

