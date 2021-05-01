import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({
    frame: props => ({
        borderLeft: `15px solid ${props.borderColor}`,
        margin: "3px"
    }),
    chips: {
        height: "75px",
        width: "40vw",
        display: "flex",
        alignItems: "center",
        justifyItems: "space-around",
        border: "1px solid aqua"
    }

}));

export default useStyles;