import React from "react";
import moment from "moment";
import TimerList from "./timerList";
import TimerNav from "./timerNav";
import util from "../util.js";
import "./timer.css";
import { Container, Row, Col, Button } from "reactstrap";

//LeftOff --> figuring out way to utilize callback/promise to createTaskTimeObject after stopTime setsState

//TODO:
// reset input and time state after stopTime function is complete
//start time, end time
//timer for clock utilizing moment add 'moment().add(1, 'second')'
//calculate difference from start time and current time in seconds
//rerender clock

//save timer state to local localStorage
//measure time with set interval or calculate difference in start and end times
//simulate timer
//make input field span majority of width
//add tag icon with dropwdown
//convert buttons to play and stop icons
// [ ] timer vs manual mode
//  [ ] calculate hours in manual mode from start and end time

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workingOnInput: "",
      optionalTagArray: [],
      timeStarted: "",
      startTime: "",
      stopTime: "",
      currentTimer: moment().startOf("day"),
      timer: ""
    };
  }

  componentDidMount = () => {
    const savedState = util.retrieveTasksFromLocalStorage("timer-data");
    if (savedState) {
      const timeStarted = savedState.timeStarted
        ? savedState.timeStarted
        : false;
      const {
        workingOnInput,
        optionalTagArray,
        startTime,
        stopTime,
        currentTimer
      } = savedState;
      this.setState(
        {
          timeStarted: timeStarted,
          workingOnInput,
          optionalTagArray,
          startTime,
          stopTime,
          //should set currentTimer to moment().startOf("day")Timer, 'second')
          currentTimer: currentTimer
            ? this.calculateCurrentTimer(moment(startTime))
            : moment().startOf("day")
        },
        () => {
          //callback set interval if timer has been started
          if (this.state.timeStarted) {
            this.interval = window.setInterval(() => {
              this.setTimer();
            }, 1000);
          }
        }
      );
    }
  };

  componentDidUpdate = () => {
    util.updateLocalStorage("timer-data", this.state);
  };

  calculateCurrentTimer = startTime => {
    const differenceInMiliseconds = moment().valueOf() - startTime.valueOf();
    const timeInSeconds = differenceInMiliseconds / 1000;
    const currentTimer = moment()
      .startOf("day")
      .add(timeInSeconds, "second");
    return currentTimer;
  };

  createOptionalTags = (taskName, tagValue) => {
    this.setState(currentState => {
      const optionalTagArray = currentState.optionalTagArray;
      if (!optionalTagArray.includes(tagValue)) {
        optionalTagArray.push(tagValue);
        return {
          optionalTagArray
        };
      }
    });
  };

  deleteOptionalTagArray = (taskNameNotRequired, tagValue) => {
    this.setState(currentState => {
      const optionalTagArray = currentState.optionalTagArray;
      const filteredArray = optionalTagArray.filter(tag => {
        return tag !== tagValue;
      });
      return {
        optionalTagArray: filteredArray
      };
    });
  };

  updateInput = e => {
    const text = e.target.value;
    this.setState({
      workingOnInput: text
    });
  };

  toggleTimer = () => {
    this.setState(prevState => ({
      timeStarted: !prevState.timeStarted
    }));
  };

  setTimer = () => {
    this.setState(prevState => ({
      currentTimer: prevState.currentTimer.add(1, "second")
    }));
  };

  startTime = () => {
    if (!this.state.workingOnInput) {
      alert("please enter task you are currently working on");
    } else {
      this.toggleTimer();
      this.setState({
        startTime: moment()
      });
      this.interval = window.setInterval(() => {
        this.setTimer();
      }, 1000);
    }
  };

  stopTime = () => {
    this.toggleTimer();
    this.setState(
      {
        stopTime: moment()
      },
      () => {
        this.props.addHoursLog(this.createTaskTimeObject())();
        this.setState(
          {
            //this set state is to ensure new props.taskList is retrieved after addHoursLog has completed
          },
          () => {
            window.clearInterval(this.interval);
            if (this.state.optionalTagArray.length > 0) {
              this.pushTagsFromOptionalTagsArray();
            }
            this.setState({
              workingOnInput: "",
              optionalTagArray: []
            });
          }
        );
      }
    );
  };

  pushTagsFromOptionalTagsArray = () => {
    const taskName = this.state.workingOnInput.trim();
    const currentTask = this.props.taskList.find(task => {
      return task.taskName === taskName;
    });
    const lastIndex = currentTask.hoursLog.length - 1;
    this.state.optionalTagArray.map(tagValue => {
      return this.props.createChildHoursLogTag(taskName, tagValue, lastIndex);
    });
  };

  createTaskTimeObject = () => {
    const taskTimeObject = {
      taskName: this.state.workingOnInput.trim(),
      startTime: this.state.startTime,
      stopTime: this.state.stopTime
    };
    this.setState({
      taskName: "",
      startTime: "",
      stopTime: "",
      currentTimer: moment().startOf("day")
    });
    return taskTimeObject;
  };

  render() {
    return (
      <Container key="timer1" className="timer-grid" fluid={true}>
        <Row>
          <Col sm={12} className="timer-nav_container">
            <TimerNav
              workingOnInput={this.state.workingOnInput}
              optionalTagArray={this.state.optionalTagArray}
              currentTimer={this.state.currentTimer}
              timeStarted={this.state.timeStarted}
              createNewTag={this.createOptionalTags}
              updateInput={this.updateInput}
              deleteHoursLogTag={this.deleteOptionalTagArray}
              startTime={this.startTime}
              stopTime={this.stopTime}
            />
          </Col>
          <Col sm={12} className="timer-time">
            <TimerList
              taskList={this.props.taskList}
              deleteHoursLog={this.props.deleteHoursLog}
              createChildHoursLogTag={this.props.createChildHoursLogTag}
              deleteHoursLogTag={this.props.deleteHoursLogTag}
              createParentHoursLogTag={this.props.createParentHoursLogTag}
              deleteParentHoursLogTag={this.props.deleteParentHoursLogTag}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
