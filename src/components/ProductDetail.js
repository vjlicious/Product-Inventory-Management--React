import React, { useState } from "react";
import * as ProductActions from "../actions/ProductActions";
import "antd/dist/antd.css";
import { Select } from "antd";
import { bindActionCreators } from "redux";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import Card from "./DashboardComponents/Card/Card";
import CardHeader from "./DashboardComponents/Card/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Alert, AlertTitle } from "@material-ui/lab";

import "antd/dist/antd.css";

const OPTIONS = [
  "Name",
  "Quantity",
  "Price",
  "id",
  "Description",
  "Manifacturer"
];
class productDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      selectedItems: []
    };
  }

  handleChange = selectedItems => {
    this.setState({ selectedItems });
  };
  getEditDetails = () => {
    const productDetails = this.props.product;
    console.log("in product details", this.props);
    if (productDetails) {
      for (var i = 0; i < productDetails.length; i++) {
        console.log("in loop", productDetails[i]);
        if (productDetails[i].id == this.props.match.params.id) {
          const logu = productDetails[i];
          console.log("logu", logu);
          this.setState({ product: logu });
          return;
        } else {
        }
      }
    }
  };

  componentDidMount() {
    const p = this.state.product;
    p.count = p.count + 1;
    this.props.actions
      .incrementCount(p)
      .then(() => console.log("count incremented"))
      .catch(error => {
        alert(error);
      });
  }

  componentWillMount() {
    this.getEditDetails();
  }
  showingDetails = () => {
    if (!(this.state.selectedItems.length > 0)) {
      return (
        <CardContent
          style={{
            justifyContent: "center",
            textAlign: "ceter"
          }}
        >
          <div>
            <Alert severity="info">
              <AlertTitle>
                <span>Product Name : </span>
              </AlertTitle>

              <strong>{this.state.product.Name}</strong>
            </Alert>
            <br></br>
            <Alert severity="info">
              <AlertTitle>
                <span>Product Price : </span>
              </AlertTitle>

              <strong>{this.state.product.Price}</strong>
            </Alert>
            <br></br>
            <Alert severity="info">
              <AlertTitle>
                <span>Product Quantity :</span>
              </AlertTitle>

              <strong>{this.state.product.Quantity}</strong>
            </Alert>
            <br></br>
            <Alert severity="info">
              <AlertTitle>
                <span>Product Description :</span>
              </AlertTitle>

              <strong>{this.state.product.Description}</strong>
            </Alert>
            <br></br>
            <Alert severity="info">
              <AlertTitle>
                {" "}
                <span>Product Manufacturer :</span>
              </AlertTitle>

              <strong>{this.state.product.Manufacturer}</strong>
            </Alert>
            <br></br>
          </div>
        </CardContent>
      );
    } else {
      return this.state.selectedItems.map(item => (
        <CardContent
          style={{
            justifyContent: "center",
            textAlign: "ceter"
          }}
        >
          <Alert severity="info">
            <AlertTitle>
              <span> {item}</span>
            </AlertTitle>
            <strong>{this.state.product[item]}</strong>
          </Alert>
        </CardContent>
      ));
    }
  };

  render() {
    const { selectedItems } = this.state;
    const filteredOptions = OPTIONS.filter(o => !selectedItems.includes(o));
    return (
      <Container>
        <Row
          style={{
            height: "200px"
          }}
        ></Row>

        <Row>
          <Col></Col>
          <Col>
            <Card
              style={{
                minheight: "500px",
                width: "500px",
                border: "none",
                backgroundColor: "#c5cae9"
              }}
            >
              <CardHeader>
                <Select
                  mode="multiple"
                  placeholder="Inserted are removed"
                  value={selectedItems}
                  onChange={this.handleChange}
                  style={{ width: "100%" }}
                >
                  {filteredOptions.map(item => (
                    <Select.Option key={item} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </CardHeader>

              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              {this.showingDetails()}
            </Card>
          </Col>
          <Col></Col>
        </Row>
        <Col></Col>
        <Row></Row>
      </Container>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    product: state.userReducer.all_Data.productDetails
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ProductActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(productDetails);
