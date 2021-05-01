import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({
    frame: props => ({
        borderLeft: `15px solid ${props.borderColor}`,
        margin: "3px"
    }),
    text: {
        display: "flex",
        alignItems: "center"
    },
    buttons: {
        height: "50px",
        width: "10vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid red"
    }

}));

export default useStyles;