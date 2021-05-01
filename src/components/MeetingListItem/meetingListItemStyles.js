import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({
    frame: props => ({
        borderLeft: `15px solid ${props.borderColor}`,
        margin: "3px"
    }),
    chips: {
        width: "40vw",
        display: "flex",
        alignItems: "center",
        justifyItems: "space-between",
    }

}));

export default useStyles;