import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];
const composeArgs = [applyMiddleware(...middleware)];
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  composeArgs.push(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}
const store = createStore(
  rootReducer,
  initialState,
  compose(
    ...composeArgs
    // applyMiddleware(...middleware),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
