import axios from "axios";
import uuid from "uuidv4";

export default class ProductApi {
  static getAllProducts() {
    return axios
      .get("http://localhost:4000/productDetails")
      .then(res => res.data);
  }

  static saveProduct(product) {
    if (product.Name.length < 1) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject("Product name must be at least 1 character.");
        }, 1000);
      });
    }

    // product.id = uuid();
    return axios
      .post("http://localhost:4000/productDetails", product)
      .then(res => res.data);
  }

  static deleteProduct(id) {
    return axios.delete(`http://localhost:4000/productDetails/${id}`);
  }
}

