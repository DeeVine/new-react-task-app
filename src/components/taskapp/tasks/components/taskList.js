import React from 'react'

const TaskList = (props) => {
  if(props.tasks) {
    return (
      <div className='tasks_list'>
        <h4>Tasks</h4>
        <ul>
          {props.tasks.map((task) => {
            return (
              <li
                className={(task.active === true ? 'task_active' : 'task_inactive')}
                key={task.id}
                id={task.id}>
                <input readOnly type="checkbox" checked={!task.active} onClick={() => props.onToggleTask(task.id)} />
                <input onChange={props.updateTaskInput} value={task.text} onFocus={props.handleFocusTask}/>
                <button onClick={() => props.handleDeleteSubTask(task.text)}>Delete</button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  } else {
    return <div>No TaskList</div>
  }
}

export default TaskList
