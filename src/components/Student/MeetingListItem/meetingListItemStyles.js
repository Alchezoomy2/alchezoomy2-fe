import { makeStyles } from "@material-ui/core/styles";

const meetingListItemStyles = makeStyles(({
    frame: props => ({
        borderLeft: `15px solid ${props.borderColor}`,
        margin: "3px"
    }),
    chips: {
        height: "50px",
        width: "40vw",
        maxWidth: "650px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },

}));

export default meetingListItemStyles;