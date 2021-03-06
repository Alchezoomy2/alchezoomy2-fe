import { makeStyles } from "@material-ui/core/styles";
import { root, frame } from "../../../styles/frames";
import { primaryMain } from "../../../styles/colors";

export const useStyles = makeStyles({
    root, frame,
    components: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
        width: "70%",
        minHeight: "85vh",
    },
    component: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
        width: "70%",
        marginTop: "35px",
    },
    button: {
        height: "50px",
        width: "150px",
    },
    label: {
        marginBottom: "15px",
        // backgroundColor: primaryMain,
        // color: "white",
        border: `1px solid ${primaryMain}`,
        borderTop: `5px solid ${primaryMain}`,
        borderBottom: `5px solid ${primaryMain}`,
        borderRadius: "5px",
        padding: "10px"
    },
    textField: {
        margin: "5px"
    },
    passwordForm: {
        display: "flex",
        flexDirection: "column",
        width: "500px"
    },
    nameForm: {
        display: "flex",
        flexDirection: "column",
    },
    deleteAccount: {
        display: "flex",
        flexDirection: "column",
    }
});

export default useStyles;
