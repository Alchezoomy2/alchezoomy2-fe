import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    root: {
        minHeight: "60vh",
        minWidth: "700px",
        maxHeight: "85vh",
        width: "70vw",
        marginTop: "25px",
        overflowY: "scroll",
        overflowX: "hidden"
    },
    frame: {
        display: "flex",
        justifyContent: "center"
    },
    textField: {
        marginLeft: "15px",
        width: "500px"
    },
    input: {
        color: "white",
        borderColor: "white"
    },
    teacherName: {
        marginLeft: "5px"
    },
    searchBar: {
        flexGrow: 1,
        border: "1px solid #4054b4",
        borderRadius: "5px"
    },
}));

export default useStyles;
