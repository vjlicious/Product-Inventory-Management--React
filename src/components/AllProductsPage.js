import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import ProductsList from "./ProductsList.js";
import * as ProductActions from "../actions/ProductActions";
import "../index.css";
import { store } from "../index";
import { loadProducts } from "../actions/ProductActions";
import AddProduct from "../components/AddProductForm";
class AllProductsPage extends Component {
  componentDidMount() {}
  render() {
    return (
      <div>
        {console.log(
          "recieving store data in allproducts as",
          this.props.products
        )}
        <h1>Products List</h1>
        <ProductsList details={this.props.products} />
        <br />
        <Link to="/addProduct">Add Product</Link>
        {/* <AddProduct /> */}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    products: state.productReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ProductActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProductsPage);
