import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        // justifyContent: "center",
        width: "100vw",
        marginTop: "50px",
        alignItems: "center"
    },
    playerWrapper: {
        width: "1000px",
        // maxWidth: "800px", // Reset width
        height: "auto", // Reset height
    },
    reactPlayer: {
        // paddingTop: "56.25 %", // Percentage ratio for 16:9
        position: "absolute",
        width: "1000px",
        height: "100%" // Set to relative
    }
}));

export default useStyles;