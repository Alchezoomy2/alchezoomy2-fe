import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    root: {
        minHeight: "60vh",
        minWidth: "500px",
        maxHeight: "85vh",
        width: "90vw",
        marginTop: "25px"
    },
    frame: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center"
    }
}));

export default useStyles;

