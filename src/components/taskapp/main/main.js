import React from 'react'
import SidePanel from './sidePanel'
import TaskApp from '../tasks/taskapp'
import '../main.css'
const uuidv4 = require('uuid/v4');


const util = {
  updateLocalStorage: (namespace, storedData) => {
    localStorage.setItem(namespace, JSON.stringify(storedData))
  },
  retrieveTasksFromLocalStorage: (namespace) => JSON.parse(localStorage.getItem(namespace))
}

export default class Main extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      input: '',
      tagInput: '',
      taskList: [
        {
          taskName: 'taskname1',
          taskId: 'temp1',
          tags: ['fun', 'productive', 'cool'],
          percentComplete: '25'
        },
        {
          taskName: 'taskname2',
          taskId: 'temp2',
          tags: ['tasty', 'filling', 'pricey'],
          percentComplete: '40'
        }]
      }
    }

  componentDidMount = () => {
    const taskList = util.retrieveTasksFromLocalStorage('main-data')
    this.setState({
      taskList: taskList ? taskList : []
    })
  }

  componentDidUpdate = () => {
    util.updateLocalStorage('main-data', this.state.taskList)
  }

  updateInput = (e) => {
    e.preventDefault()
    const value = e.target.value;
    this.setState({
      input: value
    })
  }

  updateTaskInput = (e) => {
    e.preventDefault()
    const value = e.target.value;
    this.setState({
      taskInput: value
    })
  }

  updateTagInput = (e) => {
    e.preventDefault()
    const value = e.target.value;
    this.setState({
      tagInput: value
    })
  }

  handleCreateNewTask = (e) => {
    e.preventDefault()
    const taskName = this.state.input.trim()
    this.setState((currentState) => {
      return {
        input: '',
        tagInput: '',
        taskList: currentState.taskList.concat([
          {
            taskName,
            taskId: uuidv4(),
            tags: [],
            percentComplete: 25
          }])
      }
    })
  }

  handleCreateNewTag = taskName => (e) => {
    e.preventDefault()
    const tagText = 'placeholder for now'

    console.log('taskName', taskName)

    this.setState((currentState) => {
      const taskList = currentState.taskList
      const currentTask = taskList.find((task) => {
        return task.taskName === taskName
      })
      const taskIndex = taskList.map((task) => { return task.taskName }).indexOf(currentTask.taskName);
      console.log('taskIndex', taskIndex)
      currentState.taskList[taskIndex].tags.push(tagText)
      return {
        taskList: currentState.taskList
      }
    })
  }

  handleDeleteTaskApp = (name) => {
    this.setState((currentState) => {
      return {
        taskList: currentState.taskList.filter((task) => task.taskName !== name)
      }
    })
  }

  letsConsoleLog = () => {
    console.log('hey we\'re here!')
  }

  render() {
    return (
      <div className='main-container'>
        <form onSubmit={this.handleCreateNewTask}>
          <input onChange={this.updateInput} id='task-text' value={this.state.input} placeholder='create new task' />
          <input type='submit' value='submit'/>
        </form>
        <h1>Main Screen</h1>
        <div>
          <h4>Side Panel</h4>
          {this.state.taskList.map((task) => {
            return (
              <div key={uuidv4()}>
                <SidePanel
                  task={task}
                  onHandleDeleteTask={()=> this.handleDeleteTaskApp(task.taskName)}
                />
              </div>
            )
          })}
        </div>
        {this.state.taskList.map((task) => {
          return (
            <div key={uuidv4()}>
              <TaskApp
                taskInfo={task}
                letsConsoleLog={this.letsConsoleLog}
                handleCreateNewTag={this.handleCreateNewTag}
                updateTagInput={this.updateTagInput}
                tagInputValue={this.state.tagInput}
              />
            </div>
          )
        })}

      </div>
    )
  }
}
