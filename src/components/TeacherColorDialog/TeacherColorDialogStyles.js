import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
    root: {
        height: "500px",
        width: "700px",
        flexDirection: "column",
        display: "flex",
        justifyItems: "center",
        alignItems: "center"
    },
    list: {
        listStyleType: "none",
        display: "flex",
        width: "350px",
        justifyContent: "space-around",
        margin: "5px",
    },

});

export default useStyles;
