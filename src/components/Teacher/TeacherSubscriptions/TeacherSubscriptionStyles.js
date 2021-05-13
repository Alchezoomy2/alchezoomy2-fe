import { makeStyles } from "@material-ui/core/styles";
import { root, frame } from "../../../styles/frames";

const useStyles = makeStyles(() => ({
    root, frame,
    component: {
        display: "flex",
        flexDirection: "column",
        width: "70%",
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
        marginBottom: "25px",
        padding: "15px"
    },
    list: {
        width: "100%",
        minHeight: "60vh",
        overflowY: "auto",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // justifyContent: "center",
    },
    searchBar: {
        padding: "15px"
    }
}));

export default useStyles;
