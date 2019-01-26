MVP:
**Create task/goal --> Add sub tasks/goals**
**Log time on tasks**
**Tag tasks**
**Search tasks based on tags**

IDEAS:
*subtasks should/could be tasks/links/notes/goals*

DEBUG:
[ ] find out why sidepanel rerenders due to 'sidePanelFocus' click handler

TODO:
[ ] hours calculations
  [ ] attach date/time to hours
  [ ] put times into chartable format utilizing moment.js
[ ] handle delete tag
[ ] handle add hours
[ ] highlight active task in sidepanel
[ ] determine when/if necessary to use functional set state of 'currentState' vs simply this.setState
[ ] refactor name of 'tasks' to 'subTasks' so we can clearly differentiate between taskList and tasks
[ ] refactor tasks under taskList
  [ ] check that components are taking correct props after refactor
[ ] add delete button to tags
[ ] utilize sidePanel to control active task
[ ] figure out where to store state --> move all back to taskApp?
[ ] validation to check if task name exists already
[ ] Add testing framework
[x] Move individual components into module exports
[x] Make content editable
  [ ] Make editable text area vs simple input field
[x] Add Task
  [create nested-tasks]
 [ ] Add additional fields to form field
 [x] Input Validation
   [ ] More robust input check than just checking for " "
[x] Toggle task
[ ] Filters --> All, Active, Completed
[x] Toggle all tasks
[x] Delete task
[x] Delete all inactive task
[ ] Move to 'recycle'
[ ] Permanently remove
[ ] React Router Filters
[x] Utilize local storage
[ ] Separate namespace for each task
[ ] Utilize database storage
[x] Add scrollable

Backlog:
[ ] log hours to tasks
[ ] Timestamp last edit
[ ] tag tasks
  [ ] add notifications for timers*
[ ] add timer to tasks
[ ] Implement hi-charts/d3 to visualize data (hours spent, categories)
[ ] Setup sql database

Optimizations:
[ ] refactor 'taskInfo' to be more idiomatic
[ ] refactor individual state items into passing one state variable

Ideas/Advanced features:
[ ] Searchable/sortable categories/tags
[ ] Category ideas --> Review rescue time breakdowns. Entertainment, reading, active learning, passive learning, fitness, exercise, food
  [ ] track mood/emotion --> productive, tired, sad, focused, creative, frustrated
[ ] Allow drag drop ui
[ ] Hi-charts, D3 visualization
