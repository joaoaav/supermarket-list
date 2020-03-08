const config = {
  apiKey: process.env.REACT_APP_FIRESTORE_APIKEY,
  projectId: process.env.REACT_APP_FIRESTORE_PROJECTID,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

export default config;
