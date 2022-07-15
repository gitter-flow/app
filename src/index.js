import ReactDOM from "react-dom";
import App from "./App";
import HttpService from "./services/HttpService";
import UserService from "./services/UserService";

import "./font/Nunito/Nunito-Light.ttf";
import "./font/Nunito/Nunito-Bold.ttf";
import "./font/Nunito/Nunito-Regular.ttf";

const renderApp = () => ReactDOM.render(<App/>, document.getElementById("root"));

UserService.initKeycloak(renderApp);
HttpService.configure();
