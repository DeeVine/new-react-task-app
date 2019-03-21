import React from "react";
import Navigation from "./components/navigation";
import TaskList from "./components/taskList";
import TaskDisplay from "./components/taskDisplay";
import "./taskapp.css";
const uuidv4 = require("uuid/v4");

const util = {
  updateLocalStorage: (namespace, tasks) => {
    localStorage.setItem(namespace, JSON.stringify(tasks));
  },
  retrieveTasksFromLocalStorage: namespace =>
    JSON.parse(localStorage.getItem(namespace))
};

export default class NewTasks extends React.Component {
  constructor(props) {
    super(props);

    const state = props.taskInfo;
    console.log("state", state);

    this.state = {
      editiable: false,
      input: "",
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
    };
  }

  componentDidMount = () => {
    const tasks = util.retrieveTasksFromLocalStorage(this.props.taskName);
    this.setState({
      tasks: tasks ? tasks : []
    });
  };

  componentDidUpdate = () => {
    util.updateLocalStorage(this.props.taskName, this.state.tasks);
  };

  handleFocusTask = e => {
    const taskId = e.target.closest("li").id;
    this.setState(currentState => {
      return {
        focusedTask: currentState.tasks.find(task => {
          return task.id === taskId;
        })
      };
    });
  };

  updateInput = e => {
    const value = e.target.value;
    this.setState({
      input: value
    });
  };

  updateTaskInput = e => {
    const taskId = e.target.closest("li").id;
    const text = e.target.value;
    this.setState(currentState => {
      const currentTasks = currentState.tasks;
      const taskIndex = currentState.tasks
        .map(function(task) {
          return task.id;
        })
        .indexOf(taskId);
      currentTasks[taskIndex].text = text;
      return {
        tasks: currentTasks
      };
    });
  };

  handleDeleteTask = text => {
    this.setState(currentState => {
      return {
        tasks: currentState.tasks.filter(task => task.text !== text)
      };
    });
  };

  handleDeleteAllTasks = () => {
    this.setState(currentState => {
      return {
        tasks: currentState.tasks.filter(task => task.active === true)
      };
    });
  };

  submitTask = e => {
    e.preventDefault();
    const text = this.state.input.trim();
    if (this.state.tasks && text !== "") {
      this.setState({
        input: "",
        tasks: this.state.tasks.concat([
          {
            text,
            active: true,
            id: uuidv4()
          }
        ])
      });
    } else if (text !== "") {
      this.setState({
        input: "",
        tasks: [
          {
            text,
            active: true,
            id: uuidv4()
          }
        ]
      });
    }
  };

  //toggle the active value of a task and sets it back into it's original array index before setting state
  handleToggleTask = taskId => {
    this.setState(currentState => {
      const currentTasks = currentState.tasks;
      const taskIndex = currentState.tasks
        .map(function(task) {
          return task.id;
        })
        .indexOf(taskId);
      currentTasks[taskIndex].active = !currentTasks[taskIndex].active;
      return {
        tasks: currentTasks
      };
    });
  };

  getInactiveCount = () => {
    let inactiveCounter = 0;
    this.state.tasks.forEach(task => {
      if (!task.active) {
        inactiveCounter++;
      }
    });
    return inactiveCounter;
  };

  handleToggleAll = () => {
    //TODO: create function to count number of active/inactive
    const inactiveCount = this.getInactiveCount();
    const tasks = this.state.tasks;
    const setActive = () => {
      return inactiveCount === tasks.length ? true : false;
    };

    this.setState(currentState => {
      const currentTasks = currentState.tasks;
      currentTasks.forEach(task => {
        task.active = setActive();
      });
      return {
        tasks: currentTasks
      };
    });
  };

  render() {
    return (
      <div>
        <div className="main" style={{ margin: "auto" }}>
          <div className="tasks_container">
            <h1 style={{ textAlign: "center" }}>{this.props.taskInfo.name}</h1>
            <div>
              <Navigation
                submitTask={this.submitTask}
                updateInput={this.updateInput}
                inputValue={this.state.input}
                handleToggleAll={this.handleToggleAll}
                handleDeleteAll={this.handleDeleteAllTasks}
              />
            </div>
            <TaskList
              tasks={this.state.tasks}
              updateTask={this.updateTaskInput}
              onToggleTask={this.handleToggleTask}
              onRemoveTask={this.handleDeleteTask}
              onFocusTask={this.handleFocusTask}
            />
            <TaskDisplay focusedTask={this.state.focusedTask} />
          </div>
        </div>
      </div>
    );
  }
}
