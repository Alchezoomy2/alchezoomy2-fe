import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    frame: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center"
    },
    root: {
        height: "100vh - 100",
        width: "95vw",
        marginTop: "25px"
    },
    list: {
        width: "95%"
    }

}));

export default useStyles;

