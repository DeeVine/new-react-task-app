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
    <li key={task.taskName+'-'+log.startTime} className = 'timer-list-component'>
      <div className='time-section'>
        <div className='start-end-times'>
          <TagMenu
            taskName={task.taskName}
            log={log}
            index={index}
            createNewHoursLogTag = {props.createNewHoursLogTag}
          />
          {startTime.format('lll')} - {stopTime.format('lll')}
        </div>
        <div className='total-time-seconds ml-2'>
          {milisecondsTimeDifference}
        </div>
        <div className='timer-task-dropdown ml-2'>
          <TimerTaskDropdown
            taskName={task.taskName}
            startTime={log.startTime}
            deleteHoursLog = {props.deleteHoursLog}
          />
        </div>
      </div>
    </li>
  )
}

export default timerListComponent
