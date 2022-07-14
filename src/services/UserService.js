import Keycloak from "keycloak-js";

const _kc = new Keycloak('/keycloak.json');


/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = (onAuthenticatedCallback) => {
  _kc.init({
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
    pkceMethod: 'S256',
  })
    .then((authenticated) => {
      if (!authenticated) {
        console.log("user is not authenticated..!");
      } else {
        console.log("user is authenticated..!");
        document.cookie = "keycloaktoken=" + _kc.token;
        document.cookie = "userId=" + getuserId();
      }
      onAuthenticatedCallback();
    })
    .catch(console.error);
};

const doRegister = () => {
  _kc.register().then((data) => {
    console.log(data);
  })
}

const doLogin = _kc.login;

const doSettings = _kc.accountManagement;

const doLogout = _kc.logout;

const getToken = () => _kc.token;

const isLoggedIn = () => !!_kc.token;

const updateToken = (successCallback) =>
  _kc.updateToken(5)
    .then(successCallback)
    .catch(doLogin);

const getUsername = () => _kc.tokenParsed?.preferred_username;

const getuserId = () => _kc.tokenParsed.sub;

const hasRole = (roles) => roles.some((role) => _kc.hasRealmRole(role));

_kc.onTokenExpired = () => {
  console.log('Token expired', _kc.token);
  _kc.updateToken(30).success(() => {
    console.log('Successfully get a new token', _kc.token);
  }).error(() => {
    console.log('Erorr on trying to get a new token');
  });
}

const UserService = {
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
  hasRole,
};

export default UserService;
