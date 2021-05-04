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
    welcomeFrame: {
        display: "flex",
        height: "50vh",
        width: "50vw",
        border: "5px solid white",
        borderRadius: "15px",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",

    },
    mainLogo: {
        height: "250px",
    },
    inviteText: {
        margin: "25px"
    }
});

export default useStyles;
