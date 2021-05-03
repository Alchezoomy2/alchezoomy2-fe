import { makeStyles } from "@material-ui/core/styles";
import { root, frame, component } from "../../styles/frames";
const useStyles = makeStyles(() => ({
    root, frame, component,
    boxDiv: {
        marginTop: "20px"
    },
    playerWrapper: {
        width: "80%",
        maxWidth: "800px",
        height: "auto", // Reset height
        border: "1px solid blue",
        display: "flex",
        alignContent: "center",
        justifyItems: "center"
    },
    container: {
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyItems: "center"
    }
    // reactPlayer: {
    //     // paddingTop: "56.25 %", // Percentage ratio for 16:9
    //     width: "100%",
    //     height: "100%"
    // }
}));

export default useStyles;