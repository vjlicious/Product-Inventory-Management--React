import React from "react";
import * as ProductActions from "../actions/ProductActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { get } from "https";
import EditableLabel from "react-inline-editing";
import { Container, Row, Col, Alert } from "react-bootstrap";
import Card from "./DashboardComponents/Card/Card";
import CardHeader from "./DashboardComponents/Card/CardHeader";
import Button from "@material-ui/core/Button";
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { throwStatement } from "@babel/types";

class UpdateProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      Name: "",
      Quantity: "",
      Price: "",
      Description: "",
      Manufacturer: "",
      Quantity_error: false,
      Price_error: false,
      Description_error: false,
      Manufacturer_error: false,
      isEditing: false
    };
    this._handleFocusName = this._handleFocusName.bind(this);
    this._handleFocusOutName = this._handleFocusOutName.bind(this);
    this._handleFocusQuantity = this._handleFocusQuantity.bind(this);
    this._handleFocusOutQuantity = this._handleFocusOutQuantity.bind(this);

    this._handleFocusPrice = this._handleFocusPrice.bind(this);
    this._handleFocusOutPrice = this._handleFocusOutPrice.bind(this);
    this._handleFocusDescription = this._handleFocusDescription.bind(this);
    this._handleFocusOutDescription = this._handleFocusOutDescription.bind(
      this
    );
    this._handleFocusManufacturer = this._handleFocusManufacturer.bind(this);
    this._handleFocusOutManufacturer = this._handleFocusOutManufacturer.bind(
      this
    );
    this.onEditClick = this.onEditClick.bind(this);
    this.editProduct = this.editProduct.bind(this);

    // this.getEditDetails = this.getEditDetails.bind(this);
  }
  showAlert = () => {
    notification.open({
      message: "Product Successfully Added ",
      description: `Please go back to dashboard`,
      icon: <SmileOutlined style={{ color: "#1b5e20" }} />
    });
  };
  showConfirm = () => {
    const { info } = Modal;
    info({
      title: "Instructions Before Editing",
      icon: <ExclamationCircleOutlined />,
      content:
        "In order to edit the details you need to click on the detail label",
      // okText: "Yes",
      // okType: "danger",
      // cancelText: "No",
      onOk() {
        console.log("Cancel");
      }
      // onCancel() {
      //   console.log("Cancel");
      // }
    });
  };
  _handleFocusName(text) {
    this.setState({ isEdting: true });
    console.log("Focused with text Name: " + text);
  }

  _handleFocusOutName(text) {
    this.setState({ isEdting: true });
    console.log("Left editor with text Name: " + text);
    console.log("check", !(text === ""));
    if (!(text === "")) {
      this.setState({ Name: text });
    }
    console.log("text", typeof text);
    if (text == "") {
      console.log(EditableLabel.state);
    }

    console.log("state name is", this.state.Name);
  }
  _handleFocusQuantity(text) {
    console.log("Focused with text Quantity: " + text);
  }

  _handleFocusOutQuantity(text) {
    console.log("Left editor with text quantity: " + text);
    if (parseInt(text) <= 0) {
      this.setState({ Quantity_error: true });
    } else if (!(text === "")) {
      this.setState({ Quantity_error: false });
      this.setState({ Quantity: text });
    }
    // if (this.state.Quantity === "") {
    //   this.setState({ Quantity: this.state.product.Quantity });
    // }
  }
  _handleFocusPrice(text) {
    console.log("Focused with text price: " + text);
  }

  _handleFocusOutPrice(text) {
    console.log("Left editor with text Price: " + text);
    if (parseInt(text) <= 0) {
      this.setState({ Price_error: true });
    } else if (!(text === "")) {
      this.setState({ Price_error: false });
      this.setState({ Price: text });
    }
    // if (this.state.Price === "") {
    //   this.setState({ Price: this.state.product.Price });
    // }
  }
  _handleFocusDescription(text) {
    console.log("Focused with text desc: " + text);
  }

  _handleFocusOutDescription(text) {
    console.log("Left editor with text desc: " + text);
    if (text.length >= 10) {
      this.setState({ Description_error: true });
    } else if (!(text === "")) {
      this.setState({ Description_error: false });
      this.setState({ Description: text });
    }
    // if (this.state.Description === "") {
    //   this.setState({ Description: this.state.product.Description });
    // }
  }
  _handleFocusManufacturer(text) {
    console.log("Focused with text manu: " + text);
  }

  _handleFocusOutManufacturer(text) {
    console.log("Left editor with text Manu: " + text);
    if (text.length >= 10) {
      this.setState({ Manufacturer_error: true });
    } else if (!(text === "")) {
      this.setState({ Manufacturer_error: false });
      this.setState({ Manufacturer: text });
    }
    // if (this.state.Manufacturer === "") {
    //   this.setState({ Manufacturer: this.state.product.Manufacturer });
    // }
  }

  getEditDetails = () => {
    const productDetails = this.props.allData.productDetails;
    console.log("in update form", productDetails);
    if (productDetails) {
      for (var i = 0; i < productDetails.length; i++) {
        console.log("in loop", productDetails[i]);
        if (productDetails[i].id == this.props.match.params.id) {
          const logu = productDetails[i];
          console.log("logu", logu);
          this.setState({ product: logu });
        } else {
        }
      }
    }
  };
  componentDidMount() {
    this.showConfirm();
  }
  componentWillMount() {
    this.getEditDetails();
  }
  editProduct(product) {}

  onEditClick() {
    let editedProduct = {};
    if (this.state.Manufacturer == "") {
      editedProduct.Manufacturer = this.state.product.Manufacturer;
    } else {
      editedProduct.Manufacturer = this.state.Manufacturer;
    }
    if (this.state.Description == "") {
      editedProduct.Description = this.state.product.Description;
    } else {
      editedProduct.Description = this.state.Description;
    }
    if (this.state.Price == "") {
      editedProduct.Price = this.state.product.Price;
    } else {
      editedProduct.Price = this.state.Price;
    }
    if (this.state.Quantity == "") {
      editedProduct.Quantity = this.state.product.Quantity;
    } else {
      editedProduct.Quantity = this.state.Quantity;
    }
    if (this.state.Name == "") {
      editedProduct.Name = this.state.product.Name;
    } else {
      editedProduct.Name = this.state.Name;
    }

    editedProduct.id = this.props.match.params.id;

    console.log("edited product is ", editedProduct);
    if (
      this.state.Description_error ||
      this.state.Description_error ||
      this.state.Price_error ||
      this.state.Quantity_error
    ) {
      alert("please check the entered fields again");
    } else {
      this.props.actions.updateProduct(editedProduct);
      this.showAlert();
    }
  }
  handleInputChange(e) {
    // const target = e.target;
    // const value = target.value;
    // const name = target.name;
    // this.setState(
    //     state => (state.product[name] = value)
    // );
  }

  render() {
    console.log("hi im in Update Product", this.props.allData.productDetails);
    console.log("hi im in Update Product the state is ", this.state.product);

    return (
      <Container fluid>
        <Row></Row>
        <Row>
          <Col></Col>
          <Col>
            <Card
              style={{
                textAlign: "center",
                backgroundColor: "#c5cae9",
                color: "black"
              }}
            >
              <div>
                <CardHeader>
                  <h1
                    style={{
                      color: "black"
                    }}
                  >
                    Editing Product
                  </h1>
                </CardHeader>

                <span>Enter name: </span>
                <div style={{ color: "blue" }}>
                  <EditableLabel
                    text={this.state.product && this.state.product.Name}
                    labelClassName="myLabelClass"
                    inputClassName="myInputClass"
                    inputWidth="200px"
                    inputHeight="25px"
                    inputMaxLength="50"
                    labelFontWeight="bold"
                    inputFontWeight="bold"
                    onFocus={this._handleFocusName}
                    onFocusOut={this._handleFocusOutName}
                    style={{ color: "blue" }}
                  />
                </div>
                <br />
                <br />
                <span>Enter Quantity: </span>
                <div style={{ color: "blue" }}>
                  <EditableLabel
                    text={this.state.product && this.state.product.Quantity}
                    labelClassName="myLabelClass"
                    inputClassName="myInputClass"
                    inputWidth="200px"
                    inputHeight="25px"
                    inputMaxLength="50"
                    labelFontWeight="bold"
                    inputFontWeight="bold"
                    onFocus={this._handleFocusQuantity}
                    onFocusOut={this._handleFocusOutQuantity}
                    style={{ color: "blue" }}
                  />
                </div>
                {this.state.Quantity_error && (
                  <span style={{ color: "red" }}>
                    please enter Quantity greater than 0
                  </span>
                )}
                <br />
                <br />
                <span>Enter Price: </span>
                <div style={{ color: "blue" }}>
                  <EditableLabel
                    text={this.state.product && this.state.product.Price}
                    labelClassName="myLabelClass"
                    inputClassName="myInputClass"
                    inputWidth="200px"
                    inputHeight="25px"
                    inputMaxLength="50"
                    labelFontWeight="bold"
                    inputFontWeight="bold"
                    onFocus={this._handleFocusPrice}
                    onFocusOut={this._handleFocusOutPrice}
                  />
                </div>
                {this.state.Price_error && (
                  <span style={{ color: "red" }}>
                    please enter Price greater than 0
                  </span>
                )}
                <br />
                <br />
                <span>Description: </span>
                <div style={{ color: "blue" }}>
                  <EditableLabel
                    text={this.state.product && this.state.product.Description}
                    labelClassName="myLabelClass"
                    inputClassName="myInputClass"
                    inputWidth="200px"
                    inputHeight="25px"
                    inputMaxLength="50"
                    labelFontWeight="bold"
                    inputFontWeight="bold"
                    onFocus={this._handleFocusDescription}
                    onFocusOut={this._handleFocusOutDescription}
                    style={{ color: "blue" }}
                  />
                </div>
                {this.state.Description_error && (
                  <span style={{ color: "red" }}>
                    please enter Description less than 10 charactors
                  </span>
                )}
                <br />
                <br />
                <span>Manufacturer: </span>
                <div style={{ color: "blue" }}>
                  <EditableLabel
                    text={this.state.product && this.state.product.Manufacturer}
                    labelClassName="myLabelClass"
                    inputClassName="myInputClass"
                    inputWidth="200px"
                    inputHeight="25px"
                    inputMaxLength="50"
                    labelFontWeight="bold"
                    inputFontWeight="bold"
                    onFocus={this._handleFocusManufacturer}
                    onFocusOut={this._handleFocusOutManufacturer}
                  />
                </div>
                {this.state.Manufacturer_error && (
                  <span style={{ color: "red" }}>
                    please enter Manufacturer less than 10 charactors
                  </span>
                )}
                <br />
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    backgroundColor: "#26a69a",
                    color: "white"
                  }}
                  onClick={this.onEditClick}
                >
                  Update Product
                </Button>
              </div>
            </Card>
          </Col>
          <Col></Col>
        </Row>
        <Row></Row>
      </Container>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    allData: state.userReducer.all_Data
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ProductActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct);
