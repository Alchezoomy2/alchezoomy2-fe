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
import Teacher from './Teacher.js';


function App() {
    const [userType] = React.useState();
    // const store = useStateStore();
    return (
        <StoreProvider>
            <Router>
                {/* Header */}
                <Switch>
                    <Route exact path="/"
                        component={LandingPage}>
                        {/* <LandingPage /> */}
                    </Route>
                    <Route path="/redirect" >
                        {

                            {/* let code = new URLSearchParams(location.search); */ }

                                {/* store.changeCode(code.get('code')); */}

                                console.log(userType)

                                {/* userType === 'teacher' ? <Redirect to="/teacher" /> : <Redirect to="/student" /> */}
                            }
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
