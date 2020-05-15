import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store/ConfigureStore";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import productReducer from "./reducers/ProductReducer";
import thunk from "redux-thunk";
import initialState from "./reducers/InitialState";
import "bootstrap/dist/css/bootstrap.min.css";
import { loadProducts } from "./actions/ProductActions";
import { getAllData } from "./actions/ProductActions";
import {
  BrowserRouter as Router,
  NavLink,
  Link,
  Redirect
} from "react-router-dom";

// const store = createStore(productReducer, initialState, applyMiddleware(thunk));
export const store = configureStore();
// store.dispatch(loadProducts());
// var state = store.getState();
// if (state != undefined) {
//   if (state.productReducer.length > 0) {
//     store.dispatch(getUserDetails());
//   }
//   console.log("in index .js", state.productReducer.length);
// }
store.dispatch(getAllData());

console.log("this is store state", store.getState());
ReactDOM.render(
  <Provider store={store}>

    <App />
  
  </Provider>,
  document.getElementById("root")
);

// //FOR ADMIN DASHBOARD
// import React from 'react';
// import ReactDOM from 'react-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';
//
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
//
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
