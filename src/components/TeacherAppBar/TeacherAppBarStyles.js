import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        padding: "5px"
    },
    textField: {
        marginLeft: "15px",
        width: "500px"
    },
    userInfo: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
    },
    teacherName: {
        marginLeft: "5px",
        alignContent: "center"
    },
    avatar: {
        cursor: "pointer",
        border: "3px solid white"
    }


});

export default useStyles;
