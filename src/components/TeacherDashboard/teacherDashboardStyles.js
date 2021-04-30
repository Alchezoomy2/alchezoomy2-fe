import { makeStyles } from "@material-ui/core/styles";
import { root, frame } from "../../styles/frames";

const useStyles = makeStyles(() => ({
    root,
    frame,
    list: {
        width: "100%",
        maxHeight: "80vh",
        overFlowY: "scroll",
        overFlowX: "hidden"
    },

}));

export default useStyles;

