import React from 'react';
import { Route } from 'react-router-dom';
import Welcome from '../containers/Welcome/Welcome';
import UserService from '../services/UserService';

export function PrivateRoute({ component: Component,  ...rest }) {

    const isAuthorized = () => {
        return UserService.isLoggedIn();
    }

    return (
        <Route
            {...rest}
            render={props => {
                return isAuthorized()
                    ? <Component {...props} />
                    : <Welcome />
            }}
        />
    )
}