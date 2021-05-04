import { makeStyles } from "@material-ui/core/styles";
import { secondaryMain } from "../../styles/colors";
export const useStyles = makeStyles({
    radioButton: {
        display: "none"
    },
    colorBlock: {
        height: "50px",
        width: "50px",
        padding: "3px"
    },
    selected: {
        border: `3px solid ${secondaryMain}`,
        height: "50px",
        width: "50px"
    }
});

export default useStyles;
