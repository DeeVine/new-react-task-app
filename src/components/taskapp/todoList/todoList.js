import React from "react";
import "./todoList.css";

//add start, stop to todoList objects
//add completed section

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todoList: [
        {
          todoName: "todo1",
          completed: false
        },
        {
          todoName: "todo2",
          completed: true
        },
        {
          todoName: "todo3",
          completed: false
        }
      ]
    };
  }

  completedStyle = {};

  toggleCheckbox = todoName => {
    const todoList = this.state.todoList;
    const index = todoList
      .map(todo => {
        return todo.todoName;
      })
      .indexOf(todoName);
    todoList[index].completed = !todoList[index].completed;
    this.setState({
      todoList
    });
  };

  render() {
    return (
      <div className="todo-list-container">
        <div className="todo-list-incomplete-container">
          <h5>Incomplete</h5>
          <ul className="todo-list-ul">
            {this.state.todoList.map(todo => {
              if (!todo.completed) {
                return (
                  <li key={todo.todoName} className="todo-item">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onClick={() => this.toggleCheckbox(todo.todoName)}
                      readOnly={true}
                    />
                    {todo.todoName}
                  </li>
                );
              } else {
                return null;
              }
            })}
          </ul>
        </div>
        <div className="todo-list-completed-container">
          <h5>Completed</h5>
          <ul className="todo-list-ul">
            {this.state.todoList.map(todo => {
              if (todo.completed) {
                return (
                  <li key={todo.todoName} className="todo-item">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onClick={() => this.toggleCheckbox(todo.todoName)}
                      readOnly={true}
                    />
                    <span className="completed-todo">{todo.todoName}</span>
                  </li>
                );
              } else {
                return null;
              }
            })}
          </ul>
        </div>
      </div>
    );
  }
}
