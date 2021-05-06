import { makeStyles } from "@material-ui/core/styles";
import { root, welcomeFrame } from "../../../styles/frames";

export const useStyles = makeStyles({
    root, welcomeFrame: {
        ...welcomeFrame,
        border: "none"
    },
    button: {
        height: "50px",
        width: "150px",
        // backgroundColor: primaryColor,
        // color: textColor
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
