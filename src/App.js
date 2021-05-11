import React from "react";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./styles/theme.js";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";

import PrivateRoute from "./PrivateRoute.js";
import LandingPage from "./containers/LandingPage/LandingPage";
import AutoRedirect from "./components/Teacher/Redirect/Redirect";
import TeacherLogin from "./components/Teacher/TeacherLogin/TeacherLogin";
import TeacherInvite from "./components/Teacher/TeacherInvite/TeacherInvite";
import Teacher from "./containers/Teacher/Teacher";
import Student from "./containers/Student/Student";
import StudentLogin from "./components/Student/StudentLogin/StudentLogin";
import StudentInvite from "./components/Student/StudentInvite/StudentInvite";
import Policies from "./Policies.jsx";
import Terms from "./Terms.jsx";
import Support from "./Support.jsx";
import Instructions from "./components/Shared/Instructions/Instructions";
import AdminLogin from "./components/Admin/AdminLogin/AdminLogin";
import Admin from "./containers/Admin/Admin";
import ResetPassword from "./components/Student/ResetPassword/ResetPassword";
import StudentChangePassword from "./components/Student/StudentChangePassword/StudentChangePassword";

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
                        path="/student/password/:jwt"
                        component={StudentChangePassword} />
                    <Route
                        exact
                        path="/student/login"
                        component={StudentLogin} />
                    <Route
                        path="/student/invite/:jwt"
                        component={StudentInvite} />
                    <Route
                        exact
                        path="/student/reset"
                        component={ResetPassword} />
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
                    <Route
                        path="/instructions"
                        component={Instructions} />
                    {/* <Route path="/zoomverify"
                        component={zoom} /> */}
                </Switch >
            </Router >
        </ThemeProvider >
    );
};

export default App;
