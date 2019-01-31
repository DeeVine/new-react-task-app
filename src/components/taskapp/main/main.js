import React from 'react'
import SidePanel from './sidePanel'
import TaskApp from '../tasks/taskapp'
import { Grid, Row, Col} from 'react-bootstrap'
import '../main.css'
import axios from 'axios'
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
      hoursInput: '',
      focusedTask: {},
      sidePanelFocus: '', //set sidepanel focus to taskName
      taskListIndex: 0, //may want to target by ID instead of index
      textEditorContentTest: 'testing testing',
      taskList: [
        // {
        //   taskName: 'taskname1',
        //   taskId: 'temp1',
        //   tags: ['fun', 'productive', 'cool'],
        //   percentComplete: '25',
        //   tasks: [],
        //   textEditorContent: ''
        // },
        // {
        //   taskName: 'taskname2',
        //   taskId: 'temp2',
        //   tags: ['tasty', 'filling', 'pricey'],
        //   percentComplete: '40',
        //   tasks: []
        // }
      ],
      }
    }

  componentDidMount = () => {
    axios.get('/getfile')
    .then( (response) => {
      const taskList = response.data
      this.setState({
        taskListIndex: 0, //may want to store and retrieve preiovus index
        taskList: taskList ? taskList : [],
        // sidePanelFocus: this.state.taskList[0]
      })
    })
    .catch(function (error) {
      console.log(error);
    });

    /******* Fallback code utlizing local storage *******/
    // const taskList = util.retrieveTasksFromLocalStorage('taskList-data')
    // this.setState({
    //   taskListIndex: 0, //may want to store and retrieve preiovus index
    //   taskList: taskList ? taskList : [],
    //   // sidePanelFocus: this.state.taskList[0]
    // })
  }

  componentDidUpdate = () => {
    axios.post('/updatefile', this.state.taskList)
    .catch((error) => {
      // console.log(error);
    });
    console.log('componentDidUpdate')
    /******* Fallback code utlizing local storage *******/
    // util.updateLocalStorage('taskList-data', this.state.taskList)
  }

  updateNewTaskInput = (e) => {
    const value = e.target.value;
    this.setState({
      inputNewTask: value
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
              lastUpdated: Date(),
              hours: 0,
              hoursLog: [],
              textEditorContent: 'Go ahead, write some notes'
            }])
        }
      })
    }
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

      //need to find task in taskList
      const taskListIndex = currentState.taskListIndex
      const taskList = currentState.taskList
      const subTasks = taskList[taskListIndex].tasks
      const taskIndex = subTasks.map((task) => { return task.id }).indexOf(taskId);
      subTasks[taskIndex].text = text;
      return {
        tasks: subTasks
      }
    })
  }

  updateTagInput = (e) => {
    const value = e.target.value;
    this.setState({
      tagInput: value
    })
  }

  updateHoursInput = (e) => {
    const value = e.target.value;
    this.setState({
      hoursInput: value
    })
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
    const tagText = this.state.tagInput.trim()
    if (tagText !== '') {
      this.setState((currentState) => {
        const taskList = currentState.taskList
        const currentTask = taskList.find((task) => {
          return task.taskName === taskName
        })
        const taskIndex = taskList.map((task) => { return task.taskName }).indexOf(currentTask.taskName)
        currentState.taskList[taskIndex].tags.push(tagText)
        return {
          tagInput: '',
          taskList: currentState.taskList
        }
      })
    }
  }

  handleUpdateTextEditor = (taskName, textEditorContent) => {
    console.log('taskName', taskName)
    console.log('textEditorContent', textEditorContent)

    this.setState((currentState) => {
      const taskList = currentState.taskList
      const currentTask = taskList.find((task) => {
        return task.taskName === taskName
      })
      const taskIndex = taskList.map((task) => { return task.taskName }).indexOf(currentTask.taskName)
      currentState.taskList[taskIndex].textEditorContent = textEditorContent
      return {
        tagInput: '',
        taskList: currentState.taskList
      }
    })

  }

  handleAddHours = taskName => (e) => {
    e.preventDefault()
    const hours = parseFloat(parseFloat(this.state.hoursInput.trim()).toFixed(2))
    var isnum = /^[+]?([0-9]+(?:[.][0-9]*)?|\.[0-9]+)$/.test(hours) //check to accept positive integers and decimals
    if (hours !== '' && isnum) {
      this.setState((currentState) => {
        const taskList = currentState.taskList
        const currentTask = taskList.find((task) => {
          return task.taskName === taskName
        })
        const taskIndex = taskList.map((task) => { return task.taskName }).indexOf(currentTask.taskName)
        currentState.taskList[taskIndex].hours += hours
        const hoursObj = {
          hours,
          updated: Date()
        }
        currentState.taskList[taskIndex].hoursLog.push(hoursObj)
        return {
          hoursInput: '',
          taskList: currentState.taskList
        }
      })
    } else {alert('must input numbers only')}
  }

  handleDeleteTaskApp = (name) => {
    this.setState((currentState) => {
      return {
        taskList: currentState.taskList.filter((task) => {
          return task.taskName !== name
        }),
        taskListIndex: 0
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
    // e.preventDefault()
    const taskName = e.target.closest('.task-item').getAttribute('data-sidepanelid')
    const taskListIndex =   this.state.taskList.map((task) => { return task.taskName }).indexOf(taskName);
    this.setState((currentState) => {
      return {
        taskListIndex: taskListIndex === -1 ? 0 : taskListIndex,
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
              {this.state.taskList.map((task, index) => {
                return (
                  <div key={uuidv4()}>
                    <SidePanel
                      className={this.state.taskListIndex === index? 'side-panel-active': ''}
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
            {typeof this.state.taskList[0] !== 'undefined' ?
            <TaskApp
              taskInfo={
                this.state.taskListIndex !== '' ?
                this.state.taskList[this.state.taskListIndex] :
                this.state.taskList[0]
              }
              appState = {this.state}
              tasks = {this.state.taskList[this.state.taskListIndex].tasks}
              textEditorContent = {this.state.taskList[this.state.taskListIndex].textEditorContent}
              subTaskInput = {this.state.subTaskInput}
              updateSubTaskInput = {this.updateSubTaskInput}
              handleCreateSubTask = {this.handleCreateSubTask}
              handleDeleteSubTask = {this.handleDeleteSubTask}
              tagInput = {this.state.tagInput}
              updateTagInput = {this.updateTagInput}
              handleCreateNewTag = {this.handleCreateNewTag}
              hoursInput = {this.state.hoursInput}
              updateHoursInput = {this.updateHoursInput}
              handleAddHours = {this.handleAddHours}
              handleToggleAll = {this.handleToggleAll}
              handleDeleteAllTasks = {this.handleDeleteAllTasks}
              handleDeleteTaskApp = {() => this.handleDeleteTaskApp(this.state.sidePanelFocus.taskName)}
              handleToggleTask = {this.handleToggleTask}
              handleFocusTask = {this.handleFocusTask}
              handleUpdateTextEditor = {this.handleUpdateTextEditor}
              focusedTask = {this.state.focusedTask}
              updateTaskInput = {this.updateTaskInput}
              taskListIndex = {this.state.taskListIndex}
            />
            : <h1>Add a task and click on task in the left panel</h1>}
          </Col>
        </Row>
      </Grid>
    )
  }
}
