import './App.css';
import React, { useState } from 'react';
import {
    useMantineTheme,
} from '@mantine/core';

import Home from "./containers/Home/Home";
import Connexion from "./containers/Connexion/Connexion";

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import SignUp from "./containers/SignUp/SignUp";
import Navbar from './components/Navbar/Navbar';
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./services/UserService";
import { useKeycloak } from "@react-keycloak/web";
import Welcome from './containers/Welcome/Welcome';

function App() {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
  return (
      <>
        <ReactKeycloakProvider authClient={keycloak}>
            {keycloak.authenticated && <Navbar/>}
            <div>
                <Router>
                    <Switch>
                        {!keycloak.authenticated && 
                            <Route exact path='/' component={Welcome} />
                        }
                        {!!keycloak.authenticated &&
                            <Route exact path='/' component={Home} />
                        }
                        
                        <Route exact path='/connexion' component={Connexion} />
                        <Route exact path='/signup' component={SignUp} />
                    </Switch>
                </Router>
            </div>

        </ReactKeycloakProvider>
        
        </>
    );
}

export default App;
