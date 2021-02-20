
import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { useStateStore } from "./StoreProvider";

const PrivateRoute = ({ render: Component, ...rest }) => {
    const store = useStateStore();
    return (
        <Route
            {...rest}
            render={props => (store.loggedIn ? <Component {...props} {...rest} /> : <Redirect to="/" />)}
        />
    );
};

PrivateRoute.propTypes = {
    render: PropTypes.object
};

export default PrivateRoute;