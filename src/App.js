import { Provider } from "react-redux";
import { BrowserRouter , Route } from "react-router-dom";
import Home from "./containers/Home/Home";
import StoreService from "./services/StoreService";
import RenderOnAnonymous from "./components/RenderOnAnonymous";
import RenderOnAuthenticated from "./components/RenderOnAuthenticated";
import Welcome from "./containers/Welcome/Welcome";
import { PrivateRoute } from "./components/PrivateRoute";
import Footer from "./containers/footer/Footer";
import { CookiesProvider } from 'react-cookie';
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web';
import UserService from "./services/UserService";
import Loader from "./components/Loader";

const store = StoreService.setup();

const App = () => {
  const [keycloak, initialized] = useKeycloak();
    if (!initialized) {
        return <h3>Loading ... !!!</h3>;
    }
  return (
    <ReactKeycloakProvider 
      authClient={UserService.keycloak}
      LoadingComponent={<Loader/>}
      >
        {console.log("OKKK")}
        <CookiesProvider>
        <Provider store={store}>
          <BrowserRouter>
            <div className="container">
              <PrivateRoute  path="/home" component={Home} />
              <Route exact path="/" component={Welcome} />
              {/* <RenderOnAnonymous>
                <Welcome/>
              </RenderOnAnonymous>
              <RenderOnAuthenticated>
                <Home/>
              </RenderOnAuthenticated> */}
            </div>
          </BrowserRouter>
          <Footer></Footer>
        </Provider>
      </CookiesProvider>

    </ReactKeycloakProvider>
  );
}

export default App;
