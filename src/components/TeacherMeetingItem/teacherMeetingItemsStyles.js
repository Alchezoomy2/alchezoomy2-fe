import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({
    frame: props => ({
        borderLeft: `15px solid ${props.borderColor}`
    }),
    listItem: {
        display: "flex",
        alignItems: "center",
    },
    chips: {
        display: "flex",
        justifyContent: "center",
        marginRight: "15px",
    },
    widgets: {
        width: "30vw",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid orange"
    }

}));

export default useStyles;