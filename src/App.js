import React from "react";
import { StoreProvider } from "./StoreProvider.js";

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
require("dotenv").config();

function App() {
    return (
        <StoreProvider>
            <Router>
                <Switch>
                    <Route exact path="/"
                        component={LandingPage} />
                    <Route path="/redirect/"
                        component={AutoRedirect} />
                    <Route path="/login/"
                        component={Login} />
                    <PrivateRoute path="/teacher"
                        component={Teacher} />
                    <PrivateRoute path="/student"
                        component={Student} />
                </Switch >
            </Router >
        </StoreProvider >

    );
}

export default App;
