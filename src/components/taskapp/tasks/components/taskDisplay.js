import React from 'react'
const uuidv4 = require('uuid/v4');

const TaskDisplay = (props) => {
  return(
    <div className='task_display'>
      <h4>Display</h4>
      <span>
        {
          props.tags ? props.tags.map((tag) => {
            return  <button key={uuidv4()}>{tag}</button>
          }): 'no tags'
        }
      </span>
      <span>{props.focusedTask.text}</span>
    </div>
  )
}

export default TaskDisplay
