import { makeStyles } from "@material-ui/core/styles";
import { root, frame } from "../../styles/frames";

const useStyles = makeStyles(() => ({
    root, frame,
    component: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "85vh",
        padding: "25px"
    },
    searchBar: {
        width: "90%"
    },
    textField: {
        marginLeft: "5px",
        minWidth: "100%",
        width: "30vw"
    },
    list: {
        width: "100%",
        minHeight: "60vh",
        overflowY: "scroll",
        overflowX: "hidden"
    },
}));

export default useStyles;
