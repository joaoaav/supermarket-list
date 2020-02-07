import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import firebase from "@firebase/app";
import "@firebase/firestore";
import { FirestoreProvider } from "react-firestore";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

const config = {
  apiKey: "<API KEY>",
  projectId: "<Project ID>"
};
firebase.initializeApp(config);

ReactDOM.render(
  <FirestoreProvider firebase={firebase}>
    <App />
  </FirestoreProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
