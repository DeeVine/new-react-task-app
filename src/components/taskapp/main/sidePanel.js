import React from 'react'

const SidePanel = (props) => {
  return (
    <div>
      <span>{props.task.taskName}</span>
      <span>{props.task.percentComplete}</span>
      <button onClick={props.onHandleDeleteTask}>Delete</button>
    </div>
  )
}

export default SidePanel
