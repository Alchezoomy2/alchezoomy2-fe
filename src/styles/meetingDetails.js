import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100vw",
        marginTop: "50px",
        alignItems: "center"
    },
    playerWrapper: {
        width: "100%",
        maxWidth: "800px", // Reset width
        height: "auto", // Reset height
    },
    reactPlayer: {
        // paddingTop: "56.25 %", // Percentage ratio for 16:9
        width: "100%",
        height: "100%"
    }
}));

export default useStyles;