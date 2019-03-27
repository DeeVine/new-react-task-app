MVP:
**Create task/goal --> Add sub tasks/goals**
**Log time on tasks**
**Tag tasks**
**Search tasks based on tags**

IDEAS:
_subtasks should/could be tasks/links/notes/goals_
_quick tips/notes in top navigation_
_productive fun --> 'look up hiking trails, workout, play/listen to music, talk to a friend'_

_Daily report/summary_

Launch Items:
[ ] deploy to heroku  
[ ] save/export data file

High level secondary:
[ ] user login to load/save data

TODO:
_//
[ ] handle rerendering after deleteHoursLog --> issue relates to timeList.js key={task.taskName+'-'+task.hoursLog.length}
[ ] add bulk edit/deletion
[ ] time format options
//_

Bugs:
[ ] edit time through DTP component doesn't take seconds
[x] parent total time not updating on DTP change

[+] implement calendar api for times
[ ] implement function to update times from DateTimePicker
[ ] fix z-index
**[ ] work on modifyHoursLog**
[ ] update tags to include number of tags or display first few tags (i.e 'coding, fun, +7 more')
[ ] convert taskNames to editable input
[ ] button to 'show more/show older' than 10 items
[x] move task-nav to it's own component
[ ] add menu button to top nav
[ ] implement timer vs manual mode
[ ] refactor index search to be DRY
[ ] styling
[ ] horizontal space usage [css][ ] navigation/header
[ ] Filters
[ ] by date
[ ] by Tags
[ ] filter by tasks _refactor main component function into timer.js_

[ ] implement 'dev' (save my data for real use) vs 'production'
[+] make dropdown in navigation
[ ] update to relevant content in dropdown
[ ] add option to rate tags 1-5
[ ] add tag percentages (calculate number of milliseconds from the respective time log)
[ ] implement function to update tag rating --> may need to change tags into object {tagName: '', tagRating ''}
[ ] implement 'auto-complete' recommendations based on existing tags
[ ] check if child tags are new and push to parent task
[ ] 'all time tags' at top level for search/recommendations
[ ] sort recommendations by most 'used'
[ ] resolve moment deprecation warning
[ ] 'settings options' such as time format, time events open/closed on page load
[ ] create top nav / basic webapp UI layout
[ ] create todolist, optional checkoff/apply of todoitem in 'what are you working on'

[ ] toggle draft js from note icons
[ ] load/save state for each note (https://hashnode.com/post/what-is-the-recommended-way-of-storing-the-content-from-draftjs-in-a-database-cj2zw3sxn002uelk8k9sr51xe)
[ ] saved state must be contained in parent component
[x] add optional tag field next to timer inputde
[ ] 'favorite' / 'bulk' add tags
[ ] list of premade tasks/activities
[ ] delete parent task menu
[ ] update editable field to inputs
[ ] create 'break' option
[ ] should add a break to current in progress event
[x] handle editing time
[x] apply tags to individual hoursLog
[x] fix issue of 'id with spaces'
[ ] bulk edit/removal for tags
[ ] timer to reset value on 'stop'
[ ] timer to take on proper current time on page refresh --> calculate current time based on 'start time' and 'time now'

[ ] display tasks in toggle format
[x] total hours for tasks
[x] collapsable time events like toggl
[x] delete time event

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
[x] adjust popover to close on focus change
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
[x] save data to server _(utilizing node fs)_
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
[+] add tags to events
[x] create tag component to display tags in tagMenu
[x] handle tag deletion
[x] apply flexbox to timerTask
[x] add days column to time

Backlog:
[x] log hours to tasks
[ ] add custom confirm dialogs for things such as task deletion
[ ] animations
[ ] Timestamp last edit
[ ] tag tasks
[ ] add notifications for timers\*
[ ] add timer to tasks
[ ] Implement hi-charts/d3 to visualize data (hours spent, categories)
[ ] Setup sql database

DEBUG:
[ ] find out why sidepanel rerenders due to 'sidePanelFocus' click handler
[ ] cannot store moment objects in localStorage or fsFile --> moment object somehow converts to string date

Optimizations:
[ ] review/refactor folder/filing system of application
[ ] refactor 'taskInfo' to be more idiomatic
[ ] refactor individual state items into passing one state variable

Ideas/Advanced features:
[ ] Searchable/sortable categories/tags
[ ] Category ideas --> Review rescue time breakdowns. Entertainment, reading, active learning, passive learning, fitness, exercise, food
[ ] track mood/emotion --> productive, tired, sad, focused, creative, frustrated
[ ] Allow drag drop ui
[ ] Hi-charts, D3 visualization
