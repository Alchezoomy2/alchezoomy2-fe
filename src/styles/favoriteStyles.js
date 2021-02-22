import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    root: {
        minHeight: "60vh",
        minWidth: "400px",
        maxHeight: "90vh",
        maxWidth: "80vw",
        marginTop: "25px"
    },
    frame: {
        display: "flex",
        justifyContent: "center"
    }
}));

export default useStyles;

