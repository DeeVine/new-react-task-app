import React from 'react'

const Navigation = (props) => {
  return (
    <nav className='navigation'>
      <form onSubmit={props.submitTask}>
        <input onChange={props.updateInput} id='task-text' value={props.inputValue} placeholder='add a task' />
        <input type='submit' value='submit'/>
      </form>
      <button onClick={props.handleToggleAll}>Toggle All</button>
      <button onClick={props.handleDeleteAll}>Delete All</button>
    </nav>
  )
}

export default Navigation
