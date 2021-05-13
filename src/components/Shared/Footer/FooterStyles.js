import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    root: {
        top: "auto",
        bottom: 0,
        position: "absolute"
    },
    frame: {
        display: "flex",
        justifyContent: "flex-end",
        alignContent: "center",
        width: "95vw",
    },
}));

export default useStyles;
