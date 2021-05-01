import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({
    frame: props => ({
        borderLeft: `15px solid ${props.borderColor}`,
        margin: "3px"
    }),
    chips: {
        height: "25px",
        width: "40vw",
        display: "flex",
        alignItems: "center",
        justifyItems: "space-between",
        border: "1px solid aqua"
    }

}));

export default useStyles;