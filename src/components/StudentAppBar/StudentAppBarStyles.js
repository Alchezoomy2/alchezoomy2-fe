import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
    appBar: {
        width: "100%"
    },
    iconDiv: {
        display: "flex",
        alignContent: "flex-end",
        justifyContent: "flex-start",
        flexGrow: 1,
        marginLeft: "25px"
    },
    icon: {
        backgroundColor: "black",
        width: "35px",
        height: "50px",
        display: "flex",
        justifyContent: "center"

    }
}));

export default useStyles;
