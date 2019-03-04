import React from 'react'
import moment from 'moment'
import TimerTaskDropdown from './timerTaskDropdown'
import { Badge } from 'reactstrap';
const uuidv4 = require('uuid/v4');

class TimerTask extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isHidden: false
    }
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

  render() {
    return (
      <div>
        <div className='timer-task' id={'timer-' + this.props.task.taskName}>
            <div onClick={this.toggleList}><Badge color='info'>{this.props.task.hoursLog.length}</Badge> {this.props.task.taskName} </div>
            {!this.state.isHidden ?
              <ul>
                {this.props.task.hoursLog.map((log, i) => {
                  const startTime = moment(log.startTime)
                  // console.log('startTime inside', JSON.stringify(startTime))
                  const stopTime = moment(log.stopTime)
                  const milisecondsTimeDifference = this.convertMillisecondsToDigitalClock(moment(log.stopTime).valueOf() - moment(log.startTime).valueOf())
                  return (
                    <li key={uuidv4()} className = 'timer-task-hourslog'>
                      <i className="fas fa-tag"></i>
                      {startTime.format('lll')} - {stopTime.format('lll')}
                      {milisecondsTimeDifference}
                      <TimerTaskDropdown />
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
