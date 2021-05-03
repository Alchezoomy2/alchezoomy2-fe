import { makeStyles } from "@material-ui/core/styles";
import { root, frame } from "../../styles/frames";
const useStyles = makeStyles(() => ({
    root, frame,
    boxDiv: {
        marginTop: "20px"
    },
    playerWrapper: {
        width: "80%",
        maxWidth: "1000px",
        height: "auto", // Reset height
    },
    // reactPlayer: {
    //     // paddingTop: "56.25 %", // Percentage ratio for 16:9
    //     width: "100%",
    //     height: "100%"
    // }
}));

export default useStyles;