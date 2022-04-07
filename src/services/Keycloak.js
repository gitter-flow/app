import Keycloak from "keycloak-js";
const keycloak = new Keycloak(require("./keycloak.json"));
keycloak.init({
  onLoad: 'login-required',
  promiseType: 'native',
  checkLoginIframe: false,
  }).then(auth => {
      if(auth) {
        console.log("token", keycloak.token);
    }
  });

export default keycloak;