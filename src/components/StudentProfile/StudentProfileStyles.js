import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
    root: {
        height: "100vh",
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "15px"
    },
    button: {
        height: "50px",
        width: "150px",
    },
    mainLogo: {
        height: "500px",
    },
    inviteText: {
        margin: "25px"
    },

    passwordForm: {
        height: "300px",
        display: "flex",
        flexDirection: "column",
        width: "500px"
    },

    nameForm: {
        display: "flex",
        flexDirection: "column",

    }
});

export default useStyles;
