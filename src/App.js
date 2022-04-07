import './App.css';
import React, { useState } from 'react';
import {
    useMantineTheme,
} from '@mantine/core';

import Home from "./containers/Home/Home";

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import Welcome from './containers/Welcome/Welcome';
import keycloak from './services/Keycloak';
import PrivateRoute from './helpers/PrivateRoute';

function App() {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
  return (
      <>
        <ReactKeycloakProvider authClient={keycloak}>
            <div>
                <Router>
                    <Switch>
                        <Route  path='/home' component={Welcome} />
                        <PrivateRoute  path='/' component={Home} />
                    </Switch>
                </Router>
            </div>

        </ReactKeycloakProvider>
        
        </>
    );
}

export default App;
