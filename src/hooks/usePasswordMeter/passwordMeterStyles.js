
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(({
    root: {
        width: "500px",
        height: "25px",
    },
    progress: props => ({
        backgroundColor: "white",
        width: "500px",
        appearance: "none",
        WebkitAppearance: "none",
        WebkitProgressValue: props.progressColor,
        MozProgressBar: props.progressColor
    })
    // progress: {
    //     WebkitAppearance: "none",
    //     appearance: "none",
    //     width: "500px"
    // }
}));