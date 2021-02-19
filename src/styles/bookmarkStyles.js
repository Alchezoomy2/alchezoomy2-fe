import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    root: {
        maxHeight: "90vh",
        maxWidth: "80vw",
        overflow: "scroll",
        marginTop: "25px"
    },
    frame: {
        display: "flex",
        justifyContent: "center"
    }
}));

export default useStyles;

