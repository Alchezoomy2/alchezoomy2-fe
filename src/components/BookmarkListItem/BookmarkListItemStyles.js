import { makeStyles } from "@material-ui/core/styles";

const BookmarkListItemStyles = makeStyles(({
    frame: props => ({
        borderLeft: `15px solid ${props.borderColor}`,
        margin: "3px"
    }),
    text: {
        display: "flex",
        alignItems: "center"
    },
    buttons: {
        height: "50px",
        width: "15vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    }

}));

export default BookmarkListItemStyles;