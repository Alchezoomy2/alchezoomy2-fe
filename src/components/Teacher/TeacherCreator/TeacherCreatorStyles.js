import { makeStyles } from "@material-ui/core/styles";
import { primaryMain } from "../../../styles/colors";

export const useStyles = makeStyles({
    root: {
        height: "700px",
        flexDirection: "column",
        display: "flex",
        justifyContents: "center",
        alignItems: "center",
        zIndex: "1000"
    },
    title: {
        backgroundColor: primaryMain,
    },
    list: {
        listStyleType: "none",
        display: "flex",
        justifyContent: "space-around",
        width: "100%",
        padding: 0
    },

});

export default useStyles;
