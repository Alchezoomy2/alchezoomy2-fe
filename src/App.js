require("dotenv").config();
import React from "react";
import { StoreProvider } from "./StoreProvider.js";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./styles/theme.js";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";

import PrivateRoute from "./PrivateRoute.js";
import LandingPage from "./LandingPage.js";
import AutoRedirect from "./Redirect.js";
import Login from "./Login.js";
import Teacher from "./Teacher.js";
import Student from "./Student.js";
import InvitePage from "./InvitePage.jsx";
import { useStateStore } from "./StoreProvider";


export const App = () => {
    const store = useStateStore();
    console.log(store.loggedIn);

    return (
        <ThemeProvider theme={theme}>
            <StoreProvider>
                <Router>
                    <Switch>
                        <Route exact path="/"
                            component={LandingPage} />
                        <Route path="/redirect/"
                            component={AutoRedirect} />
                        <Route path="/login/"
                            component={Login} />
                        <PrivateRoute
                            token={store.loggedIn}
                            path="/teacher"
                            component={Teacher} />
                        <PrivateRoute path="/student"
                            component={Student} />
                        <Route path="/invite/:jwt"
                            component={InvitePage} />
                    </Switch >
                </Router >
            </StoreProvider >
        </ThemeProvider>
    );
};

export default App;
