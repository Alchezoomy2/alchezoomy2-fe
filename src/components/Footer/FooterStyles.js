import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    root: {
        top: "auto",
        bottom: 0
    },
    frame: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        width: "100%",
        border: "1px solid red"
    }
}));

export default useStyles;
