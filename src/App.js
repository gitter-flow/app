import './App.css';
import React, { useState } from 'react';
import {
    useMantineTheme,
} from '@mantine/core';

<<<<<<< HEAD
import Home from "./pages/Home/Home";
import Connexion from "./pages/Connexion/Connexion";
=======
import Home from "./containers/Home/Home";
>>>>>>> fix: keycloak

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
<<<<<<< HEAD
import SignUp from "./pages/SignUp/SignUp";
import Navbar from './components/Navbar/NavbarHead';
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./services/UserService";
import { useKeycloak } from "@react-keycloak/web";
import Welcome from './pages/Welcome/Welcome';
=======
import { ReactKeycloakProvider } from "@react-keycloak/web";
import Welcome from './containers/Welcome/Welcome';
import keycloak from './services/Keycloak';
import PrivateRoute from './helpers/PrivateRoute';
>>>>>>> fix: keycloak

function App() {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
  return (
      <>
        <ReactKeycloakProvider authClient={keycloak}>
            <div>
                <Router>
                    <Switch>
<<<<<<< HEAD
                        {!keycloak.authenticated &&
                            <Route exact path='/' component={Welcome} />
                        }
                        {!!keycloak.authenticated &&
                            <Route exact path='/' component={Home} />
                        }

                        <Route exact path='/connexion' component={Connexion} />
                        <Route exact path='/signup' component={SignUp} />
=======
                        <Route  path='/home' component={Welcome} />
                        <PrivateRoute  path='/' component={Home} />
>>>>>>> fix: keycloak
                    </Switch>
                </Router>
            </div>

        </ReactKeycloakProvider>

        </>
    );
}

export default App;
