import { makeStyles } from "@material-ui/core/styles";
import { primaryMain } from "../../../styles/colors";

const useListItemStyles = makeStyles(() => ({
    root: {
        minWidth: "500px",
        minHeight: "300px"
    },
    dialogTitle: {
        color: "white",
        backgroundColor: primaryMain
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

export default useListItemStyles;