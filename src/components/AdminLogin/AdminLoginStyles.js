import { makeStyles } from "@material-ui/core/styles";
import { root, welcomeFrame } from "../../styles/frames";

export const useStyles = makeStyles({
    root, welcomeFrame,
    // welcomeFrame: {
    //     ...welcomeFrame,
    //     border: "none"
    // },
    button: {
        height: "50px",
        width: "150px",
    },
    mainLogo: {
        height: "250px",
    },
    inviteText: {
        margin: "25px"
    },
    loginForm: {
        height: "700px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "500px",
        border: "5px solid white",
        borderRadius: "15px",
        padding: "25px",
        margin: "25px"
    }
});

export default useStyles;
