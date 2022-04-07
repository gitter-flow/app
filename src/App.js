import './App.css';
import React, { useState } from 'react';
import {
    useMantineTheme,
} from '@mantine/core';

import Home from "./pages/Home/Home";
import Connexion from "./pages/Connexion/Connexion";

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import Navbar from './components/Navbar/NavbarHead';
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./services/UserService";
import { useKeycloak } from "@react-keycloak/web";
import Welcome from './pages/Welcome/Welcome';

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
