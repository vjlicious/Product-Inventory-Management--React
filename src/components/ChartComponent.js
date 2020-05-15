import React, { Component } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import * as ProductActions from "../actions/ProductActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: [],
        datasets: [
          {
            label: "View Frequency",
            data: [],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)"
            ]
          }
        ]
      }
    };
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "right",
    location: "City"
  };
  sort_by_key = (array, key) => {
    return array.sort(function(a, b) {
      var x = a[key];
      var y = b[key];
      return x > y ? -1 : x < y ? 1 : 0;
    });
  };
  componentDidMount() {
    console.log("Hi im in Chart", this.props.product);
    const p = this.props.product;
    const sortedList = this.sort_by_key(p, "count");
    console.log("sorted List", sortedList);
    if (sortedList.length > 0 && sortedList.length < 5) {
      var nameList = new Array(sortedList.length);
      var dataList = new Array(sortedList.length);
      for (var i = 0; i < sortedList.length; i++) {
        nameList[i] = sortedList[i].Name;
        dataList[i] = sortedList[i].count;
      }
    } else {
      var topFive = [
        sortedList[0],
        sortedList[1],
        sortedList[2],
        sortedList[3],
        sortedList[4]
      ];
      var nameList = [
        topFive[0].Name,
        topFive[1].Name,
        topFive[2].Name,
        topFive[3].Name,
        topFive[4].Name
      ];
      var dataList = [
        topFive[0].count,
        topFive[1].count,
        topFive[2].count,
        topFive[3].count,
        topFive[4].count
      ];
    }
    console.log("name list and data list", nameList, dataList);

    this.setState(state => (state.chartData.labels = nameList));
    console.log("the new state is", this.state);

    this.setState(state => (state.chartData.datasets[0].data = dataList));
    console.log("the new state is", this.state);
  }

  render() {
    return (
      <div className="chart">
        <Pie
          data={this.state.chartData}
          options={{
            title: {
              display: this.props.displayTitle,
              text: "Top 5 Most Viewed Product ",
              fontSize: 25
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition
            }
          }}
        />
      </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Chart);
