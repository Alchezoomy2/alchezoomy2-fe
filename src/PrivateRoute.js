
import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ render: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => (rest.token ? <Component {...props} {...rest} /> : <Redirect to="/" />)}
        />
    );
};

PrivateRoute.propTypes = {
    render: PropTypes.object
};

export default PrivateRoute;