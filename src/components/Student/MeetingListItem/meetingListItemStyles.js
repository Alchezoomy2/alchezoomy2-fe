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
        minWidth: "100px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    chip: {
        padding: "5px"
    }

}));

export default meetingListItemStyles;