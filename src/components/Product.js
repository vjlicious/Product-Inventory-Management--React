import React, { Component } from "react";
import { Link, Prompt } from "react-router-dom";
import "../index.css";

class Product extends Component {
  constructor(props) {
    super(props);
    this.setModified = this.setModified.bind(this);
    this.state = {
      flag: true
    };
  }
  setModified() {
    this.setState({ flag: false });
    window.alert("Are you sure you want to view the details?");
  }
  render() {
    const path = `/products/${this.props.id}`;
    return (
      <tr>
        <td>
          <Link to={path} onClick={() => this.setModified()}>
            {this.props.id}
          </Link>
        </td>
        <td>{this.props.name}</td>
        <td>{this.props.quantity}</td>
        <td>Rs. {this.props.price}</td>
      </tr>
    );
  }
}

export default Product;
