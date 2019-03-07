MVP:
**Create task/goal --> Add sub tasks/goals**
**Log time on tasks**
**Tag tasks**
**Search tasks based on tags**

IDEAS:
*subtasks should/could be tasks/links/notes/goals*

TODO:
[x] fix issue of 'id with spaces'
[ ] timer to reset value on 'stop'
[ ] timer to take on proper current time on page refresh --> calculate current time based on 'start time' and 'time now'
[ ] apply flexbox to timerTask
[ ] display tasks in toggle format
  [x] total hours for tasks
  [x] collapsable time events like toggl
    [x] delete time event
    [ ] add tags to events
      [ ] adjust popover to close on focus change
    [ ] add notes to events
  [ ] group events by date
  [ ] chart out events activity by date
[x] handleAddHours should check if taskName exists in taskList, else create a newTask and then add hours
[ ] view report of hours per task for specific date(s)
  [ ] comparison report of days
    [ ] today vs yesterday
    [ ] clickable calendar to select comparison ranges
[ ] ability to update/modify hour entries
[ ] last updated should change every time task is modified/added to
[ ] implement timer vs manual mode
[+] filter tasks by name
  [ ] utilize router to load filtered state
  [ ] use regex/fuzzysearch so 'exact' taskName isn't required'
[ ] export saved file
[ ] architect ability to add additional datasets without affecting previous notes
  [ ] create default variable type if doesn't exist (i.e array, object)
[+] calculate hours per day
  [ ] filter tasks by day
  [ ] filter hours by activity
**[x] Added in richTextEditor TinyMce**
    [ ] current buggy enter button, fix or try draft.js
    [ ] Finesse onChange event, currently unreliably changes and can cause onchange event to update task
    [ ] Need to properly parse out getContent from TinyMce component,
        'enter keys' are not parsing correctly due to additional <p> tags
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
[x] Add Task
  [ ] create nested-tasks
 [ ] Add additional fields to form field
 [x] Input Validation
   [ ] More robust input check than just checking for " "
[ ] Move to 'recycle'
[ ] Permanently remove
[ ] React Router Filters
[x] save data to server *(utilizing node fs)*
    [x] throttle post request, currently fires on every componentDidUpdate and causes server error since file write takes time
[x] handle add hours
[x] highlight active task in sidepanel
[x] Separate namespace for each task
[x] Utilize local storage
[x] Toggle task
[x] Toggle all tasks
[x] Delete task
[x] Delete all inactive task
[x] Utilize database storage
[x] Add scrollable
[x] calculate hours difference from start and end utilizing miliseconds conversion valueOf()

Backlog:
[x] log hours to tasks
[ ] animations
[ ] Timestamp last edit
[ ] tag tasks
  [ ] add notifications for timers*
[ ] add timer to tasks
[ ] Implement hi-charts/d3 to visualize data (hours spent, categories)
[ ] Setup sql database

DEBUG:
[ ] find out why sidepanel rerenders due to 'sidePanelFocus' click handler
[ ] cannot store moment objects in localStorage or fsFile --> moment object somehow converts to string date

Optimizations:
[ ] refactor 'taskInfo' to be more idiomatic
[ ] refactor individual state items into passing one state variable

Ideas/Advanced features:
[ ] Searchable/sortable categories/tags
[ ] Category ideas --> Review rescue time breakdowns. Entertainment, reading, active learning, passive learning, fitness, exercise, food
  [ ] track mood/emotion --> productive, tired, sad, focused, creative, frustrated
[ ] Allow drag drop ui
[ ] Hi-charts, D3 visualization
