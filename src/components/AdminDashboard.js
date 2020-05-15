import React, { Component, useEffect, useState } from "react";
import * as ProductActions from "../actions/ProductActions";

import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { Select } from "antd";
import Grid from "@material-ui/core/Grid";
import { bindActionCreators } from "redux";
import clsx from "clsx";
import { withStyles, makeStyles } from '@material-ui/core/styles';
// import {
//   cyan600,
//   pink600,
//   purple600,
//   orange600
// } from "material-ui/styles/colors";
// import ShoppingCart from "material-ui/svg-icons/action/shopping-cart";
import Avatar from "@material-ui/core/Avatar";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { green, pink } from "@material-ui/core/colors";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import UpdateIcon from "@material-ui/icons/Update";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Card from "./DashboardComponents/Card/Card";
import CardHeader from "./DashboardComponents/Card/CardHeader";
import CardIcon from "./DashboardComponents/Card/CardIcon";
import CardBody from "./DashboardComponents/Card/CardBody";
import CardFooter from "./DashboardComponents/Card/CardFooter";
import Icon from "@material-ui/core/Icon";
import Warning from "@material-ui/icons/Warning";
import styles from "../assets/jss/material-dashboard-react/views/dashboardStyle";
import PhonelinkIcon from "@material-ui/icons/Phonelink";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Divider from "@material-ui/core/Divider";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import { render } from "@testing-library/react";
import "antd/dist/antd.css";
import axios from "axios";
import { Card as Carda, Avatar as Avatara } from "antd";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { getUserDetails } from "../actions/ProductActions";
import Drawer from "@material-ui/core/Drawer";

import List from "@material-ui/core/List";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { textAlign } from "@material-ui/system";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import UpdateProduct from "./UpdateProduct";
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { history } from "../utils/history";
import Tooltip from "@material-ui/core/Tooltip";

const { confirm } = Modal;
const useStyles1 = makeStyles(styles);
const { Meta } = Carda;
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  card: {
    maxWidth: 300,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  media: {
    paddingTop: "56.25%"
  },
  content: {
    textAlign: "left",
    padding: theme.spacing.unit * 3
  },
  divider: {
    margin: `${theme.spacing.unit * 3}px 0`
  },
  heading: {
    fontWeight: "bold"
  },
  subheading: {
    lineHeight: 1.8
  },
  avatar: {
    display: "inline-block",
    border: "2px solid white",
    "&:not(:first-of-type)": {
      marginLeft: theme.spacing.unit
    }
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  ops: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      marginTop: theme.spacing(5)
    }
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500]
  },
  green: {
    color: "#fff",
    backgroundColor: green[500]
  }
}));
const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11
  }
}))(Tooltip);

const useStylesBootstrap = makeStyles(theme => ({
  arrow: {
    color: theme.palette.common.black
  },
  tooltip: {
    backgroundColor: theme.palette.common.black
  }
}));
function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9"
  }
}))(Tooltip);

const Dashboard = props => {
  const OPTIONS = ["Quantity", "Description", "Manufacturer"];

  const [state, setState] = useState({
    left: false,
    loggedInUserDetails: null,
    showChart: false,
    selectedItems: []
  });

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const showAlert = () => {
    if (props.match.params.isLoggedIn) {
      notification.open({
        message: "SUCCESSFULLY LOGGED IN",
        description: `Welcome  to Our Product Inventory App Please do Explore`,
        icon: <SmileOutlined style={{ color: "#1b5e20" }} />
      });
    }
  };

  const getUserDetailsById = () => {
    const userID = props.match.params.loggedInUser;
    const userData = props.allData.Users;
    console.log("in getuserdetails by id the user is", userID);
    console.log("in get user details by id store state", userData);
    if (userData) {
      for (var i = 0; i < userData.length; i++) {
        console.log("in loop", userData[i]);
        if (userData[i].id == userID) {
          const logu = userData[i];
          state["loggedInUserDetails"] = logu;
          console.log(
            "in get user by id the state is set to ",
            state["loggedInUserDetails"]
          );
          return (
            <Card
              className={classes.card}
              style={{
                height: "300px",
                width: "300px",
                textAlign: "center",
                backgroundColor: "#6200EE",
                color: "white"
              }}
            >
              <Typography
                className={"MuiTypography--heading"}
                variant={"h6"}
                gutterBottom
                style={{
                  color: "white",
                  justifyContent: "center",
                  marginTop: "10px"
                }}
              >
                My Profile
                <AccountCircleIcon
                  style={{
                    color: "white",

                    marginLeft: "3px"
                  }}
                />
              </Typography>
              <Typography
                className={"MuiTypography--heading"}
                variant={"h6"}
                gutterBottom
                style={{ color: "white" }}
              >
                --------------------------------
              </Typography>

              <Divider style={{ color: "white" }} />
              <Typography
                className={"MuiTypography--subheading"}
                variant={"caption"}
                style={{ textAlign: "left", marginTop: "5px", color: "white" }}
              >
                <div style={{ marginLeft: "10px" }}>
                  <p></p>
                  <p></p>
                  <p>
                    {"    "}
                    {state["loggedInUserDetails"].firstName}
                    {"   "}
                    {state["loggedInUserDetails"].lastName}
                  </p>{" "}
                  <p>Email: {state["loggedInUserDetails"].email}</p>
                  {"   "}
                  <p>location: {state["loggedInUserDetails"].location}</p>
                  {"   "}
                  <p>phone:{state["loggedInUserDetails"].phoneNumber}</p>
                </div>
              </Typography>
            </Card>
          );
        } else {
        }
      }
    }
  };

  const checkIfLoggedIn = () => {
    if (
      props.match.params.isLoggedIn == "false" ||
      props.match.params.isLoggedIn == undefined
    ) {
      return (
        <div>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleIcon />}
            style={{
              width: "200px",
              height: "50px",
              backgroundColor: "#26a69a",
              color: "white"
            }}
            onClick={() => {
              // alert("Please login before performing any operation");

              if (
                window.confirm(
                  "Please login before performing any operation"
                ) == true
              ) {
                window.location = "http://localhost:3000/login";
              } else {
                const path = `http://localhost:3000/dashboardf`;
                window.location = "http://localhost:3000/dashboardf";
              }
            }}
          >
            ADD PRODUCT
          </Button>
          <Divider />
          <ListItem>
            <div
              style={{
                width: "200px",
                height: "10px",

                color: "white"
              }}
            ></div>
          </ListItem>
          <Link to="/chart">
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddCircleIcon />}
              style={{
                width: "200px",
                height: "50px",
                backgroundColor: "#26a69a",
                color: "white"
              }}
            >
              VIEW CHART
            </Button>
          </Link>
        </div>
      );
    } else {
      const path = `/addProduct/${props.match.params.isLoggedIn}/${props.match.params.loggedInUser}`;
      return (
        <div>
          <Link to={path}>
            {" "}
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddCircleIcon />}
              style={{
                width: "200px",
                height: "50px",
                marginRight: "20px",
                backgroundColor: "#26a69a",
                color: "white"
              }}
            >
              ADD PRODUCT
            </Button>
          </Link>
          <Divider />
          <ListItem>
            <div
              style={{
                width: "200px",
                height: "10px",

                color: "white"
              }}
            ></div>
          </ListItem>
          <Link to="/chart">
            {" "}
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddCircleIcon />}
              style={{
                width: "200px",
                height: "50px",

                backgroundColor: "#26a69a",
                color: "white"
              }}
            >
              VIEW CHART
            </Button>
          </Link>
        </div>
      );
    }
  };

  const onchange = e => {
    setState({ search: e.target.value });
    console.log("set state: ", state.search);
  };

  const handleChange = selectedItems => {
    setState({ selectedItems });
  };

  const filteredOptions = OPTIONS.filter(o => {
    if (state.selectedItems != undefined) {
      return !state.selectedItems.includes(o);
    } else {
      return OPTIONS;
    }
  });

  const filteredProducts =
    props.products &&
    props.products.filter(singleProduct => {
      if (state.search != undefined) {
        console.log(state.search);
        return (
          singleProduct.Name.toLowerCase().indexOf(
            state.search.toLowerCase()
          ) !== -1
        );
      } else {
        return props.products;
      }
    });
  const renderProduct = product => {
    return (
      <Grid xs={2.4} item>
        <Paper
          className={classes.paper}
          style={{
            height: "320px",
            width: "300px",
            backgroundColor: "#e3f2fd",
            marginTop: "0px"
          }}
        >
          <Card
            className={classes.card}
            style={{
              height: "300px",
              width: "300px"
            }}
          >
            <CardContent className={classes.content}>
              <Typography
                className={"MuiTypography--heading"}
                variant={"h6"}
                gutterBottom
              >
                {product.Name}
              </Typography>
              <Typography
                className={"MuiTypography--subheading"}
                variant={"caption"}
              >
                {state.selectedItems == undefined
                  ? "Description: " + product.Description
                  : ""}
                {state.selectedItems && state.selectedItems.length == 0
                  ? "Description: " + product.Description
                  : ""}
                {state.selectedItems &&
                state.selectedItems.includes("Description")
                  ? "Description: "
                  : ""}
                {state.selectedItems &&
                state.selectedItems.includes("Description")
                  ? product.Description
                  : ""}
              </Typography>
              <br />
              <Typography
                className={"MuiTypography--heading"}
                variant={"caption"}
                gutterBottom
                style={{ marginTop: "20px" }}
              >
                {state.selectedItems == undefined
                  ? "Quantity: " + product.Quantity
                  : ""}
                {state.selectedItems && state.selectedItems.length == 0
                  ? "Quantity: " + product.Quantity
                  : ""}
                {state.selectedItems && state.selectedItems.includes("Quantity")
                  ? "Quantity: "
                  : ""}
                {state.selectedItems && state.selectedItems.includes("Quantity")
                  ? product.Quantity
                  : ""}
              </Typography>
              <br />
              <Typography
                className={"MuiTypography--heading"}
                variant={"caption"}
                gutterBottom
                style={{ marginTop: "20px" }}
              >
                {state.selectedItems == undefined
                  ? "Manufacturer: " + product.Manufacturer
                  : ""}
                {state.selectedItems && state.selectedItems.length == 0
                  ? "Manufacturer: " + product.Manufacturer
                  : ""}
                {state.selectedItems &&
                state.selectedItems.includes("Manufacturer")
                  ? "Manufacturer: "
                  : ""}
                {state.selectedItems &&
                state.selectedItems.includes("Manufacturer")
                  ? product.Manufacturer
                  : ""}
              </Typography>
              <Typography
                className={"MuiTypography--heading"}
                variant={"h6"}
                gutterBottom
                style={{ marginTop: "20px" }}
              >
                ₹ {product.Price}
              </Typography>
              <Divider className={classes.divider} light />
              <CardActions style={{ position: "absolute", bottom: "0px" }}>
                {/* <Link to={`/products/${product.id}`}> */}
                <LightTooltip title="View More Details">
                  <VisibilityIcon
                    onClick={() => {
                      if (
                        props.match.params.isLoggedIn == "false" ||
                        props.match.params.isLoggedIn == undefined
                      ) {
                        if (
                          window.confirm(
                            "Please login before performing any operation"
                          ) == true
                        ) {
                          window.location = "http://localhost:3000/login";
                        } else {
                          window.location = "http://localhost:3000/dashboardf";
                        }
                      } else {
                        history.push(`/products/${product.id}`);
                        // <Redirect to={`/products/${product.id}`} />
                        // window.location = `/products/${product.id}`;
                      }
                    }}
                  ></VisibilityIcon>
                </LightTooltip>
                {/* </Link> */}
                <LightTooltip title="Delete the product">
                  <DeleteForeverIcon
                    onClick={() => {
                      if (
                        props.match.params.isLoggedIn == "false" ||
                        props.match.params.isLoggedIn == undefined
                      ) {
                        if (
                          window.confirm(
                            "Please login before performing any operation"
                          ) == true
                        ) {
                          window.location = "http://localhost:3000/login";
                        } else {
                          window.location = "http://localhost:3000/dashboardf";
                        }
                      } else {
                        confirm({
                          title: "Are you sure delete this Product?",
                          icon: <ExclamationCircleOutlined />,
                          content: "Some descriptions",
                          okText: "Yes",
                          okType: "danger",
                          cancelText: "No",
                          onOk() {
                            props.actions
                              .deleteProduct(product.id)
                              .then(() => console.log("Product Added"))
                              .catch(error => {
                                alert(error);
                              });
                          },
                          onCancel() {
                            console.log("Cancel");
                          }
                        });
                      }
                    }}
                  />
                </LightTooltip>
                <LightTooltip title="edit the product">
                  <UpdateIcon
                    onClick={() => {
                      if (
                        props.match.params.isLoggedIn == "false" ||
                        props.match.params.isLoggedIn == undefined
                      ) {
                        if (
                          window.confirm(
                            "Please login before performing any operation"
                          ) == true
                        ) {
                          window.location = "http://localhost:3000/login";
                        } else {
                          window.location = "http://localhost:3000/dashboardf";
                        }
                      } else {
                        history.push(`/update/${product.id}`);
                        // <Redirect to={`/products/${product.id}`} />
                        // window.location = `/products/${product.id}`;
                      }
                    }}
                  />
                </LightTooltip>
              </CardActions>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
    );
  };

  const list = anchor => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom"
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List style={{ width: "250px" }}>
        <ListItem>
          {console.log(
            "in admin dashboard the logged in user is",
            props.match.params.loggedInUser
          )}
          {getUserDetailsById()}
        </ListItem>
        <Divider />
        <ListItem>
          <h3>Operations</h3>
        </ListItem>
        <Divider />
        <ListItem>{checkIfLoggedIn()}</ListItem>
        <Divider />
      </List>
    </div>
  );

  const classes = useStyles();
  const classes1 = useStyles1();
  const bull = <span className={classes.bullet}>•</span>;
  useEffect(() => {
    console.log(props);
    showAlert();
  }, []);

  return (
    <div className={classes.root}>
      {console.log("state.search:- ", state.search)}
      {console.log("this is dashboard got store state as-", props.allData)}

      <Grid container spacing={3}>
        <Grid item xs={12} style={{ height: "100px" }}>
          <div className={classes.root}>
            <AppBar position="static" style={{ backgroundColor: "#1565c0" }}>
              <Toolbar>
                <Drawer
                  anchor="left"
                  open={state["left"]}
                  onClose={toggleDrawer("left", false)}
                >
                  {list("left")}
                </Drawer>

                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer("left", true)}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  className={classes.title}
                  style={{ color: "#FFFFFF" }}
                >
                  Dashboard
                </Typography>
                <Typography
                  variant="h6"
                  className={classes.title}
                  style={{ color: "#FFFFFF" }}
                >
                  <Link to="./About" style={{ textDecoration: "none" }}>
                    <p style={{ marginTop: "15px", color: "#FFFFFF" }}>
                      {" "}
                      About
                    </p>
                  </Link>
                </Typography>
                {props.match.params.isLoggedIn ? (
                  <Button color="inherit">
                    <Link to="/dashboardf" style={{ textDecoration: "none" }}>
                      <div style={{ color: "white" }}>LOG OUT</div>
                    </Link>
                  </Button>
                ) : (
                  <Button color="inherit">
                    <Link to="/login" style={{ textDecoration: "none" }}>
                      <div style={{ color: "white" }}>login</div>
                    </Link>
                  </Button>
                )}
              </Toolbar>
            </AppBar>
          </div>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Paper
          style={{
            height: "100px",
            width: "100%",
            backgroundColor: "#e3f2fd",
            marginTop: "0px"
          }}
        >
          <div>
            <br />
            <Input
              id="input-with-icon-adornment"
              placeholder="Search Product"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              onChange={onchange}
            />
          </div>
          <div>
            <Select
              mode="multiple"
              placeholder="Select the relevant fields"
              value={state.selectedItems}
              onChange={handleChange}
              style={{ width: "40%", float: "right" }}
            >
              {filteredOptions.map(item => (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={8}>
          <Grid key={1} xs={2.4} item>
            <Paper className={classes.paper}>
              <Card>
                <CardHeader color="warning" stats icon>
                  <CardIcon color="warning">
                    <Icon>
                      <PhonelinkIcon />
                    </Icon>
                  </CardIcon>
                  <p className={classes1.cardCategory}>
                    Total number of products
                  </p>
                  <h3 className={classes1.cardTitle}>
                    {props.products && props.products.length}
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div>
                    <h6 className={classes1.cardTitle}>
                      Total number of products in our Inventory
                    </h6>
                  </div>
                </CardFooter>
              </Card>
            </Paper>
          </Grid>
          <Grid key={2} xs={2.4} item>
            <Paper className={classes.paper}>
              <Card>
                <CardHeader color="warning" stats icon>
                  <CardIcon color="primary">
                    <Icon>
                      <SupervisorAccountIcon />
                    </Icon>
                  </CardIcon>
                  <p className={classes1.cardCategory}>Total number of Users</p>
                  <h3 className={classes1.cardTitle}>
                    {props.allData.Users && props.allData.Users.length}
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div>
                    <h6 className={classes1.cardTitle}>
                      Total number of users registered to our Inventory
                    </h6>
                  </div>
                </CardFooter>
              </Card>
            </Paper>
          </Grid>
          <Grid key={3} xs={2.4} item>
            <Paper className={classes.paper}>
              {" "}
              <Card>
                <CardHeader color="warning" stats icon>
                  <CardIcon color="info">
                    <Icon>
                      <PhonelinkIcon />
                    </Icon>
                  </CardIcon>
                  <p className={classes1.cardCategory}>
                    Newly added product ID
                  </p>
                  <h3 className={classes1.cardTitle}>
                    {props.products &&
                      props.products[props.products.length - 1].id}
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div>
                    <h6 className={classes1.cardTitle}>
                      Total number of users registered to our Inventory
                    </h6>
                  </div>
                </CardFooter>
              </Card>
            </Paper>
          </Grid>
          <Grid key={4} xs={2.4} item>
            <Paper className={classes.paper}>
              <Card>
                <CardHeader color="warning" stats icon>
                  <CardIcon color="rose">
                    <Icon>
                      <SupervisorAccountIcon />
                    </Icon>
                  </CardIcon>
                  <p className={classes1.cardCategory}>
                    Newly added product name
                  </p>
                  <h3 className={classes1.cardTitle}>
                    {props.products &&
                      props.products[props.products.length - 1].Name}
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div>
                    <h6 className={classes1.cardTitle}>
                      Recently added product to our Inventory
                    </h6>
                  </div>
                </CardFooter>
              </Card>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={8}>
          {props.products &&
            filteredProducts.map(product => {
              return renderProduct(product);
            })}
        </Grid>
      </Grid>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    allData: state.userReducer.all_Data,
    products: state.userReducer.all_Data.productDetails,
    Data: state
  };
};

const mapDispachToProps = patch => {
  return {
    get_users: () => {
      console.log("hi im in dispatch function in login patch calling get user");
      patch(getUserDetails);
      // axios
      //   .get("http://localhost:4000/Users")
      //   .then(response => {
      //     patch({ type: "GET_USER", payload: response.data });
      //   })
      //   .catch();
    },
    actions: bindActionCreators(ProductActions, patch)
  };
};

export default connect(mapStateToProps, mapDispachToProps)(Dashboard);
