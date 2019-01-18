import React from 'react'
import Navigation from './components/navigation'
import TaskList from './components/taskList'
import TaskDisplay from './components/taskDisplay'
const uuidv4 = require('uuid/v4');

const util = {
  updateLocalStorage: (namespace, storedData) => {
    localStorage.setItem(namespace, JSON.stringify(storedData))
  },
  retrieveTasksFromLocalStorage: (namespace) => JSON.parse(localStorage.getItem(namespace))
}

export default class Taskapp extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      input: '',
      tagInput: '',
      focusedTask: {},
      tasks: []
      /*************************************
      task object structure
      tasks: [
        {
          text:'first task',
          active: true,
          id: uuidv4()
        },
      ]
      **************************************/
    }
  }

  componentDidMount = () => {
    const tasks = util.retrieveTasksFromLocalStorage(this.props.taskInfo.taskName)
    this.setState({
      tasks: tasks ? tasks : []
    })
  }

  componentDidUpdate = () => {
    util.updateLocalStorage(this.props.taskInfo.taskName, this.state.tasks)
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

  updateTagInput = (e) => {
    const value = e.target.value;
    this.setState({
      tagInput: value
    })
  }


  updateTaskInput = (e) => {
    const taskId = e.target.closest('li').id
    const text = e.target.value;
    this.setState((currentState) => {
      const currentTasks = currentState.tasks
      const taskIndex = currentState.tasks.map((task) => { return task.id }).indexOf(taskId);
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

  handleDeleteAllTasks = () => {
    this.setState((currentState) => {
      return {
        tasks: currentState.tasks.filter((task) => task.active === true)
      }
    })
  }

  submitTask = (e) => {
    e.preventDefault()
    const text = this.state.input.trim()
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
            <h1 style={{textAlign: 'center'}}>{this.props.taskInfo.taskName}</h1>
            <div>
              <Navigation
                taskInfo = {this.props.taskInfo}
                submitTask = {this.submitTask}
                inputValue = {this.state.input}
                updateInput = {this.updateInput}
                tagInputValue = {this.state.tagInput}
                updateTagInput = {this.updateTagInput}
                handleToggleAll = {this.handleToggleAll}
                handleDeleteAll = {this.handleDeleteAllTasks}
                handleCreateNewTag = {this.props.handleCreateNewTag}
                letsConsoleLog = {this.props.letsConsoleLog}
              />
            </div>
            <TaskList
              tasks={this.state.tasks}
              updateTask={this.updateTaskInput}
              onToggleTask={this.handleToggleTask}
              onRemoveTask={this.handleDeleteTask}
              onFocusTask={this.handleFocusTask}
            />
            <TaskDisplay
              focusedTask={this.state.focusedTask}
              tags={this.props.taskInfo.tags}
            />
          </div>
        </div>
      </div>
    )
  }
}
