import { applyMiddleware, createStore } from "redux";
import axiosMiddleware from "redux-axios-middleware";
import thunk from "redux-thunk";
import HttpService from "./HttpService";

const setup = () => {
  const middleware = applyMiddleware(thunk, axiosMiddleware(HttpService.getAxiosClient()));
  return createStore(middleware);
};

const StoreService = {
  setup,
};

export default StoreService;
