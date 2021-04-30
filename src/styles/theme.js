import { createMuiTheme } from "@material-ui/core/styles";
import { primaryMain, secondaryMain } from "./colors";
export const theme = createMuiTheme({
    "palette": {
        "primary": {
            "main": primaryMain,
        },
        "secondary": {
            "main": secondaryMain,
        },
        "accent2Color": "#f50057",
        "primary1Color": "#1976d2",
        "primary2Color": "#039be5",
        "accent1Color": "#f50057",
        "textColor": "rgba(0, 0, 0, 0.87)",
        "canvasColor": "#ffffff",
        "alternateTextColor": "#ffffff"
    },
    "chip": {
        "backgroundColor": "#1976d2",
        "textColor": "#ffffff",
        "deleteIconColor": "#ffffff"
    },
    "toggle": {
        "thumbOffColor": "#f50057"
    }
});