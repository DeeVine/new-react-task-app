import React from 'react'
import Navigation from './components/navigation'
import TaskList from './components/taskList'
import TaskDisplay from './components/taskDisplay'
import { Grid, Row} from 'react-bootstrap'

export default class Taskapp extends React.Component {
  constructor(props){
    super(props)

    console.log('this.props in Taskapp', this.props)

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

  }

  componentDidUpdate = () => {

  }

  render() {
    return (
      <Grid className='tasks_container'>
          <h1 className='taskapp-header'>{this.props.taskInfo.taskName}</h1>
          <Row>
            <Navigation
              taskInfo = {this.props.taskInfo}
              submitTask = {this.submitTask}
              tagInput = {this.props.tagInput}
              updateSubTaskInput={this.props.updateSubTaskInput}
              subTaskInput={this.props.subTaskInput}
              updateTagInput = {this.props.updateTagInput}
              tagInputValue = {this.props.tagInput}
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
              updateTaskInput={this.props.updateTaskInput}
              onToggleTask={this.props.handleToggleTask}
              handleDeleteSubTask={this.props.handleDeleteSubTask}
              handleFocusTask={this.props.handleFocusTask}
            />
          </Row>
      </Grid>
    )
  }
}
