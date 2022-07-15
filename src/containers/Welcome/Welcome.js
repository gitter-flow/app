import UserService from "../../services/UserService";

const Welcome = () => (
  <div className="jumbotron">
    <h1>Welcome on Gitter!</h1>
    <p className="lead">Please login or get registerd!</p>
    <p>
      <button className="btn btn-lg btn-warning" onClick={() => UserService.doLogin()}>Login</button>
      <button className="btn btn-lg btn-warning" onClick={() => UserService.doRegister()}>Register</button>
    </p>
  </div>
)

export default Welcome
