import React from 'react'
import SidePanel from './sidePanel'
import TaskApp from '../tasks/taskapp'
import { Grid, Row, Col, Button } from 'react-bootstrap'
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
      inputNewTask: '',
      subTaskInput: '',
      tagInput: '',
      focusedTask: {},
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
        }],
        tasks: [],
      }
    }

  componentDidMount = () => {
    const taskList = util.retrieveTasksFromLocalStorage('taskList-data')
    const tasks = util.retrieveTasksFromLocalStorage('tasks-data')
    this.setState({
      taskList: taskList ? taskList : [],
      tasks: tasks ? tasks : []
    })
  }

  componentDidUpdate = () => {
    util.updateLocalStorage('taskList-data', this.state.taskList)
    util.updateLocalStorage('tasks-data', this.state.tasks)
  }

  updateNewTaskInput = (e) => {
    e.preventDefault()
    const value = e.target.value;
    this.setState({
      inputNewTask: value
    })
  }

  updateSubTaskInput = (e) => {
    e.preventDefault()
    const value = e.target.value;
    this.setState({
      subTaskInput: value
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
    const taskName = this.state.inputNewTask.trim()
    this.setState((currentState) => {
      return {
        inputNewTask: '',
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

  handleCreateSubTask = (e) => {
    e.preventDefault()
    const text = this.state.subTaskInput.trim()
    if (text !== '') {
      this.setState({
        subTaskInput: '',
        tasks: this.state.tasks.concat([{
          text,
          active: true,
          id: uuidv4()
        }])
      })
    }
  }

  handleDeleteSubTask = (text) => {
    this.setState((currentState) => {
      return {
        tasks: currentState.tasks.filter((task) => task.text !== text)
      }
    })
  }

  handleCreateNewTag = taskName => (e) => {
    e.preventDefault()
    const tagText = 'placeholder for now'
    this.setState((currentState) => {
      const taskList = currentState.taskList
      const currentTask = taskList.find((task) => {
        return task.taskName === taskName
      })
      const taskIndex = taskList.map((task) => { return task.taskName }).indexOf(currentTask.taskName);
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

  handleToggleAll = () => {
    const tasks = this.state.tasks
    const getInactiveCount = () => {
      let inactiveCounter = 0;
      tasks.forEach((task) => {
        if (!task.active) {
          inactiveCounter++
        }
      })
      return inactiveCounter
    }
    const inactiveCount = getInactiveCount()
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

  handleDeleteAllTasks = () => {
    this.setState((currentState) => {
      return {
        tasks: currentState.tasks.filter((task) => task.active === true)
      }
    })
  }

  handleFocusTask = (e) => {
    const taskId = e.target.closest('li').id
    console.log('taskId', taskId)
    this.setState((currentState) => {

      const foundVal = currentState.tasks.find((task) => {
        return task.id === taskId
      })

      console.log('foundVal', foundVal)

      return {
        focusedTask: currentState.tasks.find((task) => {
          return task.id === taskId
        })
      }
    })
  }

  letsConsoleLog = () => {
    console.log('hey we\'re here!')
  }

  render() {
    return (
      <Grid className='main-grid' fluid={true}>
        <h1>Main Screen</h1>
        <Row className='show-grid main-display'>
          <Col xs={12} sm={3} md={3} className='sidenav'>
            <form onSubmit={this.handleCreateNewTask}>
              <input onChange={this.updateNewTaskInput} id='task-text' value={this.state.inputNewTask} placeholder='create new task' />
              <input type='submit' value='submit'/>
            </form>
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
          </Col>
          <Col xs={12} sm={9} md={9} className='task-center'>
            {typeof this.state.taskList[0] !== 'undefined' ?
            <TaskApp
              taskInfo={this.state.taskList[0]}
              tasks={this.state.tasks}
              handleDeleteSubTask={this.handleDeleteSubTask}
              letsConsoleLog={this.letsConsoleLog}
              handleCreateNewTag={this.handleCreateNewTag}
              updateSubTaskInput={this.updateSubTaskInput}
              subTaskInput={this.state.subTaskInput}
              handleCreateSubTask={this.handleCreateSubTask}
              updateTagInput={this.updateTagInput}
              tagInputValue={this.state.tagInput}
              handleToggleAll={this.handleToggleAll}
              handleDeleteAllTasks={this.handleDeleteAllTasks}
              handleToggleTask={this.handleToggleTask}
              handleFocusTask={this.handleFocusTask}
              focusedTask={this.state.focusedTask}
            />
            : <h1>Add a task and click on task in the left panel</h1>}
            {/* {this.state.taskList.map((task) => {
              return (
                <div className='taskapp_container' key={uuidv4()}>
                  <TaskApp
                    taskInfo={task}
                    letsConsoleLog={this.letsConsoleLog}
                    handleCreateNewTag={this.handleCreateNewTag}
                    updateTagInput={this.updateTagInput}
                    tagInputValue={this.state.tagInput}
                  />
                </div>
              )
            })} */}
          </Col>
        </Row>
      </Grid>
    )
  }
}
