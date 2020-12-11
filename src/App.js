import React from 'react'
import { StoreProvider } from './StoreProvider.js'
// import { useStateStore } from './StoreProvider.js'


import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";

import LandingPage from './LandingPage.js';
// import Redirect from './Redirect.js';
import Teacher from './Teacher.js';


function App() {
    // const [userType] = React.useState()
    return (
        <StoreProvider>
            <Router>
                {/* Header */}
                <Switch>
                    <Route exact path="/"
                        component={LandingPage}>
                        {/* <LandingPage /> */}
                    </Route>
                    <Route path="/redirect/?code">
                        <Redirect to="/teacher" />
                    </Route>
                    <Route path="/teacher">
                        <Teacher />
                    </Route>
                    {/* /teacher */}
                    {/* /student */}
                </Switch>
            </Router>
        </StoreProvider>

    );
}

export default App;
