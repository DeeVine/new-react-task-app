import React from 'react'
import TagMenu from './tagMenu'
import TimerTaskDropdown from './timerTaskDropdown'
import moment from 'moment'

const timerListComponent = (props) => {
  const { log, index }  = props
  const startTime = moment(log.startTime)
  const stopTime = moment(log.stopTime)
  const milisecondsTimeDifference = props.convertMillisecondsToDigitalClock(moment(log.stopTime).valueOf() - moment(log.startTime).valueOf())
  return (
    <li key={props.task.taskName+'-'+index} className = 'timer-task-hourslog'>
      <TagMenu
        taskName={props.task.taskName}
        hoursLog={props.task.hoursLog[index]}
        index={index}
        createNewHoursLogTag = {props.createNewHoursLogTag}
        //pass in function to add tags to hoursLog item
      />
      {startTime.format('lll')} - {stopTime.format('lll')}
      {milisecondsTimeDifference}
      <TimerTaskDropdown
        taskName={props.task.taskName}
        startTime={log.startTime}
        deleteHoursLog = {props.deleteHoursLog}
      />
    </li>
  )
}

export default timerListComponent
