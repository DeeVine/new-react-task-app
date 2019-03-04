import React from 'react'
import TimerTask from './timerTask'
const uuidv4 = require('uuid/v4');

class TimerList extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div>
      {this.props.taskList.map((task) => {
        return (
         <div key={uuidv4()}>
          <TimerTask
            task={task}
            deleteHoursLog = {this.props.deleteHoursLog}
          />
         </div>
        )
      })}
      </div>
    )
  }
}

export default TimerList
