import React, { Component } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import Icon from "@material-ui/core/Icon";
import { Button, IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { BrowserRouter as Router, Link } from "react-router-dom";

import { connect } from "react-redux";
import axios from "axios";
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        location: "",
        phoneNumber: ""
      },
      email_error_text: "",
      email_error: false,
      password_error_text: "",
      password_error: false,
      repassword_error_text: "",
      repassword_error: false,
      firstname_error_text: "",
      firstname_error: false,
      lastname_error_text: "",
      lastname_error: false,
      phonenumber_error_text: "",
      phonenumber_error: false
    };
    // make sure the "this" variable keeps its scope
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    //this.setModified = this.setModified.bind(this);
  }
  handleChange(event, newValue) {
    event.persist(); // allow native event access (see: https://facebook.github.io/react/docs/events.html)
    // give react a function to set the state asynchronously.
    // here it's using the "name" value set on the TextField
    // to set state.person.[firstname|lastname].
    if (event.target.name == "email") {
      console.log(typeof event.target.value);

      if (
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)
      ) {
        this.setState({
          email_error: false
        });
        this.setState({
          email_error_text: ""
        });
      } else {
        this.setState({
          email_error_text: "Enter a valid Price email id "
        });
        this.setState({
          email_error: true
        });
      }
    }
    if (event.target.name == "password") {
      console.log(typeof event.target.value);
      var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
      if (event.target.value.match(passw)) {
        this.setState({
          password_error: false
        });
        this.setState({
          password_error_text: ""
        });
      } else {
        this.setState({
          password_error_text:
            "password must be between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character "
        });
        this.setState({
          password_error: true
        });
      }
    }
    if (event.target.name == "repassword") {
      console.log("repassword", event.target.value);

      if (event.target.value == this.state.user.password) {
        this.setState({
          repassword_error: false
        });
        this.setState({
          repassword_error_text: ""
        });
      } else {
        this.setState({
          repassword_error_text: "Password dont match "
        });
        this.setState({
          repassword_error: true
        });
      }
    }
    if (event.target.name == "firstName") {
      var letters = /^[A-Za-z]+$/;
      if (event.target.value.match(letters)) {
        this.setState({
          firstname_error: false
        });
        this.setState({
          firstname_error_text: ""
        });
      } else {
        this.setState({
          firstname_error_text: "firstName should contains only alphabet"
        });
        this.setState({
          firstname_error: true
        });
      }
    }
    if (event.target.name == "lastName") {
      var letters = /^[A-Za-z]+$/;
      if (event.target.value.match(letters)) {
        this.setState({
          firstname_error: false
        });
        this.setState({
          firstname_error_text: ""
        });
      } else {
        this.setState({
          firstname_error_text: "lastName should contains only alphabet"
        });
        this.setState({
          firstname_error: true
        });
      }
    }
    if (event.target.name == "phoneNumber") {
      var phoneno = /^\d{10}$/;
      if (event.target.value.match(phoneno)) {
        this.setState({
          phonenumber_error: false
        });
        this.setState({
          phonenumber_error_text: ""
        });
      } else {
        this.setState({
          phonenumber_error_text: "provide a valid phonenumber"
        });
        this.setState({
          phonenumber_error: true
        });
      }
    }

    // if (num <= 0) {
    //   this.setState({
    //     Price_error_text: "Enter a valid Price greater than 0"
    //   });
    //   this.setState({
    //     Price_error: true
    //   });
    // } else {
    //   this.setState({
    //     Price_error_text: ""
    //   });
    //   this.setState({
    //     Price_error: false
    //   });
    // }

    this.setState(
      state => (state.user[event.target.name] = event.target.value)
    );
  }

  handleSubmit(event) {
    const data = this.state.user;
    this.props.add_users(data);
  }
  setModified() {
    //  this.setState({ flag: true });
  }

  render() {
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
                      this.state.email_error ||
                      this.state.firstname_error ||
                      this.state.lastname_error ||
                      this.state.password_error ||
                      this.state.repassword_error ||
                      this.state.phonenumber_error
                    ) {
                      alert("please check the field again");
                    } else {
                      this.handleSubmit();
                      alert("you are successfully registered");
                    }
                  }}
                >
                  <Link
                    to="/login"
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

                  <h1>Please provide your Details</h1>
                  <TextField
                    id="standard-required"
                    label="Email Address"
                    name="email"
                    required="true"
                    type="email"
                    variant="outlined"
                    error={this.state.email_error}
                    helperText={this.state.email_error_text}
                    onChange={this.handleChange}
                    style={{ height: "100%", width: "100%" }}
                  />
                  <TextField
                    id="standard-required"
                    label="Password"
                    variant="outlined"
                    type="password"
                    error={this.state.password_error}
                    helperText={this.state.password_error_text}
                    name="password"
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
                    label=" Re-Enter Password"
                    variant="outlined"
                    error={this.state.repassword_error}
                    helperText={this.state.repassword_error_text}
                    type="password"
                    required="true"
                    name="repassword"
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
                    label="First Name"
                    variant="outlined"
                    type="text"
                    name="firstName"
                    error={this.state.firstname_error}
                    helperText={this.state.firstname_error_text}
                    onChange={this.handleChange}
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
                    label="Last Name"
                    variant="outlined"
                    type="text"
                    required="true"
                    error={this.state.lastname_error}
                    helperText={this.state.lastname_error_text}
                    name="lastName"
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
                    label="Location"
                    variant="outlined"
                    type="text"
                    required="true"
                    name="location"
                    onChange={this.handleChange}
                    style={{
                      height: "100%",
                      width: "100%",
                      marginTop: "10px",
                      textSecurity: "circle" /* IE/Safari */
                    }}
                  ></TextField>
                  <TextField
                    id="outlined-disabled"
                    label="Phone number"
                    variant="outlined"
                    type="tel"
                    required="true"
                    name="phoneNumber"
                    error={this.state.phonenumber_error}
                    helperText={this.state.phonenumber_error_text}
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
                      endIcon={<ArrowForwardIosIcon />}
                      style={{ marginLeft: "10px" }}
                      type="submit"
                    >
                      Sign Up
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
const mapStateToProps = state => {
  return {
    user: state.userReducer.User
  };
};

const mapDispachToProps = patch => {
  return {
    add_users: data => {
      console.log("hi im in dispatch function", data);
      axios
        .post("http://localhost:4000/Users", data)
        .then(response => {
          patch({ type: "ADD_USER", payload: response.data });
        })
        .catch();
    }
  };
};
export default connect(mapStateToProps, mapDispachToProps)(SignUp);
