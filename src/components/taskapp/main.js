import React from 'react'
import TaskApp from './taskapp'
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
      taskList: [
        {
          name: 'taskname1',
          tags: ['fun', 'productive', 'cool']
        },
        {
          name: 'taskname2',
          tags: ['tasty', 'filling', 'pricey']
        }]
      }
    }

  componentDidMount = () => {
    console.log('componentdidmount')
    const taskList = util.retrieveTasksFromLocalStorage('main-data')
    this.setState({
      taskList: taskList ? taskList : []
    })
  }

  componentDidUpdate = () => {
    console.log('compoentdidupdate')
    util.updateLocalStorage('main-data', this.state.taskList)
  }

  updateInput = (e) => {
    e.preventDefault()
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

  handleCreateNewTask = (e) => {
    e.preventDefault()
    const name = this.state.input.trim()
    this.setState((currentState) => {
      return {
        input: '',
        tagInput: '',
        taskList: currentState.taskList.concat([
          {
            name,
            tags: []
          }])
      }
    })
  }

  handleCreateNewTag = taskName => (e) => {
    e.preventDefault()
    const tagText = 'placeholder for now'

    this.setState((currentState) => {
      const taskList = currentState.taskList
      const currentTask = taskList.find((task) => {
        return task.name === taskName
      })
      const taskIndex = taskList.map((task) => { return task.name }).indexOf(currentTask.name);
      currentState.taskList[taskIndex].tags.push(tagText)
      console.log('hey man', taskList[taskIndex].tags)
      console.log('newTaskList', taskList)
      return {
        taskList: currentState.taskList
      }
    })
  }

  letsConsoleLog = () => {
    console.log('hey we\'re here!')
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleCreateNewTask}>
          <input onChange={this.updateInput} id='task-text' value={this.state.input} placeholder='create new task' />
          <input type='submit' value='submit'/>
        </form>
        <h1>I'm main</h1>
        {this.state.taskList.map((task) => {
          return (
            <div key={uuidv4()}>
              <TaskApp
                taskInfo={task}
                letsConsoleLog={this.letsConsoleLog}
                handleCreateNewTag={this.handleCreateNewTag}
                updateTagInput={this.updateTagInput}
              />
            </div>
          )
        })}

      </div>
    )
  }
}
