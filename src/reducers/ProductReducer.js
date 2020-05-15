import * as types from "../actions/ActionTypes";
import initialState from "./InitialState";
import { breakStatement } from "@babel/types";

export default function productReducer(state = initialState, action) {
  var newstate1 = { ...state };
  switch (action.type) {
    case types.LOAD_PRODUCTS_SUCCESS:
      console.log("hi im in reducer sending data to store as", action.products);
      newstate1 = action.products;
      console.log("hi im in reducer sending newstate to store as", newstate1);
      console.log("new state reference is same as state-", state === newstate1);
      break;

    default:
      // return state;
      break;
  }
  return newstate1;
}
