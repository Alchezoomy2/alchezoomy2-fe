import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({
    frame: props => ({
        borderLeft: `15px solid ${props.borderColor}`,
        margin: "3px"
    }),
    chips: {
        width: "30vw",
        display: "flex",
        justifyContent: "space-between",
        alignContent: "center"
    }

}));

export default useStyles;