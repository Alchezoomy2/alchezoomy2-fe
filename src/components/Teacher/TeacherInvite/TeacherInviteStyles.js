import { makeStyles } from "@material-ui/core/styles";
import { root, welcomeFrame } from "../../../styles/frames";

export const useStyles = makeStyles({
    root, welcomeFrame,
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
    }
});

export default useStyles;
