import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    frame: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        border: "1px solid purple"
    },
    root: {
        height: "85vh",
        width: "100%",
        marginTop: "25px",
    },
    list: {
        width: "95%",
        height: "85vh",
        border: "1px solid green"
    }

}));

export default useStyles;

