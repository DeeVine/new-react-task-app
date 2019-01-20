import React from 'react'

const Navigation = (props) => {

  return (
    <nav className='navigation'>
      <h3>Navigation</h3>
      <form onSubmit={props.handleCreateSubTask}>
        <input onChange={props.updateSubTaskInput} id='task-text' value={props.subTaskInput} placeholder='add a task' />
        <input type='submit' value='Add Task'/>
      </form>
      <form onSubmit={props.handleCreateNewTag(props.taskInfo.taskName)}>
        <input onChange={props.updateTagInput} id='add-tag' value={props.tagInputValue} placeholder='add a tag' />
        <input type='submit' value='Add Tag'/>
      </form>
      <button onClick={props.handleToggleAll}>Toggle All</button>
      <button onClick={props.handleDeleteAll}>Delete All</button>
    </nav>
  )
}

export default Navigation
