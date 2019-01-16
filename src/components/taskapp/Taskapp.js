import React from 'react'
import './taskapp.css'
const uuidv4 = require('uuid/v4');

const util = {
  updateLocalStorage: (tasks) => {
    localStorage.setItem('localTodos', JSON.stringify(tasks))
  },
  retrieveLocalStorage: () => JSON.parse(localStorage.getItem('localTodos'))
}

const Tasks = (props) => {
  if(props.tasks) {
    return (
      <div className='tasks_list'>
        <h4>Tasks</h4>
        <ul id='inactive-tasks'>
          {props.tasks.map((task) => {
            return (
              <li
                className={(task.active === true ? 'task_active' : 'task_inactive')}
                key={task.id}
                id={task.id}>
                <input readOnly type="checkbox" checked={!task.active} onClick={() => props.onToggleTask(task.id)} />
                <input onChange={props.updateTask} value={task.text} onFocus={props.onFocusTask}/>
                <button onClick={() => props.onRemoveTask(task.text)}>Delete</button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  } else {
    return <div>No Tasks</div>
  }
}

const TaskDisplay = (props) => {
  return(
    <div className='task_display'>
      <h4>Display</h4>
      <span>{props.focusedTask.text}</span>
    </div>
  )
}

export default class Taskapp extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      editiable: false,
      input: '',
      focusedTask: {},
      tasks: null
      //task structure
      // tasks: [
      //   {
      //     text:'first task',
      //     active: true,
      //     id: uuidv4()
      //   },
      // ]
    }
    //create a reference for focus
    this.myRef = React.createRef();
  }

  componentDidMount = () => {
    this.setState({
      tasks: util.retrieveLocalStorage()
    })
  }

  componentDidUpdate = () => {
    util.updateLocalStorage(this.state.tasks)
  }

  handleFocusTask = (e) => {
    const taskId = e.target.closest('li').id
    this.setState((currentState) => {
      return {
        focusedTask: currentState.tasks.find((task) => {
          return task.id === taskId
        })
      }
    })
  }

  updateInput = (e) => {
    const value = e.target.value;
    this.setState({
      input: value
    })
  }

  updateTaskInput = (e) => {
    const taskId = e.target.closest('li').id
    const text = e.target.value;
    this.setState((currentState) => {
      const currentTasks = currentState.tasks
      const taskIndex = currentState.tasks.map(function(task) { return task.id }).indexOf(taskId);
      currentTasks[taskIndex].text = text;
      return {
        tasks: currentTasks
      }
    })
  }

  handleDeleteTask = (text) => {
    this.setState((currentState) => {
      return {
        tasks: currentState.tasks.filter((task) => task.text !== text)
      }
    })
  }

  HandleDeleteAllTasks = () => {
    this.setState((currentState) => {
      return {
        tasks: currentState.tasks.filter((task) => task.active === true)
      }
    })
  }

  submitTask = (e) => {
    e.preventDefault()
    const text = this.state.input

    console.log('this.state.tasks', this.state.tasks)
    if (this.state.tasks && text !== '') {
      this.setState({
        input: '',
        tasks: this.state.tasks.concat([{
          text,
          active: true,
          id: uuidv4()
        }])
      })
    } else if (text !== '') {
      this.setState({
        input: '',
        tasks: [{
          text,
          active: true,
          id: uuidv4()
        }]
      })
    }
  }

  //toggle the active value of a task and sets it back into it's original array index before setting state
  handleToggleTask = (taskId) => {
    this.setState((currentState) => {
      const currentTasks = currentState.tasks
      const taskIndex = currentState.tasks.map(function(task) { return task.id }).indexOf(taskId);
      currentTasks[taskIndex].active = !currentTasks[taskIndex].active;
      return {
        tasks: currentTasks
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
      return inactiveCount === tasks.length ? true : false
    }

    this.setState((currentState) => {
      const currentTasks = currentState.tasks
      currentTasks.forEach((task) => {
        task.active = setActive()
      })
      return {
        tasks: currentTasks
      }
    })
  }

  render() {
    return (
      <div >
        <div className='main' style={{margin: 'auto'}}>
          <div className='tasks_container'>
            <h1 style={{textAlign: 'center'}}>TaskApp</h1>
            <div>
              <nav className='navigation'>
                <form onSubmit={this.submitTask}>
                  <input onChange={this.updateInput} id='task-text' value={this.state.input} placeholder='add a task' />
                  <input type='submit' value='submit'/>
                </form>
                <button onClick={this.handleToggleAll}>Toggle All</button>
                <button onClick={this.HandleDeleteAllTasks}>Delete All</button>
              </nav>
            </div>
            <Tasks
              tasks={this.state.tasks}
              updateTask={this.updateTaskInput}
              onToggleTask={this.handleToggleTask}
              onRemoveTask={this.handleDeleteTask}
              onFocusTask={this.handleFocusTask}
            />
            <TaskDisplay focusedTask={this.state.focusedTask}/>
          </div>
        </div>
      </div>
    )
  }
}
