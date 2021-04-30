import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({
    frame: props => ({
        borderLeft: `15px solid ${props.borderColor}`
    }),
    listItem: {
        display: "flex",
        justifyContent: "center",
        border: "1px solid red"
    },
    chips: {
        display: "flex",
        justifyContent: "center",
        border: "1px solid blue"
    }

}));

export default useStyles;