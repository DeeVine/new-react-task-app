import React from 'react'

const SidePanel = (props) => {
  return (
    <div>
      <span>{props.task.taskName} {props.task.percentComplete}% Complete</span>
      <button onClick={props.onHandleDeleteTask}>Delete</button>
    </div>
  )
}

export default SidePanel
