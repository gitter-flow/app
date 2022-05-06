import './App.css';
import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Welcome from './containers/Welcome/Welcome';

function App() {
  return (
      <>
        {/* <ReactKeycloakProvider authClient={keycloak}> */}
            <div>
                <Router>
                    <Switch>
                        <Route  path='/home' component={Welcome} />
                        {/* <PrivateRoute  path='/' component={Home} /> */}
                    </Switch>
                </Router>
            </div>

        {/* </ReactKeycloakProvider> */}

        </>
    );
}

export default App;
