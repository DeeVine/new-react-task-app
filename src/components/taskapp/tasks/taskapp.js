import React from 'react'
import Navigation from './components/navigation'
import TaskList from './components/taskList'
import TaskDisplay from './components/taskDisplay'
import { Grid, Row, Col, Image, Button } from 'react-bootstrap'
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

  render() {
    return (
      <Grid className='tasks_container'>
          <h1 className='taskapp-header'>{this.props.taskInfo.taskName}</h1>
          <Row>
            <Navigation
              taskInfo = {this.props.taskInfo}
              submitTask = {this.submitTask}
              tagInputValue = {this.state.tagInput}
              updateSubTaskInput={this.props.updateSubTaskInput}
              subTaskInput={this.props.subTaskInput}
              updateTagInput = {this.updateTagInput}
              handleToggleAll = {this.props.handleToggleAll}
              handleDeleteAll = {this.props.handleDeleteAllTasks}
              handleCreateNewTag = {this.props.handleCreateNewTag}
              letsConsoleLog = {this.props.letsConsoleLog}
              handleCreateSubTask={this.props.handleCreateSubTask}
            />
          </Row>
          <Row>
            <TaskDisplay
              focusedTask={this.props.focusedTask}
              tags={this.props.taskInfo.tags}
            />
          </Row>
          <Row>
            <TaskList
              tasks={this.props.tasks}
              updateTask={this.updateTaskInput}
              onToggleTask={this.props.handleToggleTask}
              handleDeleteSubTask={this.props.handleDeleteSubTask}
              handleFocusTask={this.props.handleFocusTask}
            />
          </Row>
      </Grid>
    )
  }
}
