import { combineReducers } from "redux";
//import visibilityFilter from "./visibilityFilter";
import ListItemsReducer from "./todos";

import { withReduxStateSync } from "redux-state-sync";

const rootReducer = combineReducers({
  ListItemsReducer
});

export default withReduxStateSync(rootReducer);
