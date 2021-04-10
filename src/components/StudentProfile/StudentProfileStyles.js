import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
    root: {
        height: "100vh",
        flexDirection: "column",
        display: "flex",
        justifyItems: "center",
        alignItems: "center"
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

    signupForm: {
        height: "300px",
        display: "flex",
        flexDirection: "column",
        width: "500px"
    }
});

export default useStyles;
