import React from 'react'
import SidePanel from './sidePanel'
import TaskApp from '../tasks/taskapp'
import { Grid, Row, Col} from 'react-bootstrap'
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
      sidePanelFocus: '', //currently set in sidePanelFocus function, not currently in use though
      taskListIndex: 0, //may want to target by ID instead of index
      taskList: [
        {
          taskName: 'taskname1',
          taskId: 'temp1',
          tags: ['fun', 'productive', 'cool'],
          percentComplete: '25',
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
      taskListIndex: 0, //may want to store and retrieve preiovus index
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
    if (taskName !== '') {
      this.setState((currentState) => {
        return {
          inputNewTask: '',
          taskList: currentState.taskList.concat([
            {
              taskName,
              taskId: uuidv4(),
              tags: [],
              percentComplete: 25,
              tasks: [],
              lastUpdated: Date()
            }])
        }
      })
    }
  }

  //need to create the tasks under the taskList
  handleCreateSubTask = (e) => {
    e.preventDefault()
    const text = this.state.subTaskInput.trim()
    if (text !== '') {
      const taskListIndex = this.state.taskListIndex
      const taskList = this.state.taskList
      const currentTask = taskList[taskListIndex]
      //update taskList with new tasks
      const newTasks = currentTask.tasks.concat([{
        text,
        active: true,
        id: uuidv4()
      }])
      taskList[taskListIndex].tasks = newTasks
      this.setState({
        subTaskInput: '',
        taskList: taskList
      })
    }
  }

  handleCreateNewTag = taskName => (e) => {
    e.preventDefault()
    const tagText = this.state.tagInput
    this.setState((currentState) => {
      const taskList = currentState.taskList
      const currentTask = taskList.find((task) => {
        return task.taskName === taskName
      })
      const taskIndex = taskList.map((task) => { return task.taskName }).indexOf(currentTask.taskName);
      currentState.taskList[taskIndex].tags.push(tagText)
      return {
        tagInput: '',
        taskList: currentState.taskList
      }
    })
  }

  handleDeleteTaskApp = (name) => {
    this.setState((currentState) => {
      return {
        taskList: currentState.taskList.filter((task) => {
          return task.taskName !== name
        })
      }
    })
  }

  handleToggleAll = () => {
    const tasks = this.state.taskList[this.state.taskListIndex].tasks
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
      const currentTaskList = currentState.taskList
      const taskIndex = currentState.taskListIndex
      const currentTasks = currentState.taskList[taskIndex].tasks
      currentTasks.forEach((task) => {
        task.active = setActive()
      })
      currentTaskList[taskIndex].tasks = currentTasks
      return {
        taskList: currentTaskList
      }
    })
  }

  handleToggleTask = (taskId) => {
    this.setState((currentState) => {
      const taskList = currentState.taskList
      const taskIndex = currentState.taskListIndex
      const currentSubTask = currentState.taskList[currentState.taskListIndex].tasks
      const subTaskIndex = currentSubTask.map(function(task) { return task.id }).indexOf(taskId);
      const subTask = taskList[taskIndex].tasks[subTaskIndex]
      subTask.active = !subTask.active;
      return {
        taskList: taskList
      }
    })
  }

  handleDeleteSubTask = (text) => {
    this.setState((currentState) => {
      const taskList = currentState.taskList
      const taskIndex = [currentState.taskListIndex]
      const tasks = currentState.taskList[currentState.taskListIndex].tasks
      taskList[taskIndex].tasks = tasks.filter((task) => task.text !== text)
      return {
        taskList: taskList
      }
    })
  }

  handleDeleteAllTasks = () => {
    this.setState((currentState) => {
      const taskList = currentState.taskList
      const taskIndex = [currentState.taskListIndex]
      const tasks = currentState.taskList[currentState.taskListIndex].tasks
      taskList[taskIndex].tasks = tasks.filter((task) => task.active === true)
      return {
        taskList: taskList
      }
    })
  }

  handleFocusTask = (e) => {
    const taskId = e.target.closest('li').id
    this.setState((currentState) => {
      return {
        focusedTask: currentState.taskList[this.state.taskListIndex].tasks.find((task) => {
          return task.id === taskId
        })
      }
    })
  }

  sidePanelFocus = (e) => {
    const taskName = e.target.getAttribute('data-sidepanelid')
    const taskListIndex =   this.state.taskList.map((task) => { return task.taskName }).indexOf(taskName);
    this.setState((currentState) => {
      return {
        taskListIndex: taskListIndex,
        sidePanelFocus: currentState.taskList.find((task) => {
          return task.taskName === taskName
        })
      }
    })
  }

  render() {
    return (
      <Grid className='main-grid' fluid={true}>
        <h1>Main TaskApp Screen</h1>
        <Row className='show-grid main-display'>
          <Col xs={12} sm={3} md={3} className='sidenav'>
            <form onSubmit={this.handleCreateNewTask}>
              <input onChange={this.updateNewTaskInput} id='task-text' value={this.state.inputNewTask} placeholder='create new task' />
              <input type='submit' value='submit'/>
            </form>
            <h4>All Tasks</h4>
            <div className='side-panel'>
              {this.state.taskList.map((task) => {
                return (
                  <div key={uuidv4()}>
                    <SidePanel
                      task={task}
                      sidePanelFocus={this.sidePanelFocus}
                      onHandleDeleteTask={()=> this.handleDeleteTaskApp(task.taskName)}
                    />
                  </div>
                )
              })}
            </div>

          </Col>
          <Col xs={12} sm={9} md={9} className='task-center'>
            {/* {console.log('this.state.taskList[this.state.taskListIndex].tasks', this.state.taskList[this.state.taskListIndex].tasks)}
            {console.log('this.state.taskList[0]')} */}
            {typeof this.state.taskList[0] !== 'undefined' ?
            <TaskApp
              taskInfo={
                this.state.taskListIndex !== '' ?
                this.state.taskList[this.state.taskListIndex] :
                this.state.taskList[0]
              }
              tasks={this.state.taskList[this.state.taskListIndex].tasks}
              handleDeleteSubTask={this.handleDeleteSubTask}
              handleCreateNewTag={this.handleCreateNewTag}
              updateSubTaskInput={this.updateSubTaskInput}
              subTaskInput={this.state.subTaskInput}
              handleCreateSubTask={this.handleCreateSubTask}
              updateTagInput={this.updateTagInput}
              tagInput={this.state.tagInput}
              handleToggleAll={this.handleToggleAll}
              handleDeleteAllTasks={this.handleDeleteAllTasks}
              handleToggleTask={this.handleToggleTask}
              handleFocusTask={this.handleFocusTask}
              focusedTask={this.state.focusedTask}
              updateTaskInput={this.updateTaskInput}
              taskListIndex={this.state.taskListIndex}
            />
            : <h1>Add a task and click on task in the left panel</h1>}
          </Col>
        </Row>
      </Grid>
    )
  }
}
