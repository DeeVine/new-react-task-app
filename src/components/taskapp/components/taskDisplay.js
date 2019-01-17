import React from 'react'

const TaskDisplay = (props) => {
  return(
    <div className='task_display'>
      <h4>Display</h4>
      <span>{props.focusedTask.text}</span>
    </div>
  )
}

export default TaskDisplay
