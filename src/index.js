import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import rootReducer from "./reducers";
import { createStore, applyMiddleware } from "redux";
import {
  createStateSyncMiddleware,
  initStateWithPrevTab
} from "redux-state-sync";

const config = {};
const middlewares = [createStateSyncMiddleware(config)];

const store = createStore(rootReducer, {}, applyMiddleware(...middlewares));
initStateWithPrevTab(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
