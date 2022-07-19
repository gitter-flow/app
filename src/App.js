import {ReactKeycloakProvider} from "@react-keycloak/web"
import UserService from "./services/UserService";
import AppRouter from "./components/AppRouter";

const App = () => (
  <ReactKeycloakProvider authClient={UserService.keycloak}>
      <div className="App">
        <AppRouter/>  
      </div> 
  </ReactKeycloakProvider>
);

export default App;
