import { makeStyles } from "@material-ui/core/styles";
import { root, frame } from "../../styles/frames";

const useStyles = makeStyles(() => ({
    root, frame,
    component: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
        width: "70%",
        minHeight: "85vh",
        border: "1px solid pink"
    },
    textField: {
        margin: "10px",
        width: "90%"
    },
    title: {
        margin: "25px"
    }

}));

export default useStyles;
