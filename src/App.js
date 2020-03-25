import React, { Component } from "react";
import "./App.css";
import ListItems from "./ListItems.js";
import "@firebase/firestore";
import withFirebaseAuth from "react-with-firebase-auth";
import "firebase/auth";
import * as firebase from "firebase/app";
import { FirestoreProvider, FirestoreCollection } from "react-firestore";
import firebaseConfig from "./firebaseConfig";

var firebaseApp = firebase.initializeApp(firebaseConfig);

class App extends Component {
  render() {
    const { user, error, signOut, signInWithGoogle } = this.props;

    return (
      <FirestoreProvider firebase={firebase}>
        <div className="App">
          <header className="App-header">
            {user ? <p>Hello, {user.displayName}</p> : <p>Please sign in.</p>}

            {user ? (
              <div>
                <button onClick={signOut}>Sign out</button>
                <FirestoreCollection
                  path="single-documents"
                  render={({ isLoading, data }) => {
                    return isLoading ? (
                      <div />
                    ) : (
                      <div>
                        <h1>Items</h1>
                        <ListItems
                          data={data}
                          collectionName="single-documents"
                          docPrefixName="items"
                        />
                      </div>
                    );
                  }}
                />
              </div>
            ) : (
              <div>
                <button onClick={signInWithGoogle}>Sign in with Google</button>
              </div>
            )}
          </header>
        </div>
      </FirestoreProvider>
    );
  }
}

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(App);
