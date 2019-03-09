import React from 'react'
import TimerTask from './timerTask'

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
           <div key={'timer-list-'+task.taskName}>
            <TimerTask
              key={task.taskName+'-'+task.hoursLog.length}
              task={task}
              deleteHoursLog = {this.props.deleteHoursLog}
              createNewHoursLogTag = {this.props.createNewHoursLogTag}
            />
           </div>
          )
        })}
      </div>
    )
  }
}

export default TimerList
