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
        justifyItems: "spacebetween",
        border: "1px solid green"
    }

}));

export default useStyles;