import { makeStyles } from "@material-ui/core/styles";
import { root, frame } from "../../styles/frames";
const useStyles = makeStyles(() => ({
    root, frame,
    component: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "85vh"
    },

}));

export default useStyles;

