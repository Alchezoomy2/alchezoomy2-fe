import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        justifyContent: "space-around",
        width: "100vw",
        alignItems: "space-around"
    },
    playerWrapper: {
        width: "90%",
        maxWidth: "800px", // Reset width
        height: "auto", // Reset height
    },
    reactPlayer: {
        // paddingTop: "56.25 %", // Percentage ratio for 16:9
        width: "100%",
        height: "100%" // Set to relative
    }
}));

export default useStyles;