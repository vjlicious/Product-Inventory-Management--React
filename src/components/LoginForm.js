import React, { Component } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { Redirect } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
class FormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        password: ""
      },
      isLoggedIn: false,
      loggedInUser: null,
      email_error_text: "",
      email_error: false,
      Password_error_text: "",
      Password_error: false,
      Procced: false
    };
    // make sure the "this" variable keeps its scope
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkCredentials = this.checkCredentials.bind(this);
    this.handleChange = this.handleChange.bind(this);
    //this.setModified = this.setModified.bind(this);
  }
  handleChange(event, newValue) {
    event.persist(); // allow native event access (see: https://facebook.github.io/react/docs/events.html)
    // give react a function to set the state asynchronously.
    // here it's using the "name" value set on the TextField
    // to set state.person.[firstname|lastname].

    this.setState(
      state => (state.user[event.target.name] = event.target.value)
    );
  }
  checkCredentials() {
    const login_data = this.props.user;
    console.log("checking credentials of", login_data);

    for (var i = 0; i < login_data.length; i++) {
      console.log("in loop", login_data[i]);
      if (
        login_data[i].email == this.state.user.email &&
        login_data[i].password === this.state.user.password
      ) {
        console.log("suceessfully loggedin");
        this.setState(state => (state.isLoggedIn = true));
        const logu = login_data[i];
        this.setState(state => (state.loggedInUser = logu));

        this.setState(state => (state.Procced = true));
      } else {
        this.setState(state => (state.email_error = true));
        this.setState(state => (state.Password_error = true));
        console.log("failure");
        this.setState(
          state => (state.Password_error_text = "Email or Password Incorrect")
        );
      }
    }
    console.log("looping through login_data isdone");
    console.log("state data", this.state.user);
  }
  handleSubmit(event) {
    // Object.keys(login_data).forEach(function(key) {
    //   console.log("looping login data", login_data[key]);
    // });
    // login_data.forEach(function(obj) {
    //   console.log("looping through login_data", obj.id);
    // });
  }
  componentDidMount() {
    console.log(
      "in login page all data",
      this.props.allData.userReducer.isLoggedIn
    );
    console.log("in login page", this.props.user);
    this.props.get_users();
    console.log("recieved in login page store data as", this.props.user);

    // console.log("this is log in data", login_data);
  }

  render() {
    console.log("logged in user state", this.state.loggedInUser);

    if (
      this.state.isLoggedIn &&
      this.state.loggedInUser &&
      this.state.Procced
    ) {
      // const user = [
      //   this.state.loggedInUser.fistName,
      //   this.state.loggedInUser.lastName
      // ];
      const path = `/dashboard/${this.state.isLoggedIn}/${this.state.loggedInUser.id}`;
      return <Redirect to={path} />;
    }
    return (
      <div>
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
                  <form>
                    <TextField
                      id="outlined-basic"
                      label="Email Address"
                      variant="outlined"
                      name="email"
                      error={this.state.email_error}
                      onChange={this.handleChange}
                      style={{ height: "100%", width: "100%" }}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Password"
                      variant="outlined"
                      name="password"
                      error={this.state.Password_error}
                      helperText={this.state.Password_error_text}
                      onChange={this.handleChange}
                      type="password"
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
                        onClick={this.checkCredentials}
                      >
                        Sign In
                      </Button>
                      <Link
                        to="/SignUp"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          endIcon={<ArrowUpwardIcon />}
                          style={{ marginLeft: "10px" }}
                        >
                          SIgn Up
                        </Button>
                      </Link>
                    </div>
                  </form>
                </div>
              </Card>
            </Col>
            <Col></Col>
          </Row>

          <Row>{}</Row>
          <Row>
            {console.log(
              "recieved store data in login form as",
              this.props.user
            )}
          </Row>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.userReducer.get_User,
    products: state.Products,
    allData: state
  };
};
const mapDispachToProps = patch => {
  return {
    get_users: () => {
      console.log("hi im in dispatch function in login patch calling get user");
      axios
        .get("http://localhost:4000/Users")
        .then(response => {
          patch({ type: "GET_USER", payload: response.data });
        })
        .catch();
    }
  };
};

export default connect(mapStateToProps, mapDispachToProps)(FormPage);
