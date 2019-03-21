import React, { Component } from "react";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";

export default class DTP extends Component {
  state = {
    startTime: moment()._d,
    stopTime: ""
  };

  // componentDidMount = () => {
  //   this.setState({
  //     date: this.props.date
  //   })
  // }

  onChange = date => {
    this.setState({ date }, () => {
      console.log("this.state", this.state);
      console.log("this.state.date", this.state.date);
      console.log("moment()", moment());
    });
  };

  render() {
    return (
      <div>
        <DateTimePicker
          calendarIcon={null}
          clearIcon={null}
          disableClock={true}
          onChange={this.onChange}
          value={this.props.startTime._d}
        />
        <DateTimePicker
          calendarIcon={null}
          clearIcon={null}
          disableClock={true}
          onChange={this.onChange}
          value={this.props.stopTime._d}
        />
      </div>
    );
  }
}
