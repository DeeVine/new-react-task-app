import React from "react";
import TimerTask from "./timerTask";
import moment from "moment";

class TimerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  totalTimeMilliseconds = task => {
    const hoursLog = task.hoursLog;
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
      return totalMiliseconds;
    }
  };

  sortedTaskList = () => {
    const taskList = this.props.taskList;
    const sortedTaskList = taskList.sort((a, b) => {
      return b.hoursLog.length - a.hoursLog.length;
    });
    return sortedTaskList;
  };

  render() {
    return (
      <>
        {this.sortedTaskList().map(task => {
          return (
            <div
              className="parent-timer-list-container"
              key={"timer-list-" + task.taskName}
            >
              <TimerTask
                key={task.taskName + "-" + this.totalTimeMilliseconds(task)}
                task={task}
                deleteHoursLog={this.props.deleteHoursLog}
                createChildHoursLogTag={this.props.createChildHoursLogTag}
                deleteHoursLogTag={this.props.deleteHoursLogTag}
                createParentHoursLogTag={this.props.createParentHoursLogTag}
                deleteParentHoursLogTag={this.props.deleteParentHoursLogTag}
                modifyHoursLog={this.props.modifyHoursLog}
              />
            </div>
          );
        })}
      </>
    );
  }
}

export default TimerList;
