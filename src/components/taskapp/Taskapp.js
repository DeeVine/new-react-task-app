import React from 'react'
import './taskapp.css'
const uuidv4 = require('uuid/v4');

// [ ] log hours to tasks
// [ ] tag tasks
// [ ] add timer to tasks
  // [ ] add notifications for timers
// [ ] Make content editable
  // [ ] Timestamp last edit
// [x] Add Task
  // [ ] Add additional fields to form field
  // [x] Input Validation
    // [ ] More robust input check than just checking for " "
// [x] Toggle task
// [ ] Filters --> All, Active, Completed
// [x] Toggle all tasks
// [x] Delete task
// [ ] Delete all inactive task
// [ ] Move to 'recycle'
//  [ ] Permanantely remove
// [ ] React Router Filters
// [ ] Utilize local storage
// [ ] Utilize database storage

const Tasks = (props) => {
  return (
    <div >
      <h4>Tasks</h4>
      <ul id='inactive-tasks'>
        {props.tasks.map((task) => {
          return (
            <li key={uuidv4()} >
              <input readOnly type="checkbox" checked={!task.active} onClick={() => props.onToggleTask(task.text)} />
              <span contentEditable>{task.text}</span>
              <button onClick={() => props.onRemoveTask(task.text)}>Delete</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default class Taskapp extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      input: '',
      tasks: [
        {
          text:'first task',
          active: true
        },
        {
          text:'second task',
          active: true
        },
        {
          text:'third task',
          active: false
        },
      ]
    }
  }

  updateInput = (e) => {
    const value = e.target.value;
    this.setState({
      input: value
    })
  }

  handleRemoveTask = (text) => {
    this.setState((currentState) => {
      return {
        tasks: currentState.tasks.filter((task) => task.text !== text)
      }
    })
  }

  submitTask = (e) => {
    e.preventDefault()
    const text = this.state.input

    if (text !== '') {
      this.setState({
        input: '',
        tasks: this.state.tasks.concat([{
          text,
          active: true
        }])
      })
    }
  }

  //toggle the active value of a task and sets it back into it's original array index before setting state
  handleToggleTask = (text) => {
    this.setState((currentState) => {
      const taskIndex = currentState.tasks.map(function(e) { return e.text }).indexOf(text);
      const inactiveTask = currentState.tasks.find((task) => task.text === text)
      const newArray = currentState.tasks.filter((task) => {
        return task.text !== text
      })
      newArray.splice(taskIndex, 0, { text, active: !inactiveTask.active })
      return {
        tasks: newArray
      }
    })
  }

  getInactiveCount = () => {
    let inactiveCounter = 0;
    this.state.tasks.forEach((task) => {
      if (!task.active) {
        inactiveCounter++
      }
    })
    return inactiveCounter
  }

  handleToggleAll = () => {
    //TODO: create function to count number of active/inactive
    const inactiveCount = this.getInactiveCount()
    const tasks = this.state.tasks
    const setActive = () => {
      if (inactiveCount === tasks.length) {
        return true
      } else {
        return false
      }
    }

    this.setState({
      tasks: tasks.map((task) => {
        return ({
          text: task.text,
          active: setActive()
        })
      })
    })
  }

  render() {
    return (
      <div >
        <div className='main' style={{margin: 'auto'}}>
          <div className='tasks_container'>
            <h1 style={{textAlign: 'center'}}>Tasks</h1>
            <form onSubmit={this.submitTask}>
              <input onChange={this.updateInput} id='task-text' value={this.state.input} placeholder='add a task' />
              <input type='submit' value='submit'/>
            </form>
            <button onClick={this.handleToggleAll}>Toggle All</button>
            <Tasks
              tasks={this.state.tasks}
              onToggleTask={this.handleToggleTask}
              onRemoveTask={this.handleRemoveTask}
            />
          </div>
        </div>
      </div>
    )
  }
}
