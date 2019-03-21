import React from "react";
import moment from "moment";
import TagMenu from "./tagMenu";
import "./timer.css";
import { Button } from "reactstrap";

const TimerNav = props => {
  return (
    <>
      <input
        className="timer-nav-input mr-3"
        id="working-on-input"
        onChange={props.updateInput}
        value={props.workingOnInput}
        placeholder={"What are you working on?"}
      />
      <div className="timer-nav-optional-tag mr-3">
        <TagMenu //values in this TagMenu are being utilized in pushTagsFromOptionalTagsArray
          taskName="tbd"
          tags={props.optionalTagArray}
          startTime={moment(1552537388945)}
          createNewTag={props.createNewTag}
          deleteHoursLogTag={props.deleteHoursLogTag}
        />
      </div>
      <div className="timer-nav-current-timer mr-3">
        {props.currentTimer.format("HH:mm:ss")}
      </div>
      {!props.timeStarted ? (
        <Button
          className="start-timer-btn"
          size="sm"
          onClick={props.startTime}
          color="success"
        >
          Start
        </Button>
      ) : (
        <Button
          className="stop-timer-btn"
          size="sm"
          onClick={props.stopTime}
          color="danger"
        >
          Stop
        </Button>
      )}
    </>
  );
};

export default TimerNav;
