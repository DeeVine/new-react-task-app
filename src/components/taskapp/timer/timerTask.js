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

  render() {
    return (
      <div>
        <div id={'timer-' + this.props.task.taskName}>
            <div onClick={this.toggleList}>{this.props.task.taskName}</div>
            {!this.state.isHidden ?
              <ul>
                {this.props.task.hoursLog.map((log) => {
                return (
                  <li>
                    {moment(log.startTime).format('lll')} - {moment(log.stopTime).format('lll')}
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
