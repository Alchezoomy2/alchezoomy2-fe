import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({
    frame: props => ({
        borderLeft: `15px solid ${props.borderColor}`,
        margin: "3px"
    }),
    buttons: {
        height: "50px",
        width: "20vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    }

}));

export default useStyles;