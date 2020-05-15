import * as types from "./ActionTypes";
import ProductApi from "../data/ProductApi";
import axios from "axios";
export function loadProductsSuccess(products) {
  return { type: types.LOAD_PRODUCTS_SUCCESS, products };
}

export function addProductSuccess(product) {
  return { type: types.ADD_PRODUCTS_SUCCESS, product };
}

export function deleteProductSuccess(id) {
  return { type: types.DELETE_PRODUCTS_SUCCESS, id };
}

export function loadProducts() {
  return function(dispatch) {
    return ProductApi.getAllProducts()
      .then(products => {
        console.log(
          "hi im in load products and sending the data to reducser",
          products
        );
        dispatch(loadProductsSuccess(products));
      })
      .catch(error => {
        throw error;
      });
  };
}
export function getUserDetails() {
  return function(dispatch) {
    return axios
      .get("http://localhost:4000/Users")
      .then(response => {
        dispatch({ type: "GET_USER", payload: response.data });
      })
      .catch();
  };
}

export function incrementCount(product) {
  return function(dispatch) {
    return axios
    .request({
      method: "put",
      url: `http://localhost:4000/productDetails/${product.id}`,
      data: product
    })
    .then(response => {
      dispatch({
        type: "UPDATE_PRODUCT",
        payload: response.data,
        id:product.id
      });
    })
    .catch(err => console.log(err));
  };
}


export function deleteProduct(id) {
  return function(dispatch, getState) {
    return ProductApi.deleteProduct(id)
      .then(response => {
        dispatch(deleteProductSuccess(id));
      })
      .catch(error => {
        throw error;
      });
  };
}
export function getAllData() {
  return function(dispatch) {
    return axios
      .get("http://localhost:4000/db")
      .then(response => {
        dispatch({ type: "GET_ALL", payload: response.data });
      })
      .catch();
  };
}
export function updateProduct(product) {
  return function(dispatch) {
    return axios
      .request({
        method: "put",
        url: `http://localhost:4000/productDetails/${product.id}`,
        data: product
      })
      .then(response => {
        dispatch({
          type: "UPDATE_PRODUCT",
          payload: response.data,
          id: product.id
        });
      })
      .catch(err => console.log(err));
  };
}

export function addProduct(product) {
  return function(dispatch, getState) {
    return ProductApi.saveProduct(product)
      .then(product => {
        dispatch(addProductSuccess(product));
      })
      .catch(error => {
        throw error;
      });
  };
}
