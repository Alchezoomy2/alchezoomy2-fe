import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
    root: {
        height: "500px",
        flexDirection: "column",
        display: "flex",
        justifyItems: "center",
        alignItems: "center"
    },
    field: {
        width: "500px"
    }
});

export default useStyles;
