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
           <div className='parent-timer-list-container' key={'timer-list-'+task.taskName}>
            <TimerTask
              key={task.taskName+'-'+task.hoursLog.length}
              task={task}
              deleteHoursLog = {this.props.deleteHoursLog}
              createNewHoursLogTag = {this.props.createNewHoursLogTag}
              createParentHoursLogTag = {this.props.createParentHoursLogTag}
            />
           </div>
          )
        })}
      </div>
    )
  }
}

export default TimerList
