import React, { Component } from "react";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";

export default class DTP extends Component {
  state = {
    startTime: "",
    stopTime: ""
  };

  componentDidMount = () => {
    // this.setState({
    //   date: this.props.date
    // })
    console.log('this.props.startTime', this.props.startTime)
  }

  onChange = date => {
    console.log('date', date)
    this.setState({ date: moment(date).format() });
  };

  render() {
    return (
      <div>
        <DateTimePicker
          isCalendarOpen={false}
          calendarIcon={null}
          clearIcon={null}
          disableClock={true}
          onChange={this.onChange}
          value={this.props.startTime._d}
        />
        <DateTimePicker
          isCalendarOpen={false}
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
