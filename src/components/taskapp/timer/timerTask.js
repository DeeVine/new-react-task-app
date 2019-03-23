import React from "react";
import TimerListComponent from "./timerListComponent";
import { Badge } from "reactstrap";
import moment from "moment";
import util from "../util";
import TagMenu from "./tagMenu";

class TimerTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: this.props.taskName,
      isHidden: true,
      totalTime: this.totalTime(),
      componentTime: ''
    };
  }

  componentDidMount = () => {
    const savedState = util.retrieveTasksFromLocalStorage(
      "timer-task-" + this.props.task.taskName
    );
    if (savedState) {
      this.setState({
        taskName: savedState.taskName,
        totalTime: this.totalTime(),
      });
    }
  };

  componentDidUpdate = () => {
    util.updateLocalStorage(
      "timer-task-" + this.props.task.taskName,
      this.state
    );
  };

  toggleList = () => {
    this.setState({
      isHidden: !this.state.isHidden
    });
  };

  convertMillisecondsToDigitalClock = ms => {
    const hours = Math.floor(ms / 3600000), // 1 Hour = 36000 Milliseconds
      minutes = Math.floor((ms % 3600000) / 60000), // 1 Minutes = 60000 Milliseconds
      seconds = Math.floor(((ms % 360000) % 60000) / 1000); // 1 Second = 1000 Milliseconds
    // days = Math.floor(ms / 86400000),

    const hoursFormat = () => {
      if (hours < 10) {
        return "000" + hours;
      } else if (hours < 100) {
        return "00" + hours;
      } else if (hours < 1000) {
        return "0" + hours;
      } else {
        return hours;
      }
    };

    return (
      hoursFormat() +
      ":" +
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };

  totalTime = () => {
    const hoursLog = this.props.task.hoursLog;
    if (hoursLog.length > 0) {
      const generateMilisecondsArray = () => {
        return hoursLog.map(log => {
          const milisecondsDifference =
            moment(log.stopTime).valueOf() - moment(log.startTime).valueOf();
          return milisecondsDifference;
        });
      };
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      const totalMiliseconds = generateMilisecondsArray().reduce(reducer);
      const convertToDigitalClock = this.convertMillisecondsToDigitalClock(
        totalMiliseconds
      );
      return convertToDigitalClock;
    } else {
      return "00:00:00";
    }
  };

  hoursLogSortedDescending = () => {
    const hoursLog = this.props.task.hoursLog;
    const sortedDescending = hoursLog.sort(function(a, b) {
      const startTime = moment(a.startTime).valueOf();
      const stopTime = moment(b.stopTime).valueOf();
      return stopTime - startTime;
    });
    const slicedSort = sortedDescending.slice(0, 10);
    return slicedSort;
    // return sortedDescending
  };

  retrieveComponentTime = (e) => {
    const timeStamp = moment(e.target.innerHTML).format('lll')
    console.log('timeStamp', timeStamp)
    console.log('this.componentTime', this.state.componentTime)
    if (this.state.componentTime === timeStamp) {
      console.log('time is equal')
    } else {
      console.log('time is not eqaul')
    }
    this.setState({
      componentTime: timeStamp
    })
  }

  render() {
    return (
      <div>
        <div className="timer-task" id={"timer-" + this.props.task.taskName}>
          <div className="timer-task-container">
            <Badge
              className="timer-task-badge mr-2"
              color="info"
              onClick={this.toggleList}
            >
              {this.props.task.hoursLog.length}
            </Badge>
            <div className="timer-task-taskname mr-2">
              {this.props.task.taskName}
            </div>
            <div className="timer-task-totaltime mr-2">
              {this.state.totalTime ? this.state.totalTime : ""}
            </div>
            <TagMenu
              taskName={this.props.task.taskName}
              tags={this.props.task.tags}
              startTime={moment(this.props.task.lastUpdated)}
              createNewTag={this.props.createParentHoursLogTag}
              deleteHoursLogTag={this.props.deleteParentHoursLogTag}
            />
          </div>
          {!this.state.isHidden ? (
            <ul className="timer-task-ul">
              {this.hoursLogSortedDescending().map((log, index) => {
                // console.log('log.startTime',log.startTime)
                // console.log('log.startTime.format', moment(log.startTime).format('lll'))
                return (
                  <TimerListComponent
                    key={log.startTime}
                    log={log}
                    index={index}
                    retrieveComponentTime={this.retrieveComponentTime}
                    timeEditable={
                      this.state.componentTime === moment(log.startTime).format('lll') ||
                      this.state.componentTime === moment(log.stopTime).format('lll')
                     ? true : false}
                    convertMillisecondsToDigitalClock={
                      this.convertMillisecondsToDigitalClock
                    }
                    task={this.props.task}
                    createChildHoursLogTag={this.props.createChildHoursLogTag}
                    deleteHoursLog={this.props.deleteHoursLog}
                    deleteHoursLogTag={this.props.deleteHoursLogTag}
                  />
                );
              })}
            </ul>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default TimerTask;
