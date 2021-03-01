import React from "react";
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
import Policies from "./Policies.jsx";
import Terms from "./Terms.jsx";
import Support from "./Support.jsx";
import { useStateStore } from "./StoreProvider";
import { useObserver } from "mobx-react";


export const App = () => {
    const store = useStateStore();

    return useObserver(() =>
        <ThemeProvider theme={theme}>
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
                        token={store.loggedIn}
                        component={Student} />
                    <Route path="/invite/:jwt"
                        component={InvitePage} />
                    <Route path="/policy"
                        component={Policies} />
                    <Route path="terms"
                        component={Terms} />
                    <Route path="support"
                        component={support} />
                </Switch >
            </Router >
        </ThemeProvider >
    );
};

export default App;
