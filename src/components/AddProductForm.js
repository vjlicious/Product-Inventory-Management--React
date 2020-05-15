import React from "react";
import * as ProductActions from "../actions/ProductActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Container, Row, Col, Card } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import Icon from "@material-ui/core/Icon";
import { Button, IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";

class AddProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.onAddClick = this.onAddClick.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.state = {
      product: {
        Name: "",
        Price: "",
        Quantity: "",
        Description: "",
        Manufacturer: "",
        count: 0
      },
      Product_error_text: "",
      Price_error: false,
      Price_error_text: "",
      Quantity_error: false,
      Quantity_error_text: "",
      Description_error: false,
      Description_error_text: "",
      Manufacturer_error: false,
      Manufacturer_error_text: ""
    };
  }
  handleChange(event, newValue) {
    event.persist(); // allow native event access (see: https://facebook.github.io/react/docs/events.html)
    // give react a function to set the state asynchronously.
    // here it's using the "name" value set on the TextField
    // to set state.person.[firstname|lastname].

    if (event.target.name == "Price") {
      const num = parseInt(event.target.value);
      if (num <= 0) {
        this.setState({
          Price_error_text: "Enter a valid Price greater than 0"
        });
        this.setState({
          Price_error: true
        });
      } else {
        this.setState({
          Price_error_text: ""
        });
        this.setState({
          Price_error: false
        });
      }
    }
    if (event.target.name == "Quantity") {
      const num = parseInt(event.target.value);
      if (num <= 0) {
        this.setState({
          Quantity_error_text: "Enter a valid Quantity greater than 0"
        });
        this.setState({
          Quantity_error: true
        });
      } else {
        this.setState({
          Quantity_error_text: ""
        });
        this.setState({
          Quantity_error: false
        });
      }
    }
    if (event.target.name == "Description") {
      if (event.target.value.length > 10) {
        this.setState({
          Description_error_text: "Only less than 10 characters allowed"
        });
        this.setState({
          Description_error: true
        });
      } else {
        this.setState({
          Description_error_text: ""
        });
        this.setState({
          Description_error: false
        });
      }
    }
    if (event.target.name == "Manufacturer") {
      if (event.target.value.length > 10) {
        this.setState({
          Manufacturer_error_text: "Only less than 10 characters allowed"
        });
        this.setState({
          Manufacturer_error: true
        });
      } else {
        this.setState({
          Manufacturer_error_text: ""
        });
        this.setState({
          Manufacturer_error: false
        });
      }
    }
    this.setState(
      state => (state.product[event.target.name] = event.target.value)
    );
  }

  onAddClick() {
    const p = this.state.product;
    this.props.actions
      .addProduct(p)
      .then(() => console.log("Product Added"))
      .catch(error => {
        alert(error);
      });
  }
  componentDidMount() {
    console.log("params", this.props);
  }
  render(props) {
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    const page_type = urlParams.get("page_type");

    console.log("yo", window.location.pathname.slice(12, 16));
    console.log("", window.location.pathname.slice(17));
    return (
      <Container fluid>
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
                height: "500px",
                width: "500px",
                border: "none"
              }}
            >
              <div>
                <form
                  onSubmit={() => {
                    if (
                      this.state.Price_error ||
                      this.state.Quantity_error ||
                      this.state.Description_error ||
                      this.state.Manufacturer_error
                    ) {
                      window.alert("Please check the fields again");
                    } else {
                      this.onAddClick();
                      alert("product added successfully");
                    }
                  }}
                >
                  <Link
                    to={`/dashboard/${window.location.pathname.slice(
                      12,
                      16
                    )}/${window.location.pathname.slice(17)}`}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    {" "}
                    <IconButton
                      color="primary"
                      aria-label="GO BACK"
                      component="span"
                    >
                      <ArrowBackIcon />
                    </IconButton>
                  </Link>

                  <h1>Enter Product Details</h1>
                  <TextField
                    id="standard-required"
                    label="Product Name"
                    name="Name"
                    required="true"
                    type="text"
                    variant="outlined"
                    onChange={this.handleChange}
                    style={{ height: "100%", width: "100%" }}
                  />

                  <TextField
                    id="standard-required"
                    label="Product Price"
                    variant="outlined"
                    type="number"
                    name="Price"
                    required="true"
                    error={this.state.Price_error}
                    helperText={this.state.Price_error_text}
                    onChange={this.handleChange}
                    style={{
                      height: "100%",
                      width: "100%",
                      marginTop: "10px",
                      textSecurity: "circle" /* IE/Safari */
                    }}
                  ></TextField>
                  <TextField
                    id="standard-required"
                    label="Product's Quantity"
                    variant="outlined"
                    type="number"
                    name="Quantity"
                    error={this.state.Quantity_error}
                    helperText={this.state.Quantity_error_text}
                    required="true"
                    onChange={this.handleChange}
                    style={{
                      height: "100%",
                      width: "100%",
                      marginTop: "10px",
                      textSecurity: "circle" /* IE/Safari */
                    }}
                  ></TextField>
                  <TextField
                    id="standard-required"
                    label="Product's Description"
                    variant="outlined"
                    type="text"
                    name="Description"
                    onChange={this.handleChange}
                    error={this.state.Description_error}
                    helperText={this.state.Description_error_text}
                    required="true"
                    style={{
                      height: "100%",
                      width: "100%",
                      marginTop: "10px",
                      textSecurity: "circle" /* IE/Safari */
                    }}
                  ></TextField>
                  <TextField
                    id="outlined-basic"
                    label="Manufacturer"
                    variant="outlined"
                    type="text"
                    required="true"
                    error={this.state.Manufacturer_error}
                    helperText={this.state.Manufacturer_error_text}
                    name="Manufacturer"
                    onChange={this.handleChange}
                    style={{
                      height: "100%",
                      width: "100%",
                      marginTop: "10px",
                      textSecurity: "circle" /* IE/Safari */
                    }}
                  ></TextField>

                  <div style={{ textAlign: "center", marginTop: "10px" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      endIcon={<ArrowForwardIosIcon />}
                      style={{ marginLeft: "10px" }}
                    >
                      Add Product
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <h1>{this.props.products}</h1>
          <h1>{console.log("hi got the data from store", this.props.user)}</h1>
        </Row>
      </Container>
    );
  }
}
// const formik = () => {
//   <Formik
//   render={() => {return(<AddProductForm />)}}

//   validationSchema={validationSchema}
// />
// }

function mapStateToProps(state, ownProps) {
  return {
    products: state.products
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ProductActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddProductForm);
