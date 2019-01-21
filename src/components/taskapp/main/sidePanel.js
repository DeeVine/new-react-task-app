import React from 'react'

const SidePanel = (props) => {
  return (
    <div>
      <span onClick={props.sidePanelFocus} data-sidepanelid={props.task.taskName}>{props.task.taskName} {props.task.percentComplete}% Complete</span>
      <button onClick={props.onHandleDeleteTask}>Delete</button>
    </div>
  )
}

export default SidePanel
