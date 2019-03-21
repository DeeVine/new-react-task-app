import React from "react";

const Navigation = props => {
  return (
    <nav className="task-navigation-container">
      <h3>Navigation</h3>
      <div className="task-navigation-form">
        <form onSubmit={props.handleCreateSubTask}>
          <input
            onChange={props.updateSubTaskInput}
            id="task-text"
            value={props.subTaskInput}
            placeholder="add a subtask"
          />
          <input type="submit" value="Add Subtask" />
        </form>
        <form onSubmit={props.handleCreateNewTag(props.taskInfo.taskName)}>
          <input
            onChange={props.updateTagInput}
            id="add-tag"
            value={props.tagInput}
            placeholder="Add a tag"
          />
          <input type="submit" value="Add Tag" />
        </form>
        <form onSubmit={props.handleAddHours(props.taskInfo.taskName)}>
          <input
            onChange={props.updateHoursInput}
            id="add-hours"
            value={props.appState.hoursInput}
            placeholder="Add Hours"
          />
          <input type="submit" value="Add Hours" />
        </form>
        <form onSubmit={props.handleAddNote(props.taskInfo.taskName)}>
          <input
            onChange={props.updateAddNoteInput}
            id="add-note"
            value={props.appState.addNoteInput}
            placeholder="Add Note"
          />
          <input type="submit" />
        </form>
      </div>
      <div className="task-navigation-buttons">
        <button onClick={props.handleToggleAll}>Toggle All</button>
        <button onClick={props.handleDeleteAll}>Delete All</button>
        <button onClick={props.handleDeleteTaskApp}>Delete Task</button>
      </div>
    </nav>
  );
};

export default Navigation;
