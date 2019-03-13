import React from 'react'
import TimerListComponent from './timerListComponent'
import { Badge } from 'reactstrap';
import moment from 'moment'
import util from '../util'
import TagMenu from './tagMenu'

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
      this.setState({
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
      const convertToDigitalClock = this.convertMillisecondsToDigitalClock(totalMiliseconds)
      return convertToDigitalClock
    } else {
      return '00:00:00'
    }
  }

  render() {
    return (
      <div>
        <div className='timer-task' id={'timer-' + this.props.task.taskName}>
            <div className='timer-task-container'>
              <Badge className='timer-task-badge mr-2' color='info' onClick={this.toggleList}>
                {this.props.task.hoursLog.length}
              </Badge>
              <div className='timer-task-taskname mr-2'>{this.props.task.taskName}</div>
              <div className='timer-task-totaltime mr-2'>{this.state.totalTime ? this.state.totalTime : ''}</div>
              <TagMenu
                taskName={this.props.task.taskName}
                tags={this.props.task.tags}
                startTime = {this.props.task.lastUpdated}
                createNewTag = {this.props.createParentHoursLogTag}
              />
            </div>
            {!this.state.isHidden ?
              <ul>
                {this.props.task.hoursLog.map((log, index) => {
                  return (
                    <TimerListComponent
                      key={this.props.task.taskName+'-'+log.startTime}
                      log={log}
                      index={index}
                      convertMillisecondsToDigitalClock = {this.convertMillisecondsToDigitalClock}
                      task={this.props.task}
                      createNewHoursLogTag={this.props.createNewHoursLogTag}
                      deleteHoursLog = {this.props.deleteHoursLog}
                    />
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
