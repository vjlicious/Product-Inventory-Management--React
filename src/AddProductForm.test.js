import React from "react";
import { shallow, mount } from "enzyme";
import configureStore from "./store/ConfigureStore";
import { Provider } from "react-redux";

import ProductList from "./components/ProductsList";
import { Table } from "react-bootstrap";
import AddProductForm from "./components/AddProductForm";
import * as actions from "./actions/ProductActions";
import * as actionsTypes from "./actions/ActionTypes";
// const findByTestAtrr = (component, attr) => {
//     const wrapper = component.find(`[data-test='${attr}']`);
//     return wrapper;
// };
// export const testStore = (initialState) => {
//     const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
//     return createStoreWithMiddleware(rootReducer, initialState);
// };

describe("Test ProductList using full shallow rendering", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ProductList />);
  });

  it("Add productlist contains a table", () => {
    expect(wrapper.find("table").length).toEqual(1);
  });
});
describe("Test ProductList using full shallow rendering", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ProductList />);
  });

  it(" productlist's table should contain 4 headings", () => {
    expect(wrapper.find("th").length).toEqual(4);
  });
});
describe("Test ProductList using full shallow rendering", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ProductList />);
  });

  it(" productlist's table ist heading should be Product ID", () => {
    expect(
      wrapper
        .find("tr")
        .childAt(0)
        .render()
        .text()
    ).toEqual("Product ID");
  });
});
describe("Test ProductList using full shallow rendering", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ProductList />);
  });

  it(" productlist's table 2nd heading should be Product Name", () => {
    expect(
      wrapper
        .find("tr")
        .childAt(1)
        .render()
        .text()
    ).toEqual("Product Name");
  });
});
describe("Test ProductList using full shallow rendering", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ProductList />);
  });

  it(" productlist's table 3rd heading should be Quantity", () => {
    expect(
      wrapper
        .find("tr")
        .childAt(2)
        .render()
        .text()
    ).toEqual("Quantity");
  });
});
describe("Test ProductList using full shallow rendering", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ProductList />);
  });

  it(" productlist's table 4th heading should be Quantity", () => {
    expect(
      wrapper
        .find("tr")
        .childAt(3)
        .render()
        .text()
    ).toEqual("Price");
  });
});
describe("check if adpproduct action is despatches correctly", () => {
  let Product;
  let expectedAction;

  beforeEach(() => {
    Product = {
      Name: "Product_1",
      Price: "40000",
      Quantity: "1",
      Description: "Best flagship ",
      Manufacturer: "xyz",
      id: 1,
      count: 600
    };
    expectedAction = {
      type: "ADD_PRODUCTS_SUCCESS",
      product: {
        Name: "Product_1",
        Price: "40000",
        Quantity: "1",
        Description: "Best flagship ",
        Manufacturer: "xyz",
        id: 1,
        count: 600
      }
    };
  });

  it("add product", () => {
    expect(actions.addProductSuccess(Product)).toEqual(expectedAction);
  });
});

describe("check if loadproduct action is despatches correctly", () => {
  let Product;
  let expectedAction;

  beforeEach(() => {
    Product = {
      Name: "Product_1",
      Price: "40000",
      Quantity: "1",
      Description: "Best flagship ",
      Manufacturer: "xyz",
      id: 1,
      count: 600
    };
    expectedAction = {
      type: "LOAD_PRODUCTS_SUCCESS",
      products: {
        Name: "Product_1",
        Price: "40000",
        Quantity: "1",
        Description: "Best flagship ",
        Manufacturer: "xyz",
        id: 1,
        count: 600
      }
    };
  });

  it("add product", () => {
    expect(actions.loadProductsSuccess(Product)).toEqual(expectedAction);
  });
});
describe("check if delete product action is despatches correctly", () => {
  let Product;
  let expectedAction;

  beforeEach(() => {
    Product = {
      Name: "Product_1",
      Price: "40000",
      Quantity: "1",
      Description: "Best flagship ",
      Manufacturer: "xyz",
      id: 1,
      count: 600
    };
    expectedAction = {
      type: 'LOAD_PRODUCTS_SUCCESS', products: 1
    };
  });

  it("delete product", () => {
    console.log(actions.loadProductsSuccess(Product.id));
    expect(actions.loadProductsSuccess(Product.id)).toEqual(expectedAction);
  });
});
