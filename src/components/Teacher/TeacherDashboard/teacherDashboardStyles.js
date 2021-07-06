import { makeStyles } from "@material-ui/core/styles";
import { root, frame } from "../../../styles/frames";

const useStyles = makeStyles(() => ({
    root,
    frame,
    list: {
        width: "100%",
        height: "85vh",
        overflowY: "scroll",
        overflowX: "auto"
    },

}));

export default useStyles;

