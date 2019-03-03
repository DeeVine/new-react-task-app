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
         <div>
          <TimerTask task={task} />
         </div>
        )
      })}
      </div>
    )
  }
}

export default TimerList
