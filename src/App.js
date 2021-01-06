import React from 'react'
import { StoreProvider } from './StoreProvider.js'

import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";

import PrivateRoute from './PrivateRoute.js';
import LandingPage from './LandingPage.js';
import AutoRedirect from './Redirect.js';
import Login from './Login.js';
import Teacher from './Teacher.js';
import Student from './Student.js';
import Header from './Header.js';
import Bookmark from './Bookmark.js';
import MeetingDetails from './MeetingDetails.js';


function App() {
    return (
        <StoreProvider>
            <Router>
                <Header />
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
                    <PrivateRoute path="/bookmark"
                        component={Bookmark} />
                    <PrivateRoute path="/meeting/:timestamp"
                        component={MeetingDetails} />
                </Switch >
            </Router >
        </StoreProvider >

    );
}

export default App;
