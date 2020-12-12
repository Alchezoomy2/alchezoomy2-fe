import React from 'react'
import { StoreProvider } from './StoreProvider.js'
// import { useStateStore } from './StoreProvider.js'

import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";

import LandingPage from './LandingPage.js';
import AutoRedirect from './Redirect.js'
import Teacher from './Teacher.js';
// import Header from './Header.js';


function App() {
    return (
        <StoreProvider>
            <Router>
                {/* Header */}
                {/* <Header /> */}
                <Switch>
                    <Route exact path="/"
                        component={LandingPage}>
                    </Route>
                    <Route path="/redirect/" component={AutoRedirect}>
                    </Route>
                    <Route path="/teacher">
                        <Teacher />
                    </Route>
                    {/* /student */}
                </Switch>
            </Router>
        </StoreProvider>

    );
}

export default App;
