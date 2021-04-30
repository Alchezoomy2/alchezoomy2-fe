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
    searchBar: {
        width: "100%",
        // border: "1px solid #4054b4",
        borderRadius: "5px",
        marginBottom: "25px",
        backgroundColor: "gray"
    },
    list: {
        width: "100%",
        height: "85vh",
        overflowY: "scroll",
        overflowX: "hidden"
    }
}));

export default useStyles;
