import React from 'react'
import { ProgressBar } from 'react-bootstrap'

const SidePanel = (props) => {
  const task = props.task
  return (
    <div className={'task-item ' + props.className} onClick={props.sidePanelFocus} data-sidepanelid={task.taskName}>
      <div className='task-item-content'>
        <div className='task-item-title' >
          {task.taskName}
        </div>
        <div className='task-item-summary'>
          Content Summary Goes Here
        </div>
        <ProgressBar>
          <ProgressBar className='task-item-percent-complete' bsStyle="info" now={parseInt(task.percentComplete)} />
        </ProgressBar>
        <div>{task.hours} hours</div>
        <div className='task-item-updated-date'>
          {task.lastUpdated}
        </div>
      </div>
    </div>


  )
}

export default SidePanel
