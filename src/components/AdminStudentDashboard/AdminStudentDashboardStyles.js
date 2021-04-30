import { makeStyles } from "@material-ui/core/styles";
import { root, frame } from "../../styles/frames";

const useStyles = makeStyles(() => ({
    root, frame,
    searchBar: {
        width: "100%"
    },
    textField: {
        marginLeft: "5px",
        minWidth: "100%",
        width: "30vw"
    }
}));

export default useStyles;
