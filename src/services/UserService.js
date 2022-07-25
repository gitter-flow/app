import Keycloak from "keycloak-js";

const keycloak = new Keycloak('/keycloak.json');


/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = (onAuthenticatedCallback) => {
  keycloak.init({
    onLoad: 'check-sso',
    // silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
    pkceMethod: 'S256',
  })
    .then((authenticated) => {
      if (!authenticated) {
        console.log("user is not authenticated..!");
      } else {
        console.log("user is authenticated..!");
        document.cookie = "keycloaktoken=" + keycloak.token;
        document.cookie = "userId=" + getuserId();
        document.cookie = "username=" + getUsername();

        // keycloak.loadUserProfile(() => {
        //   console.log("user profile loaded..!");
        //   console.log(keycloak.profile.username);
        //   document.cookie = "username=" + keycloak.profile.username;
        // })
      }
      onAuthenticatedCallback();
    })
    .catch(console.error);
};

const doRegister = () => {
  keycloak.register().then((data) => {
    console.log(data);
  })
}

const doLogin = keycloak.login;

const doSettings = keycloak.accountManagement;

const doLogout = keycloak.logout;

const getToken = () => keycloak.token;

const isLoggedIn = () => !!keycloak.token;

const updateToken = (successCallback) =>
  keycloak.updateToken(5)
    .then(successCallback)
    .catch(doLogin);

const getUsername = () => keycloak.tokenParsed?.preferred_username;

const getuserId = () => keycloak.tokenParsed.sub;


keycloak.onTokenExpired = () => {
  console.log('Token expired', keycloak.token);
  keycloak.updateToken(30).success(() => {
    console.log('Successfully get a new token', keycloak.token);
  }).error(() => {
    console.log('Erorr on trying to get a new token');
  });
}

const UserService = {
  keycloak,
  initKeycloak,
  doLogin,
  doRegister,
  doSettings,
  doLogout,
  isLoggedIn,
  getToken,
  updateToken,
  getUsername,
  getuserId,
};

export default UserService;
