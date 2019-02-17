import React from 'react'
import Navigation from './components/navigation'
import TaskList from './components/taskList'
import TaskDisplay from './components/taskDisplay'
import TinyMce from './components/tinymce'
import BarChart from './components/d3'
import { Grid, Row} from 'react-bootstrap'
import JSONTree from 'react-json-tree'

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
          {/* <h1 className='taskapp-header'>{this.props.taskInfo.taskName}</h1> */}
          <input onChange={this.props.updateTaskTitle} id='task-text' value={this.props.taskInfo.taskName} placeholder='add a subtask' />
          <Row>
            {/* <BarChart /> */}
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
            <JSONTree data={this.props.taskInfo} shouldExpandNode={() => false} />
          </Row>
          <Row>
            <TinyMce
              taskInfo = {this.props.taskInfo}
              textEditorContent = {this.props.appState.textEditorContentTest}
              handleUpdateTextEditor = {this.props.handleUpdateTextEditor}
              textEditorPrimaryContent = {this.props.textEditorContent}
            />
          </Row>
          <Row>
            <TaskDisplay
              focusedTask={this.props.focusedTask}
              tags={this.props.taskInfo.tags}
            />
          </Row>
          <Row>
            <h4>Subtasks</h4>
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
