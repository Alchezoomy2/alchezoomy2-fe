import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    frame: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center"
    },
    root: {
        height: "100vh - 50px",
        width: "100%",
        marginTop: "25px"
    },
    list: {
        width: "95%",
        height: "100vh - 50px",
        border: "1px solid green"
    }

}));

export default useStyles;

