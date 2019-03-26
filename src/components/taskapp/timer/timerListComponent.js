import React from "react";
import TagMenu from "./tagMenu";
import TimerTaskDropdown from "./timerTaskDropdown";
import DTP from "../dateTimePicker/dateTimePicker";
import moment from "moment";

const timerListComponent = props => {
  const { log, index, task } = props;
  const startTime = moment(log.startTime);
  const stopTime = moment(log.stopTime);
  const milisecondsTimeDifference = props.convertMillisecondsToDigitalClock(
    stopTime.valueOf() - startTime.valueOf()
  );
  return (
    <li
      key={task.taskName + "-" + log.startTime}
      className="timer-list-container"
    >
      <div className="time-section">
        <div className="timer-list-tag-menu">
          <TagMenu
            taskName={task.taskName}
            tags={log.tags}
            startTime={startTime}
            index={index}
            createNewTag={props.createChildHoursLogTag}
            deleteHoursLogTag={props.deleteHoursLogTag}
          />
        </div>
        <div className="time-container">
          {props.timeEditable === true ? (
            <DTP
              startTime={startTime}
              stopTime={stopTime}
              taskName={task.taskName}
              index={index}
              modifyHoursLog={props.modifyHoursLog}
            />
          ) : (
            <div
              onClick={props.retrieveComponentTime}
              className="timer-list-start-end-time mr-2"
            >
              <div
                className="timer-list-start-time mr-1"
                data-value={startTime}
              >
                {startTime.format("lll")}
              </div>
              -
              <div className="timer-list-stop-time ml-1" data-value={stopTime}>
                {stopTime.format("lll")}
              </div>
            </div>
          )}
        </div>
        <div className="total-time-seconds ml-2">
          {milisecondsTimeDifference}
        </div>
        <div className="timer-task-dropdown ml-2">
          <TimerTaskDropdown
            taskName={task.taskName}
            startTime={log.startTime}
            deleteHoursLog={props.deleteHoursLog}
          />
        </div>
      </div>
    </li>
  );
};

export default timerListComponent;
