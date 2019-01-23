import React from 'react'
import { Button } from 'react-bootstrap'


const SidePanel = (props) => {
  const task = props.task
  return (
    <div className='task-item'>
      <div className='task-item-content'>
        <div className='task-item-title' onClick={props.sidePanelFocus} data-sidepanelid={task.taskName}>
          {task.taskName}
        </div>
        <Button className='task-item-delete-button' onClick={props.onHandleDeleteTask}>Delete</Button>
        <div className='task-item-summary'>
          Content Summary Goes Here{task.percentComplete}% Complete
        </div>
        <div className='task-item-updated-date'>
          {task.lastUpdated}
        </div>
      </div>
    </div>


  )
}

export default SidePanel
