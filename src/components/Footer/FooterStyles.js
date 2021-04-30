import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    root: {
        top: "auto",
        bottom: 0
    },
    frame: {
        display: "flex",
        justifyContent: "flex-end",
        alignContent: "center",
        width: "100vw",
    },
    test: {
        border: "1px solid yellow",
        width: "90%",
    }
}));

export default useStyles;
