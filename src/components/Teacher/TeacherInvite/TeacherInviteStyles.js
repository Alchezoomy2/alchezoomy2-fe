import { makeStyles } from "@material-ui/core/styles";
import { root, welcomeFrame } from "../../../styles/frames";

export const useStyles = makeStyles({
    root, welcomeFrame,
    button: {
        height: "50px",
        width: "150px",
    },
    mainLogo: {
        height: "250px",
    },
    inviteText: {
        margin: "25px"
    }
});

export default useStyles;
