import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    frame: {
        width: "100%",
        height: "100%",
    },
    root: {
        height: "85vh",
        width: "100%",
        marginTop: "25px",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
    },
    list: {
        width: "95%",
        height: "85vh",
    },
    widgets: {
        width: "50vw",
        display: "flex",
        justifyContent: "space-between"

    }


}));

export default useStyles;

