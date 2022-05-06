import { useKeycloak } from "@react-keycloak/web";
import Welcome from "../containers/Welcome/Welcome";

const PrivateRoute = ({ children }) => {
 const { keycloak } = useKeycloak();

 const isLoggedIn = keycloak.authenticated;

 return isLoggedIn ? children : Welcome;
};

export default PrivateRoute;