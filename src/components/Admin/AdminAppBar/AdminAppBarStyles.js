import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        padding: "5px"
    },
    userInfo: {
        flexGrow: 1,
        display: "flex",
        alignContent: "center",
    },
    adminName: {
        marginLeft: "5px",
        alignContent: "center"
    },

});

export default useStyles;
