import { applyMiddleware, createStore } from "redux";
import createRootReducer from "./RootReducer";
import thunk from "redux-thunk";

const reducer = createRootReducer();

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

export default store;
