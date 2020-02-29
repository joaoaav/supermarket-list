This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Database Configuration

We are using a simple Database on Firebase. Head towards https://console.firebase.google.com/u/0/ and
enter a name for your project. Turn off the option "Enable Google Analytics for this project" and click on
'Create Project'

Once project is created, select 'Database' in the left menu and then 'Create Database'.
Click 'Start in test mode'. Select the relevant location for your project

Click '+Start collection' and name it 'supermarket-list'
Enter any document name to it and click Save

## Configure environment file

In the project folder create a file .env with the following:

REACT_APP_FIRESTORE_APIKEY=<your_firestore_project_apikey>
REACT_APP_FIRESTORE_PROJECTID=<your_firestore_project_projectid>

You can get get these values under Project Settings -> Firebase SDK snippet on your Firebase account

## To start the App

In the project directory run the command `yarn install`

and then `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

### Deploying

Reference: https://medium.com/@impaachu/host-a-react-based-website-free-of-cost-with-firebase-hosting-and-connect-with-your-own-domain-53146731807f

#### Configure deployment with Firebase Hosting

1. `npm install -g firebase-tools`
1. `firebase login`
1. `firebase init`
1. ? Are you ready to proceed? `Yes`
1. ? Which Firebase CLI features do you want to setup for this folder? Press Space to select features, then Enter to confirm your choices. `Hosting: Configure and deploy Firebase Hosting sites`
1. Select the desired firebase project
1. Folder `build`
1. ? Configure a single-page app `Yes`

#### Releasing

1. `yarn build`
1. `firebase deploy`
