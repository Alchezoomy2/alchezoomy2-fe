import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({
    frame: props => ({
        borderLeft: `15px solid ${props.borderColor}`,
        margin: "3px"
    }),
    chips: {
        height: "100px",
        width: "40vw",
        display: "flex",
        justifyItems: "center",
        alignItems: "space-between",
        border: "1px solid aqua"
    }

}));

export default useStyles;