import { makeStyles } from "@material-ui/core/styles";
import { root, frame } from "../../styles/frames";

const useStyles = makeStyles(() => ({
    root, frame,
    textField: {
        margin: "10px",
        width: "90%"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    title: {
        margin: "25px"
    }

}));

export default useStyles;
