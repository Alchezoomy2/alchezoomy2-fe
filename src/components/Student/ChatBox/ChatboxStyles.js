import { makeStyles } from "@material-ui/core/styles";
import { primaryMain } from "../../../styles/colors";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "50vw",
        height: "auto",
        maxHeight: "500px",
        maxWidth: "700px",
    },
    header: {
        width: "100%",
        // padding: "5px",
        backgroundColor: primaryMain,
        color: "white"
    },
    label: {
        marginLeft: "15px"
    },
    list: {
        height: "400px",
        width: "100%",
        overflow: "scroll"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
    },

    replyIcon: {
        transform: "scaleX(-1)"
    }
}));

export default useStyles;
