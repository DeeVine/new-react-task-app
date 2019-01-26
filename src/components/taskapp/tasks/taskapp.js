import React from 'react'
import Navigation from './components/navigation'
import TaskList from './components/taskList'
import TaskDisplay from './components/taskDisplay'
import { Grid, Row} from 'react-bootstrap'

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

  }

  componentDidUpdate = () => {

  }

  render() {
    return (
      <Grid className='tasks_container'>
          <h1 className='taskapp-header'>{this.props.taskInfo.taskName}</h1>
          <Row>
            <Navigation
              appState = {this.props.appState}
              taskInfo = {this.props.taskInfo}
              tagInput = {this.props.tagInput}
              updateTagInput = {this.props.updateTagInput}
              handleCreateSubTask={this.props.handleCreateSubTask}
              subTaskInput={this.props.subTaskInput}
              updateSubTaskInput={this.props.updateSubTaskInput}
              handleToggleAll = {this.props.handleToggleAll}
              handleDeleteAll = {this.props.handleDeleteAllTasks}
              handleDeleteTaskApp = {this.props.handleDeleteTaskApp}
              handleCreateNewTag = {this.props.handleCreateNewTag}
              hoursInput={this.props.hoursInput}
              updateHoursInput={this.props.updateHoursInput}
              handleAddHours={this.props.handleAddHours}
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
