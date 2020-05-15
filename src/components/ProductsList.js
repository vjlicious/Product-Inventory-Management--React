import React, { Component } from "react";
import Product from "./Product";
import "../index.css";

class ProductsList extends Component {
  render() {
    console.log("im in pruductlist page", this.props.details);
    const mylists = () => {
      if (this.props.details != null)
        return this.props.details.map(data => (
          <Product
            id={data.id}
            name={data.Name}
            quantity={data.Quantity}
            price={data.Price}
          ></Product>
        ));
      else return <p></p>;
    };
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{mylists()}</tbody>
        </table>
      </div>
    );
  }
}

export default ProductsList;
