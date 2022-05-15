import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home/Home";
import StoreService from "../services/StoreService";
import RenderOnAnonymous from "../components/RenderOnAnonymous";
import RenderOnAuthenticated from "../components/RenderOnAuthenticated";
import Welcome from "./Welcome/Welcome";

const store = StoreService.setup();

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div className="container">
        <RenderOnAnonymous>
          <Welcome/>
        </RenderOnAnonymous>
        <RenderOnAuthenticated>
          <Home/>
        </RenderOnAuthenticated>
      </div>
    </BrowserRouter>
  </Provider>
);

export default App;
