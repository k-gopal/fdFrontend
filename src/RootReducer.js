import { combineReducers } from "redux";
import reducerHome from "./components/home/redux/reducer";

const rootReducer = {
    reducerHome
}

const createRootReducer = () => combineReducers(rootReducer)
export default createRootReducer;