import React from 'react'

const Navigation = (props) => {

  return (
    <nav className='task-navigation-container'>
      <h3>Navigation</h3>
      <div className='task-navigation-form'>
        <form onSubmit={props.handleCreateSubTask}>
          <input onChange={props.updateSubTaskInput} id='task-text' value={props.subTaskInput} placeholder='add a subtask' />
          <input type='submit' value='Add Subtask'/>
        </form>
        <form onSubmit={props.handleCreateNewTag(props.taskInfo.taskName)}>
          <input onChange={props.updateTagInput} id='add-tag' value={props.tagInputValue} placeholder='add a tag' />
          <input type='submit' value='Add Tag'/>
        </form>
      </div>
      <div className='task-navigation-buttons'>
        <button onClick={props.handleToggleAll}>Toggle All</button>
        <button onClick={props.handleDeleteAll}>Delete All</button>
      </div>
    </nav>
  )
}

export default Navigation
