import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    root: {
        minHeight: "60vh",
        minWidth: "700px",
        maxHeight: "85vh",
        width: "70vw",
        marginTop: "25px",
        overflowY: "auto",
        overflowX: "scroll"
    },
    frame: {
        display: "flex",
        justifyContent: "center"
    }
}));

export default useStyles;

