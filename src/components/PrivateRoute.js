import React from 'react';
import Welcome from '../containers/Welcome/Welcome';
import UserService from '../services/UserService';

export default function PrivateRoute({children}) {
    return ( UserService.isLoggedIn() ? children : <Welcome/> );
}