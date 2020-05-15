import React, { Component } from "react";
import Product from "./Product";
import "../index.css";
import Card from "./DashboardComponents/Card/Card";
import CardHeader from "./DashboardComponents/Card/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
class AboutUs extends Component {
  render() {
 
    return (
        <div>
       <h1>Product Inventory Management System</h1>
       <p>Developed using React-Redux</p>
        <Card>
        <CardContent>
            <Typography>
            Abhishek Jindal
            Project Engineer,
            Wipro Ltd
            Employee ID:20098908
            </Typography>
            <Typography>
            Vijaykumar chandrashekar
            Project Engineer,
            Wipro Ltd
            Employee ID:20093760
            </Typography>
        </CardContent>

        </Card>

       </div>
    )
}
}

export default AboutUs;