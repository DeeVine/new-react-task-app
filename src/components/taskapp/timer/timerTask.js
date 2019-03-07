import React from 'react'
import moment from 'moment'
import TagMenu from './tagMenu'
import TimerTaskDropdown from './timerTaskDropdown'
import { Badge } from 'reactstrap';
import util from '../util'

class TimerTask extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      taskName: this.props.taskName,
      isHidden: true,
      totalTime: this.totalTime()
    }
  }

  componentDidMount = () => {
    const savedState = util.retrieveTasksFromLocalStorage('timer-task-'+this.props.task.taskName)
    if (savedState) {
      const isHidden = savedState.isHidden ? true : false
      this.setState({
        isHidden,
        taskName: savedState.taskName,
        totalTime: this.totalTime()
      })
    }
  }

  componentDidUpdate = () => {
    util.updateLocalStorage('timer-task-'+this.props.task.taskName, this.state)
  }

  toggleList = () => {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  convertMillisecondsToDigitalClock = (ms) => {
    const hours = Math.floor(ms / 3600000), // 1 Hour = 36000 Milliseconds
    minutes = Math.floor((ms % 3600000) / 60000), // 1 Minutes = 60000 Milliseconds
    seconds = Math.floor(((ms % 360000) % 60000) / 1000) // 1 Second = 1000 Milliseconds
    return (
      (hours < 10 ? ('0'+hours) : hours) + ":" +
      (minutes < 10 ? ('0'+minutes) : minutes) + ":" +
      (seconds < 10 ? ('0'+seconds) : seconds)
    )
  }

  totalTime = () => {
    const hoursLog = this.props.task.hoursLog
    if (hoursLog.length > 0) {
      const generateMilisecondsArray = () => {
        return hoursLog.map((log) => {
          const milisecondsDifference = moment(log.stopTime).valueOf() - moment(log.startTime).valueOf()
          return milisecondsDifference
        })
      }
      const reducer = (accumulator, currentValue) => accumulator + currentValue
      const totalMiliseconds = generateMilisecondsArray().reduce(reducer)
      const convertedToDigitalClock = this.convertMillisecondsToDigitalClock(totalMiliseconds)
      return convertedToDigitalClock
    } else {
      return '00:00:00'
    }
  }

  render() {
    return (
      <div>
        <div className='timer-task' id={'timer-' + this.props.task.taskName}>
            <div>
              <Badge
                color='info'
                onClick={this.toggleList}
              >{this.props.task.hoursLog.length}</Badge>
              <span>{this.props.task.taskName} {this.state.totalTime ? this.state.totalTime : ''}</span>

            </div>
            {!this.state.isHidden ?
              <ul>
                {this.props.task.hoursLog.map((log, index) => {
                  const startTime = moment(log.startTime)
                  const stopTime = moment(log.stopTime)
                  const milisecondsTimeDifference = this.convertMillisecondsToDigitalClock(moment(log.stopTime).valueOf() - moment(log.startTime).valueOf())
                  return (
                    <li key={this.props.task.taskName+'-'+index} className = 'timer-task-hourslog'>
                      <TagMenu
                        taskName={this.props.task.taskName}
                        index={index}
                        createNewHoursLogTag = {this.props.createNewHoursLogTag}
                        //pass in function to add tags to hoursLog item
                      />
                      {startTime.format('lll')} - {stopTime.format('lll')}
                      {milisecondsTimeDifference}
                      <TimerTaskDropdown
                        taskName={this.props.task.taskName}
                        startTime={log.startTime}
                        deleteHoursLog = {this.props.deleteHoursLog}
                      />
                    </li>
                  )
              })}
              </ul>
              : ''
            }
         </div>
      </div>
    )
  }
}

export default TimerTask
