import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        // flexGrow: 1,
        width: "800px",
        height: "auto",
        maxHeight: "500px"
    },
    header: {
        width: "100%",
        backgroundColor: theme.palette.primary1Color,
        color: theme.palette.textColor
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
