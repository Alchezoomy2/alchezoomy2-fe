import { makeStyles } from "@material-ui/core/styles";
import { root, frame } from "../../styles/frames";

export const useStyles = makeStyles({
    root, frame,
    components: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
        width: "70%",
        minHeight: "85vh",
        border: "1px solid pink"
    },
    component: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
        width: "70%",
        border: "1px solid pink"
    },
    button: {
        height: "50px",
        width: "150px",
    },

    label: {
        marginBottom: "15px"
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
