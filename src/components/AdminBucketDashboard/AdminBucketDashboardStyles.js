import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    root: {
        minHeight: "500px",
        minWidth: "700px",
        maxHeight: "85vh",
        width: "70vw",
        marginTop: "25px",
        overflowY: "scroll",
        overflowX: "hidden"
    },
    frame: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center"
    },
    textField: {
        margin: "10px",
        width: "90%"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    }

}));

export default useStyles;
