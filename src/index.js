import ReactDOM from "react-dom";
import App from "./containers/App";
import HttpService from "./services/HttpService";
import UserService from "./services/UserService";

const renderApp = () => ReactDOM.render(<App/>, document.getElementById("root"));

UserService.initKeycloak(renderApp);
HttpService.configure();
