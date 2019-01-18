import React from 'react'

const Navigation = (props) => {

  console.log('props in navigation', props)

  return (
    <nav className='navigation'>
      <form onSubmit={props.submitTask}>
        <input onChange={props.updateInput} id='task-text' value={props.inputValue} placeholder='add a task' />
        <input type='submit' value='submit'/>
      </form>
      <button onClick={props.handleToggleAll}>Toggle All</button>
      <button onClick={props.handleDeleteAll}>Delete All</button>
      <form onSubmit={props.handleCreateNewTag(props.taskInfo.taskName)}>
        <input onChange={props.updateTagInput} id='add-tag' value={props.tagInputValue} placeholder='add a tag' />
        <input type='submit' value='submit'/>
      </form>
      <button onClick={props.letsConsoleLog}>Let's console log</button>
    </nav>
  )
}

export default Navigation
