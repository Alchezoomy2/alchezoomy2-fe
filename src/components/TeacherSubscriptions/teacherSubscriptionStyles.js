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
        // width: "100%",
        // border: `1px solid ${secondaryMain}`,
        // borderRadius: "5px",
        marginBottom: "25px",
        padding: "15px"
    },
    list: {
        width: "100%",
        minHeight: "50vh",
        overflowY: "scroll",
        overflowX: "hidden"
    },
    searchBar: {
        padding: "15px"
    }
}));

export default useStyles;
