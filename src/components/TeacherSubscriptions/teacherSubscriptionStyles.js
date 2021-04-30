import { makeStyles } from "@material-ui/core/styles";
import { root, frame } from "../../styles/frames";
import { secondaryMain } from "../../styles/colors";

const useStyles = makeStyles(() => ({
    root, frame,

    component: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "85vh"
    },
    textField: {
        marginLeft: "5px",
        width: "90%"
    },
    input: {
        color: "white",
        borderColor: "white"
    },
    teacherName: {
        marginLeft: "5px"
    },
    inviteBar: {
        width: "100%",
        border: `1px solid ${secondaryMain}`,
        borderRadius: "5px",
        marginBottom: "25px",
        padding: "5px"
    },
    list: {
        width: "100%",
        height: "85vh",
        overflowY: "scroll",
        overflowX: "hidden"
    },
    searchBar: {
        width: "100%",
        padding: "5px"
    }
}));

export default useStyles;
