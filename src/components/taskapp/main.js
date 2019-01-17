import React from 'react'
import TaskApp from './taskapp'
const uuidv4 = require('uuid/v4');

const RenderTaskList = (props) => {
    return props.taskList.map((task) => {
      return (
        <div key={uuidv4()}>
          <TaskApp taskInfo={task}/>
        </div>
      )
    })
}

export default class Main extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      editiable: false,
      input: '',
      focusedTask: {},
      taskList: [
        {
          name: 'taskname1',
          editiable: false,
          input: '',
          focusedTask: {},
          tasks: [],
          tags: []
        },
        {
          name: 'taskname2',
          editiable: false,
          input: '',
          focusedTask: {},
          tasks: [],
          tags: []
        }]
      }
    }

  updateInput = (e) => {
    const value = e.target.value;
    this.setState({
      input: value
    })
  }

  //add validation to check if name exists taskList, throw warning notification if it does
  handleCreateNewTask = (e) => {
    e.preventDefault()
    const name = this.state.input.trim()
    this.setState((currentState) => {
      return {
        input: '',
        taskList: currentState.taskList.concat([{name}])
      }
    })
  }

  componentDidMount = () => {
  }

  componentDidUpdate = () => {
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleCreateNewTask}>
          <input onChange={this.updateInput} id='task-text' value={this.state.input} placeholder='add a task' />
          <input type='submit' value='submit'/>
          {/* <button onClick={this.handleCreateNewTask}>Create a new task</button> */}
        </form>
        <h1>I'm main</h1>

        <RenderTaskList taskList={this.state.taskList}/>
      </div>
    )
  }
}
