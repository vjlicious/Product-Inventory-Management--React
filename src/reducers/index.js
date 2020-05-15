import { combineReducers } from "redux";
import productReducer from "./ProductReducer";
import userReducer from "./UserReducer";
const rootReducer = combineReducers({ productReducer, userReducer });

export default rootReducer;
