import { makeStyles } from "@material-ui/core/styles";
import { root, frame } from "../../styles/frames";

const useStyles = makeStyles(() => ({
    root, frame,
    component: {
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        width: "100%",
        minHeight: "85vh"
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
