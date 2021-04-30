import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({
    frame: props => ({
        borderLeft: `15px solid ${props.borderColor}`
    }),
    listItem: {
        display: "flex",
        justifyItems: "center",
        // alignItems: "center",
    },
    chips: {
        display: "flex",
        justifyContent: "center",
        marginRight: "5px",
    }

}));

export default useStyles;