import React from 'react'
import TagMenu from './tagMenu'
import TimerTaskDropdown from './timerTaskDropdown'
import moment from 'moment'

const timerListComponent = (props) => {
  const { log, index, task }  = props
  const startTime = moment(log.startTime)
  const stopTime = moment(log.stopTime)
  const milisecondsTimeDifference = props.convertMillisecondsToDigitalClock(moment(log.stopTime).valueOf() - moment(log.startTime).valueOf())
  return (
    <li key={task.taskName+'-'+log.startTime} className = 'timer-task-hourslog'>
      <TagMenu
        taskName={task.taskName}
        log={log}
        index={index}
        createNewHoursLogTag = {props.createNewHoursLogTag}
      />
      {startTime.format('lll')} - {stopTime.format('lll')}
      {milisecondsTimeDifference}
      <TimerTaskDropdown
        taskName={task.taskName}
        startTime={log.startTime}
        deleteHoursLog = {props.deleteHoursLog}
      />
    </li>
  )
}

export default timerListComponent
