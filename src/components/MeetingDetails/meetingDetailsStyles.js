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
    boxDiv: {
        marginTop: "20px"
    },
    playerWrapper: {
        width: "90%",
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