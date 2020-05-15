import React, { Component } from "react";
import { Router, NavLink, Link, Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { lazy, Suspense } from "react";
// import {bindActionCreators} from 'redux';
//import * as ProductActions from 'actions/ProductActions.js';
import AllProductsPage from "./components/AllProductsPage.js";

//import AddProductForm from "./components/AddProductForm";
import ProductDetail from "./components/ProductDetail";
// import LoginForm from "./components/LoginForm";
// import SignUpForm from "./components/SignUpForm";
import "./index.css";
import AdminDashboard from "./components/AdminDashboard";
// import UpdateProduct from "./components/UpdateProduct";
import ChartComponent from "./components/ChartComponent";
import AboutUs from "./components/AboutUs";
import { history } from "./utils/history.js";
const AddProductForm = lazy(() => import("./components/AddProductForm"));
const LoginForm = lazy(() => import("./components/LoginForm"));
const SignUpForm = lazy(() => import("./components/SignUpForm"));
const UpdateProduct = lazy(() => import("./components/UpdateProduct"));
class App extends Component {
  render() {
    const path = `/dashboardf/${false}/${null}`;
    return (
      <Suspense fallback={<h1>Loading</h1>}>
        <Router history={history}>
          <div>
            <Route
              path="/"
              exact={true}
              render={() => {
                return (
                  <h2>
                    About: This application provides information about the
                    products
                  </h2>
                );
              }}
            />
            <Route
              path="/products"
              exact={true}
              render={() => {
                return <AllProductsPage></AllProductsPage>;
              }}
            />
            <Route
              path="/addProduct/:isLoggedIn/:loggedInUser"
              exact={true}
              render={() => {
                return <AddProductForm />;
              }}
            />
            <Route path="/products/:id" component={ProductDetail} />
            <Route path="/login" component={LoginForm} />
            <Route path="/signup" component={SignUpForm} />
            <Route
              path="/dashboard/:isLoggedIn/:loggedInUser"
              component={AdminDashboard}
            />
            <Route path="/dashboardf" component={AdminDashboard}></Route>
            <Route path="/update/:id" component={UpdateProduct}></Route>
            <Route path="/Chart" component={ChartComponent}></Route>
            <Route path="/About" component={AboutUs}></Route>
            <Route
              path="/About/:isLoggedIn/:loggedInUser"
              component={AboutUs}
            ></Route>

            {/* <Route path="/dashboard" component={AdminDashboard} /> */}
          </div>
        </Router>
      </Suspense>
    );
  }
}

export default App;
