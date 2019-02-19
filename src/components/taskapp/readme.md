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
[ ] filter tasks by name
  [ ] utilize router to load filtered state
[ ] export saved file
[ ] architect ability to add additional datasets without affecting previous notes
  [ ] create default variable type if doesn't exist (i.e array, object)
[+] calculate hours per day
  [ ] filter tasks by day
  [ ] filter hours by activity
[ ] bar chart for hour allocation
[ ] handle delete tag
[x] add react-json-tree to view all data per task for development purposes
[ ] handle percent complete
  [ ] assign percentage based on subtasks
    [ ] segment out percentage to related subtasks on hover
[ ] allow adding of time associated with tasks/sub-tasks
  [ ] filter by time of sub-tasks
[ ] validation to check if task name exists already
[ ] hours calculations
[ ] Add testing framework
  [x] total hours
    [x] include array with hours and timestamps
[x] save data to server *(utilizing node fs)*
    [x] throttle post request, currently fires on every componentDidUpdate and causes server error since file write takes time

[x] handle add hours
[x] highlight active task in sidepanel
[ ] determine when/if necessary to use functional set state of 'currentState' vs simply this.setState
[ ] refactor name of 'tasks' to 'subTasks' so we can clearly differentiate between taskList and tasks
[ ] refactor tasks under taskList
  [ ] check that components are taking correct props after refactor
[ ] Filters --> All, Active, Completed
[x] utilize sidePanel to control active task
[x] figure out where to store state --> move all back to taskApp?
[x] Move individual components into module exports
[x] Make content editable
  [ ] Make editable text area vs simple input field
[x] Added in richTextEditor TinyMce
    [ ] Finesse onChange event, currently unreliably changes and can cause onchange event to update task
    [ ] Need to properly parse out getContent from TinyMce component,
        'enter keys' are not parsing correctly due to additional <p> tags
[x] Add Task
  [ ] create nested-tasks
 [ ] Add additional fields to form field
 [x] Input Validation
   [ ] More robust input check than just checking for " "
[x] Toggle task
[x] Toggle all tasks
[x] Delete task
[x] Delete all inactive task
[ ] Move to 'recycle'
[ ] Permanently remove
[ ] React Router Filters
[x] Utilize local storage
[ ] Separate namespace for each task
[x] Utilize database storage
[x] Add scrollable

Backlog:
[x] log hours to tasks
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
