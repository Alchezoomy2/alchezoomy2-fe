import { makeStyles } from "@material-ui/core/styles";
import { root, frame, component } from "../../../styles/frames";
const useStyles = makeStyles(() => ({
    root: {
        ...root,
        height: "110vh"
    },
    frame,
    component,
    boxDiv: {
        marginTop: "20px"
    },
    playerWrapper: {
        width: "80%",
        maxWidth: "800px",
        height: "auto", // Reset height
        display: "flex",
        alignContent: "center",
        justifyItems: "center",
        margin: "15px"
    },
    bigContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

    },
    boxContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "space-between",
    },
    box: {
        margin: "15px"
    }
}));

export default useStyles;