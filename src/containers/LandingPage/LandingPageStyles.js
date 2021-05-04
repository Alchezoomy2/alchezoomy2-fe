import { makeStyles } from "@material-ui/core/styles";
import { root } from "../../styles/frames";
export const useStyles = makeStyles({
    root,
    button: {
        height: "50px",
        width: "150px",
        // backgroundColor: primaryColor,
        // color: textColor
    },
    mainLogo: {
        height: "250px",
    },
    inviteText: {
        margin: "25px"
    }
});

export default useStyles;
