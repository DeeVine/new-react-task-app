import React from 'react'
import moment from 'moment'

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
            <div onClick={this.toggleList}>{this.props.task.taskName}</div>
            {!this.state.isHidden ?
              <ul>
                {this.props.task.hoursLog.map((log) => {
                return (
                  <li>
                    {moment(log.startTime).format('lll')} - {moment(log.stopTime).format('lll')} {this.convertMillisecondsToDigitalClock(moment(log.stopTime).valueOf() - moment(log.startTime).valueOf())}
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
