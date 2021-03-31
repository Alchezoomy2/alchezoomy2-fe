import React from "react";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./styles/theme.js";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";

import PrivateRoute from "./PrivateRoute.js";
import LandingPage from "./containers/LandingPage/LandingPage.js";
import AutoRedirect from "./components/Redirect/Redirect";
import TeacherLogin from "./components/TeacherLogin/TeacherLogin";
import TeacherInvite from "./components/TeacherInvite/TeacherInvite";
import Teacher from "./containers/Teacher/Teacher";
import Student from "./containers/Student/Student";
import StudentLogin from "./components/StudentLogin/StudentLogin";
import StudentInvite from "./components/StudentInvite/StudentInvite";
import Policies from "./Policies.jsx";
import Terms from "./Terms.jsx";
import Support from "./Support.jsx";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import Admin from "./containers/Admin/Admin";
import { useStateStore } from "./utils/StoreProvider";
import { useObserver } from "mobx-react";


export const App = () => {
    const store = useStateStore();

    return useObserver(() =>
        <ThemeProvider theme={theme}>
            <Router>
                <Switch>
                    <Route
                        exact
                        path="/"
                        component={LandingPage} />
                    <Route
                        path="/redirect/"
                        component={AutoRedirect} />
                    <PrivateRoute
                        token={store.loggedIn}
                        path="/admin/dashboard"
                        component={Admin} />
                    <Route
                        exact
                        path="/admin/login"
                        component={AdminLogin} />
                    <Route
                        exact
                        path="/teacher/invite/:jwt"
                        component={TeacherInvite} />
                    <Route
                        path="/teacher/login"
                        component={TeacherLogin} />
                    <PrivateRoute
                        token={store.loggedIn}
                        path="/teacher"
                        component={Teacher} />
                    <Route
                        exact
                        path="/student/login"
                        component={StudentLogin} />
                    <Route
                        path="/student/invite/:jwt"
                        component={StudentInvite} />
                    <PrivateRoute
                        path="/student"
                        token={store.loggedIn}
                        component={Student} />
                    <Route
                        path="/policy"
                        component={Policies} />
                    <Route
                        path="/terms"
                        component={Terms} />
                    <Route
                        path="/support"
                        component={Support} />
                    {/* <Route path="/zoomverify"
                        component={zoom} /> */}
                </Switch >
            </Router >
        </ThemeProvider >
    );
};

export default App;
