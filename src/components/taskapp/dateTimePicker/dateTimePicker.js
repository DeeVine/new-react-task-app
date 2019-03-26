import React, { Component } from "react";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import { Button } from "reactstrap";

export default class DTP extends Component {
  state = {
    startTime: "",
    stopTime: ""
  };

  componentDidMount = () => {
    this.setState({
      startTime: this.props.startTime._i,
      stopTime: this.props.stopTime._i
    });
  };

  modifyHoursLog = () => {
    const time = {
      startTime: this.state.startTime,
      stopTime: this.state.stopTime
    };
    this.props.modifyHoursLog(this.props.taskName, time, this.props.index);
  };

  changeStartTime = date => {
    this.setState({ startTime: moment(date).format() });
  };
  changeStopTime = date => {
    this.setState({ stopTime: moment(date).format() });
  };

  render() {
    return (
      <div className="dtp-picker">
        <DateTimePicker
          isCalendarOpen={false}
          calendarIcon={null}
          clearIcon={null}
          disableClock={true}
          onChange={this.changeStartTime}
          value={this.props.startTime._d}
        />
        <DateTimePicker
          isCalendarOpen={false}
          calendarIcon={null}
          clearIcon={null}
          disableClock={true}
          onChange={this.changeStopTime}
          value={this.props.stopTime._d}
        />
        <Button onClick={this.modifyHoursLog}>update time</Button>
      </div>
    );
  }
}
