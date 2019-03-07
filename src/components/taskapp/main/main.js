import React from 'react'
import SidePanel from '../sidepanel/sidePanel'
import DropdownFilter from '../dropdownFilter/dropdownFilter'
import TaskApp from '../tasks/taskapp'
import Timer from '../timer/timer'
import { Container, Row, Col} from 'reactstrap'
import '../main.css'
import axios from 'axios'
import moment from 'moment'
import JSONTree from 'react-json-tree'
import util from '../util.js'
const uuidv4 = require('uuid/v4');

export default class Main extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      inputNewTask: '',
      inputTaskFilter: '',
      subTaskInput: '',
      addNoteInput: '',
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
      console.log(error)
    })
    /******* Fallback code utlizing local storage *******/
    // util.updateLocalStorage('taskList-data', this.state.taskList)
    this.runMoment(this.state.taskList)
    // this.filterByDateHoursLog()
  }

  //pass in ascending/descending argument
  sortTaskList = (filterBy) => {
    this.setState((currentState) => {
      const taskList = currentState.taskList
      const sortedAscending = taskList.sort(function(a,b) {
        const date1 = moment(a.lastUpdated).valueOf()
        const date2 = moment(b.lastUpdated).valueOf()
        if(filterBy === 'ascending') {
          return date1-date2
        } else if (filterBy === 'descending') {
          return date2-date1
        } else {
          return date1-date2
        }
      })
      return {
        taskList: sortedAscending
      }
    })
  }

  updateNewTaskInput = (e) => {
    const value = e.target.value;
    this.setState({
      inputNewTask: value
    })
  }

  updateInputTaskFilter = (e) => {
    const value = e.target.value;
    this.setState({
      inputTaskFilter: value
    })
  }

  createNewTask = (taskName, optionalHoursObj) => {
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
            lastUpdated: util.dateNow(),
            hours: 0,
            hoursLog: optionalHoursObj ? [optionalHoursObj] : [],
            notes: [],
            textEditorContent: 'Go ahead, write some notes'
          }])
      }
    })
  }

  handleCreateNewTask = (e) => {
    e.preventDefault()
    const taskName = this.state.inputNewTask.trim()
    if (taskName !== '') {
      this.createNewTask(taskName)
    }
  }

  updateTaskTitle = (e) => {
    const text = e.target.value;
    this.setState((currentState) => {
      const taskListIndex = currentState.taskListIndex
      const taskList = currentState.taskList
      taskList[taskListIndex].taskName = text
      return {
        tasks: taskList
      }
    })
  }

  updateSubTaskInput = (e) => {
    e.preventDefault()
    const value = e.target.value;
    this.setState({
      subTaskInput: value
    })
  }

  updateAddNoteInput = (e) => {
    e.preventDefault()
    const value = e.target.value;
    this.setState({
      addNoteInput: value
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

  handleAddNote = taskName => (e) => {
    e.preventDefault()
    console.log('handleAddnote')
    const text = this.state.addNoteInput.trim()
    if (text !== '') {
      const textObject = {
        text,
        updated: util.dateNow()
      }
      const taskListIndex = this.state.taskListIndex
      const taskList = this.state.taskList
      const currentTask = taskList[taskListIndex]
      //update taskList with new notes
      const newNotes = currentTask.notes.concat([textObject])
      taskList[taskListIndex].notes = newNotes
      this.setState({
        addNoteInput: '',
        taskList: taskList
      })
    }
  }

  createNewHoursLogTag = (taskName, tagValue) => {
    //find task to update
    this.setState((currentState) => {
      const taskList = currentState.taskList
      const currentTask = taskList.find((task) => {
        return task.taskName === taskName
      })
      const taskIndex = taskList.map((task) => { return task.taskName }).indexOf(currentTask.taskName)
      currentState.taskList[taskIndex].tags.push(tagValue)
      return {
        tagInput: '',
        taskList: currentState.taskList
      }
    })
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

  deleteHoursLog = (taskName, startTime) => {
    this.setState((currentState) => {
      const taskList = currentState.taskList
      const taskListItem = taskList.filter((taskListItem) => {
        return taskListItem.taskName === taskName
      })
      const hoursLog = taskListItem[0].hoursLog
      const filteredHoursLog = hoursLog.filter((hoursLogItem) => {
        return hoursLogItem.startTime !== startTime
      })
      //find index of taskList item and update state
      const taskListIndex = taskList.map((task) => { return task.taskName }).indexOf(taskName)
      taskList[taskListIndex].hoursLog = filteredHoursLog
      return { taskList }
    })
  }

  addHoursLog = taskTimeObject => (e) => {
    console.log('are we in here?')
    // e.preventDefault()
    //TODO: milisecond conversion for hours from startTime and stopTime
    const { taskName, startTime, stopTime } = taskTimeObject
    const timeInMiliseconds = {
      startTime: moment(startTime).valueOf(),
      stopTime: moment(stopTime).valueOf()
    }

    console.log('timeInMiliseconds', timeInMiliseconds)

    const hoursObj = {
      taskName,
      startTime: startTime,
      stopTime: stopTime
    }
    const currentTask = this.state.taskList.find((task) => {
      return task.taskName === taskName
    })
    //check if task exists, otherwise create a new task
      //TODO: add hour along with new task
    if (!currentTask) {
      this.createNewTask(taskName, hoursObj)
    } else {
      this.setState((currentState) => {
        const taskList = currentState.taskList
        const currentTask = taskList.find((task) => {
          return task.taskName === taskName
        })
        const taskIndex = taskList.map((task) => { return task.taskName }).indexOf(currentTask.taskName)
        const hoursLog = currentState.taskList[taskIndex].hoursLog
        //check if hoursLog object is defined since some older tasks may not have had this data object
        if(!hoursLog) {
          currentState.taskList[taskIndex].hoursLog = [hoursObj]
        } else {
          hoursLog.push(hoursObj)
        }
        return {
          hoursInput: '',
          taskList: currentState.taskList
        }
      })
    }
  }

  handleAddHours = (taskName) => (e) => {
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
          updated: util.dateNow()
        }
        const hoursLog = currentState.taskList[taskIndex].hoursLog
        //check if hoursLog object is defined since some older tasks may not have had this data object
        if(!hoursLog) {
          currentState.taskList[taskIndex].hoursLog = [hoursObj]
        } else {
          hoursLog.push(hoursObj)
        }
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

  filterByTaskName = (taskList, taskName) => {
    if (!taskName) {
      return taskList
    } else {
      return taskList.filter((task) => {
        return task.taskName === taskName
      })
    }
  }

  runMoment = (taskList) => {

    //iterrate over taskList and create hoursLog object for specific days
    const filterByDate = (arr, date) => {
      // console.log('arr in filterByDate: ', arr)
      // console.log('dateinFilter: ', date)
      // console.log('date', date)
      return arr.filter((hoursLog) => {
        const format = "MMM Do YYYY"
        return moment(hoursLog.updated).format(format) === date
      })
    }

    const filterByDateHoursLog = () => {
        const calculatedHoursByDay = [];
        taskList.forEach((arr) => {
          const taskName = arr.taskName
          const hoursLog = arr.hoursLog
          const date = moment("2019-02-19T23:20:55-08:00").format("MMM Do YYYY")
          console.log('date', date)
          const filteredHoursByDay = filterByDate(hoursLog, date)
          const hoursObj = {
            taskName,
            filteredHoursByDay,
            date
          }
          calculatedHoursByDay.push(hoursObj)
        })
        return calculatedHoursByDay
    }

    const addHours = (arr) => {
      let totalHours = 0
      arr.forEach((item) => {
        totalHours+= item.hours
      })
      return totalHours
    }

    const addUpHours = () => {
      const totalHoursByDate = filterByDateHoursLog().map((arr) => {
        const taskName = arr.taskName
        const totalHours = addHours(arr.filteredHoursByDay)
        const date = arr.date
        return {
          taskName,
          totalHours,
          date
        }
      })
      return totalHoursByDate
    }
    // console.log('filterByDateHoursLog: ', filterByDateHoursLog())
    // console.log('addUpHours', addUpHours())
  }

  render() {

    return (
      <Container className='main-grid' fluid={true}>
        <Timer
          addHoursLog = {this.addHoursLog}
          taskList = {this.state.taskList}
          deleteHoursLog = {this.deleteHoursLog}
          createNewHoursLogTag = {this.createNewHoursLogTag}
        />
        <Row className='show-grid main-display'>
          <Col xs={12} sm={3} md={3} className='sidenav'>
            <JSONTree data={this.state} shouldExpandNode={() => false} />
            <DropdownFilter
              sortFilter = {this.sortTaskList}
            />
            <div className='side-panel'>
              <form onSubmit={this.handleCreateNewTask}>
                <input onChange={this.updateNewTaskInput} id='task-text' value={this.state.inputNewTask} placeholder='create new task' />
                <input type='submit' value='submit'/>
              </form>
              <input onChange={this.updateInputTaskFilter} id='task-filter' value={this.state.inputTaskFilter} placeholder='filter by task name' />
              <h4>Activities & Tasks</h4>
              {this.filterByTaskName(this.state.taskList, this.state.inputTaskFilter).map((task, index) => {
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
              updateTaskTitle = {this.updateTaskTitle}
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
              updateAddNoteInput = {this.updateAddNoteInput}
              handleAddNote = {this.handleAddNote}
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
      </Container>
    )
  }
}
