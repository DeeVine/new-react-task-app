(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{194:function(t,e,a){},209:function(t,e,a){t.exports=a(497)},214:function(t,e,a){},314:function(t,e,a){},428:function(t,e,a){},476:function(t,e,a){},497:function(t,e,a){"use strict";a.r(e);var n=a(1),s=a.n(n),r=a(22),o=a.n(r),i=(a(214),a(10)),l=a(11),u=a(13),c=a(12),d=a(14),p=a(44),m=a(499),g=a(500),k=a(501),h=a(502),f=function(t){function e(t){var a;return Object(i.a)(this,e),(a=Object(u.a)(this,Object(c.a)(e).call(this,t))).toggle=function(){a.setState({dropdownOpen:!a.state.dropdownOpen})},a.clickable=function(t){var e=t.target.value;a.setState({number:e})},a.toggleNavbar=a.toggleNavbar.bind(Object(p.a)(Object(p.a)(a))),a.state={collapsed:!0,dropdownOpen:!1,number:""},a}return Object(d.a)(e,t),Object(l.a)(e,[{key:"toggleNavbar",value:function(){this.setState({collapsed:!this.state.collapsed})}},{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement(m.a,{color:"faded",light:!0,expand:"md"},s.a.createElement(g.a,{href:"/",className:"mr-auto"},"ReactTrackerApp"),s.a.createElement(k.a,{onClick:this.toggleNavbar,className:"mr-2"}),s.a.createElement(h.a,{isOpen:!this.state.collapsed,navbar:!0})))}}]),e}(s.a.Component),T=a(46),v=(a(314),s.a.Component,{CODE:{backgroundColor:"rgba(0, 0, 0, 0.05)",fontFamily:'"Inconsolata", "Menlo", "Consolas", monospace',fontSize:16,padding:2}});function L(t){switch(t.getType()){case"blockquote":return"RichEditor-blockquote";default:return null}}var b=function(t){function e(){var t;return Object(i.a)(this,e),(t=Object(u.a)(this,Object(c.a)(e).call(this))).onToggle=function(e){e.preventDefault(),t.props.onToggle(t.props.style)},t}return Object(d.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){var t="RichEditor-styleButton";return this.props.active&&(t+=" RichEditor-activeButton"),s.a.createElement("span",{className:t,onMouseDown:this.onToggle},this.props.label)}}]),e}(s.a.Component),E=[{label:"H1",style:"header-one"},{label:"H2",style:"header-two"},{label:"H3",style:"header-three"},{label:"H4",style:"header-four"},{label:"H5",style:"header-five"},{label:"H6",style:"header-six"},{label:"Blockquote",style:"blockquote"},{label:"UL",style:"unordered-list-item"},{label:"OL",style:"ordered-list-item"},{label:"Code Block",style:"code-block"}],N=function(t){var e=t.editorState,a=e.getSelection(),n=e.getCurrentContent().getBlockForKey(a.getStartKey()).getType();return s.a.createElement("div",{className:"RichEditor-controls"},E.map(function(e){return s.a.createElement(b,{key:e.label,active:e.style===n,label:e.label,onToggle:t.onToggle,style:e.style})}))},O=[{label:"Bold",style:"BOLD"},{label:"Italic",style:"ITALIC"},{label:"Underline",style:"UNDERLINE"},{label:"Monospace",style:"CODE"}],I=function(t){var e=t.editorState.getCurrentInlineStyle();return s.a.createElement("div",{className:"RichEditor-controls"},O.map(function(a){return s.a.createElement(b,{key:a.label,active:e.has(a.style),label:a.label,onToggle:t.onToggle,style:a.style})}))},S=a(518),y=function(t){var e=t.task;return s.a.createElement("div",{className:"task-item "+t.className,onClick:t.sidePanelFocus,"data-sidepanelid":e.taskName},s.a.createElement("div",{className:"task-item-content"},s.a.createElement("div",{className:"task-item-title"},e.taskName),s.a.createElement("div",{className:"task-item-summary"},"Content Summary Goes Here"),s.a.createElement(S.a,null,s.a.createElement(S.a,{className:"task-item-percent-complete",bsStyle:"info",now:parseInt(e.percentComplete)})),s.a.createElement("div",null,e.hours," hours"),s.a.createElement("div",{className:"task-item-updated-date"},e.lastUpdated)))},C=a(503),H=a(504),w=a(505),j=a(506),x=function(t){function e(t){var a;return Object(i.a)(this,e),(a=Object(u.a)(this,Object(c.a)(e).call(this,t))).toggle=function(){a.setState(function(t){return{dropdownOpen:!t.dropdownOpen}})},a.state={dropdownOpen:!1},a}return Object(d.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){var t=this;return s.a.createElement(C.a,{isOpen:this.state.dropdownOpen,toggle:this.toggle},s.a.createElement(H.a,{caret:!0},"Dropdown"),s.a.createElement(w.a,null,s.a.createElement(j.a,{header:!0},"Header"),s.a.createElement(j.a,{onClick:function(){return t.props.sortFilter("ascending")}},"Sort Ascending"),s.a.createElement(j.a,{disabled:!0},"Action (disabled)"),s.a.createElement(j.a,{divider:!0}),s.a.createElement(j.a,{onClick:function(){return t.props.sortFilter("descending")}},"Sort Descending"),s.a.createElement(j.a,null,"Bar Action"),s.a.createElement(j.a,null,"Quo Action")))}}]),e}(s.a.Component),A=function(t){return s.a.createElement("nav",{className:"task-navigation-container"},s.a.createElement("h3",null,"Navigation"),s.a.createElement("div",{className:"task-navigation-form"},s.a.createElement("form",{onSubmit:t.handleCreateSubTask},s.a.createElement("input",{onChange:t.updateSubTaskInput,id:"task-text",value:t.subTaskInput,placeholder:"add a subtask"}),s.a.createElement("input",{type:"submit",value:"Add Subtask"})),s.a.createElement("form",{onSubmit:t.handleCreateNewTag(t.taskInfo.taskName)},s.a.createElement("input",{onChange:t.updateTagInput,id:"add-tag",value:t.tagInput,placeholder:"Add a tag"}),s.a.createElement("input",{type:"submit",value:"Add Tag"})),s.a.createElement("form",{onSubmit:t.handleAddHours(t.taskInfo.taskName)},s.a.createElement("input",{onChange:t.updateHoursInput,id:"add-hours",value:t.appState.hoursInput,placeholder:"Add Hours"}),s.a.createElement("input",{type:"submit",value:"Add Hours"})),s.a.createElement("form",{onSubmit:t.handleAddNote(t.taskInfo.taskName)},s.a.createElement("input",{onChange:t.updateAddNoteInput,id:"add-note",value:t.appState.addNoteInput,placeholder:"Add Note"}),s.a.createElement("input",{type:"submit"}))),s.a.createElement("div",{className:"task-navigation-buttons"},s.a.createElement("button",{onClick:t.handleToggleAll},"Toggle All"),s.a.createElement("button",{onClick:t.handleDeleteAll},"Delete All"),s.a.createElement("button",{onClick:t.handleDeleteTaskApp},"Delete Task")))},D=function(t){return t.tasks?s.a.createElement("div",{className:"tasks_list"},s.a.createElement("ul",null,t.tasks.map(function(e){return s.a.createElement("li",{className:!0===e.active?"task_active":"task_inactive",key:e.id,id:e.id},s.a.createElement("input",{readOnly:!0,type:"checkbox",checked:!e.active,onClick:function(){return t.onToggleTask(e.id)}}),s.a.createElement("input",{onChange:t.updateTaskInput,value:e.text,onFocus:t.handleFocusTask}),s.a.createElement("button",{onClick:function(){return t.handleDeleteSubTask(e.text)}},"Delete"))}))):s.a.createElement("div",null,"No TaskList")},F=a(176),P=function(t){return s.a.createElement("div",{className:"task_display"},s.a.createElement("h4",null,"Display"),s.a.createElement("span",null,t.tags?t.tags.map(function(t){return s.a.createElement("button",{key:F()},t)}):"no tags"),s.a.createElement("span",null,t.focusedTask.text))},M=a(207),U=function(t){function e(){var t,a;Object(i.a)(this,e);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(u.a)(this,(t=Object(c.a)(e)).call.apply(t,[this].concat(s)))).handleEditorChange=function(t){var e=t.target.getContent(),n=a.props.taskInfo.taskName;a.props.handleUpdateTextEditor(n,e)},a}return Object(d.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){return s.a.createElement(M.a,{value:this.props.textEditorPrimaryContent,init:{plugins:"link image code",toolbar:"undo redo | bold italic | alignleft aligncenter alignright | code"},onChange:this.handleEditorChange})}}]),e}(s.a.Component),B=a(507),_=a(508),R=a(131),z=a.n(R),q=function(t){function e(t){var a;return Object(i.a)(this,e),(a=Object(u.a)(this,Object(c.a)(e).call(this,t))).componentDidMount=function(){},a.componentDidUpdate=function(){},a.state={input:"",tagInput:"",focusedTask:{},tasks:[]},a}return Object(d.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){return s.a.createElement(B.a,{className:"tasks_container"},s.a.createElement("input",{onChange:this.props.updateTaskTitle,id:"task-text",value:this.props.taskInfo.taskName,placeholder:"add a subtask"}),s.a.createElement(_.a,null,s.a.createElement(A,{appState:this.props.appState,taskInfo:this.props.taskInfo,tagInput:this.props.tagInput,updateTagInput:this.props.updateTagInput,handleCreateSubTask:this.props.handleCreateSubTask,subTaskInput:this.props.subTaskInput,updateSubTaskInput:this.props.updateSubTaskInput,handleToggleAll:this.props.handleToggleAll,handleDeleteAll:this.props.handleDeleteAllTasks,handleDeleteTaskApp:this.props.handleDeleteTaskApp,handleCreateNewTag:this.props.handleCreateNewTag,hoursInput:this.props.hoursInput,updateHoursInput:this.props.updateHoursInput,handleAddHours:this.props.handleAddHours,updateAddNoteInput:this.props.updateAddNoteInput,handleAddNote:this.props.handleAddNote})),s.a.createElement(_.a,null,s.a.createElement(z.a,{data:this.props.taskInfo,shouldExpandNode:function(){return!1}})),s.a.createElement(_.a,null,s.a.createElement(U,{taskInfo:this.props.taskInfo,textEditorContent:this.props.appState.textEditorContentTest,handleUpdateTextEditor:this.props.handleUpdateTextEditor,textEditorPrimaryContent:this.props.textEditorContent})),s.a.createElement(_.a,null,s.a.createElement(P,{focusedTask:this.props.focusedTask,tags:this.props.taskInfo.tags})),s.a.createElement(_.a,null,s.a.createElement("h4",null,"Subtasks"),s.a.createElement(D,{tasks:this.props.tasks,updateTaskInput:this.props.updateTaskInput,onToggleTask:this.props.handleToggleTask,handleDeleteSubTask:this.props.handleDeleteSubTask,handleFocusTask:this.props.handleFocusTask})))}}]),e}(s.a.Component),J=a(6),G=a.n(J),K=a(516),Q=a(510),W=a(511),$=(a(428),a(509)),V=function(t){function e(t){var a;return Object(i.a)(this,e),(a=Object(u.a)(this,Object(c.a)(e).call(this,t))).toggle=function(){a.setState({dropdownOpen:!a.state.dropdownOpen})},a.clickable=function(t){console.log("e.target.value",t.target.value);var e=t.target.value;a.setState({number:e,dropdownOpen:!a.state.dropdownOpen})},a.toggleNavbar=a.toggleNavbar.bind(Object(p.a)(Object(p.a)(a))),a.state={collapsed:!0,dropdownOpen:!1,number:""},a}return Object(d.a)(e,t),Object(l.a)(e,[{key:"toggleNavbar",value:function(){this.setState({collapsed:!this.state.collapsed})}},{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement(C.a,{isOpen:this.state.dropdownOpen,size:"sm",toggle:this.toggle},s.a.createElement(H.a,{tag:"span",onClick:this.toggle,"data-toggle":"dropdown","aria-expanded":this.state.dropdownOpen},s.a.createElement($.a,{color:"success"},this.props.dropdownName)),s.a.createElement(w.a,null,s.a.createElement("ul",{className:"tag-ratings-dropdown"},s.a.createElement("li",{onClick:this.clickable,value:1},"1"),s.a.createElement("li",{onClick:this.clickable,value:2},"2"),s.a.createElement("li",{onClick:this.clickable,value:3},"3"),s.a.createElement("li",{onClick:this.clickable,value:4},"4"),s.a.createElement("li",{onClick:this.clickable,value:5},"5")))))}}]),e}(s.a.Component),X=function(t){function e(t){var a;return Object(i.a)(this,e),(a=Object(u.a)(this,Object(c.a)(e).call(this,t))).componentDidMount=function(){},a.componentDidUpdate=function(){},a.handleCreate=function(t,e,n){return function(s){s.preventDefault(),""!==e?(a.props.createNewTag(t,e,n),a.setState({tagInput:""})):alert("please input a tag")}},a.handleDelete=function(t,e,n){return function(s){s.preventDefault(),a.props.deleteHoursLogTag(t,e,n)}},a.updateTagInput=function(t){var e=t.target.value;a.setState({tagInput:e})},a.toggle=function(){a.setState(function(t){return{popoverOpen:!t.popoverOpen}})},a.generatePopoverId=function(){return"Popover-"+a.props.taskName.split(" ").join("-")+"-"+G()(a.props.startTime).valueOf()},a.state={popoverOpen:!1,tagInput:""},a}return Object(d.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){var t=this;return s.a.createElement(s.a.Fragment,null,s.a.createElement("i",{className:this.props.tags.length>0?"fas fa-tags tags-active mr-2":"fas fa-tag tags-inactive mr-2",id:this.generatePopoverId()}),s.a.createElement(K.a,{trigger:"legacy",placement:"left",target:this.generatePopoverId()},s.a.createElement(Q.a,null,"Tags"),s.a.createElement(W.a,{className:"tags-popover-body"},s.a.createElement("form",{onSubmit:this.handleCreate(this.props.taskName,this.state.tagInput,this.props.index)},s.a.createElement("input",{onChange:this.updateTagInput,placeholder:"add/filter tags",value:this.state.tagInput}),s.a.createElement("input",{type:"submit",value:"submit"})),"undefined"!==typeof this.props.tags?this.props.tags.map(function(e){return s.a.createElement("div",{className:"tag-menu-badge",key:"tag-badge-"+e},s.a.createElement(V,{dropdownName:e}),s.a.createElement("i",{className:"fas fa-times ml-1",onClick:t.handleDelete(t.props.taskName,e,t.props.index)}))}):null)))}}]),e}(s.a.Component),Y=function(t){function e(t){var a;return Object(i.a)(this,e),(a=Object(u.a)(this,Object(c.a)(e).call(this,t))).toggle=function(){a.setState({dropdownOpen:!a.state.dropdownOpen})},a.handleDeleteHoursLog=function(){a.props.deleteHoursLog(a.props.taskName,a.props.startTime)},a.state={dropdownOpen:!1},a}return Object(d.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){return s.a.createElement(C.a,{isOpen:this.state.dropdownOpen,size:"sm",toggle:this.toggle},s.a.createElement(H.a,{tag:"span",onClick:this.toggle,"data-toggle":"dropdown","aria-expanded":this.state.dropdownOpen},s.a.createElement("i",{className:"fas fa-ellipsis-v"})),s.a.createElement(w.a,null,s.a.createElement(j.a,{onClick:this.handleDeleteHoursLog},"Delete Time")))}}]),e}(s.a.Component),Z=a(134),tt=a.n(Z),et=a(330),at=function(t){function e(){var t,a;Object(i.a)(this,e);for(var n=arguments.length,s=new Array(n),r=0;r<n;r++)s[r]=arguments[r];return(a=Object(u.a)(this,(t=Object(c.a)(e)).call.apply(t,[this].concat(s)))).state={startTime:"",stopTime:""},a.componentDidMount=function(){a.setState({startTime:a.props.startTime._i,stopTime:a.props.stopTime._i})},a.modifyHoursLog=function(){var t={startTime:a.state.startTime,stopTime:a.state.stopTime};a.props.modifyHoursLog(a.props.taskName,t,a.props.index)},a.changeStartTime=function(t){a.setState({startTime:G()(t).format()})},a.changeStopTime=function(t){a.setState({stopTime:G()(t).format()})},a}return Object(d.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){return s.a.createElement("div",{className:"dtp-picker"},s.a.createElement(tt.a,{isCalendarOpen:!1,calendarIcon:null,clearIcon:null,disableClock:!0,onChange:this.changeStartTime,value:this.props.startTime._d}),s.a.createElement(tt.a,{isCalendarOpen:!1,calendarIcon:null,clearIcon:null,disableClock:!0,onChange:this.changeStopTime,value:this.props.stopTime._d}),s.a.createElement(et.a,{size:"sm",onClick:this.modifyHoursLog},"update time"))}}]),e}(n.Component),nt=function(t){var e=t.log,a=t.index,n=t.task,r=G()(e.startTime),o=G()(e.stopTime),i=t.convertMillisecondsToDigitalClock(o.valueOf()-r.valueOf());return s.a.createElement("li",{key:n.taskName+"-"+e.startTime,className:"timer-list-container"},s.a.createElement("div",{className:"time-section"},s.a.createElement("div",{className:"timer-list-tag-menu"},s.a.createElement(X,{taskName:n.taskName,tags:e.tags,startTime:r,index:a,createNewTag:t.createChildHoursLogTag,deleteHoursLogTag:t.deleteHoursLogTag})),s.a.createElement("div",{className:"time-container"},!0===t.timeEditable?s.a.createElement(at,{startTime:r,stopTime:o,taskName:n.taskName,index:a,modifyHoursLog:t.modifyHoursLog}):s.a.createElement("div",{onClick:t.retrieveComponentTime,className:"timer-list-start-end-time mr-2"},s.a.createElement("div",{className:"timer-list-start-time mr-1","data-value":r},r.format("lll")),"-",s.a.createElement("div",{className:"timer-list-stop-time ml-1","data-value":o},o.format("lll")))),s.a.createElement("div",{className:"total-time-seconds ml-2"},i),s.a.createElement("div",{className:"timer-task-dropdown ml-2"},s.a.createElement(Y,{taskName:n.taskName,startTime:e.startTime,deleteHoursLog:t.deleteHoursLog}))))},st={dateNow:function(){return(new Date).toISOString()},updateLocalStorage:function(t,e){localStorage.setItem(t,JSON.stringify(e))},retrieveTasksFromLocalStorage:function(t){return JSON.parse(localStorage.getItem(t))}},rt=function(t){function e(t){var a;return Object(i.a)(this,e),(a=Object(u.a)(this,Object(c.a)(e).call(this,t))).componentDidMount=function(){var t=st.retrieveTasksFromLocalStorage("timer-task-"+a.props.task.taskName);t&&a.setState({taskName:t.taskName,totalTime:a.totalTime(),isHidden:t.isHidden})},a.componentDidUpdate=function(){st.updateLocalStorage("timer-task-"+a.props.task.taskName,a.state)},a.toggleList=function(){a.setState({isHidden:!a.state.isHidden})},a.convertMillisecondsToDigitalClock=function(t){var e=Math.floor(t/36e5),a=Math.floor(t%36e5/6e4),n=Math.floor(t%36e4%6e4/1e3);return(e<10?"000"+e:e<100?"00"+e:e<1e3?"0"+e:e)+":"+(a<10?"0"+a:a)+":"+(n<10?"0"+n:n)},a.totalTime=function(){var t=a.props.task.hoursLog;if(t.length>0){var e=t.map(function(t){return G()(t.stopTime).valueOf()-G()(t.startTime).valueOf()}).reduce(function(t,e){return t+e});return a.convertMillisecondsToDigitalClock(e)}return"00:00:00"},a.hoursLogSortedDescending=function(){return a.props.task.hoursLog.sort(function(t,e){var a=G()(t.startTime).valueOf();return G()(e.stopTime).valueOf()-a}).slice(0,10)},a.retrieveComponentTime=function(t){var e=t.target.getAttribute("data-value"),n=G()(parseInt(e)).format("lll");a.setState({componentTime:n})},a.state={taskName:a.props.taskName,isHidden:!0,totalTime:a.totalTime(),componentTime:""},a}return Object(d.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){var t=this;return s.a.createElement("div",null,s.a.createElement("div",{className:"timer-task",id:"timer-"+this.props.task.taskName},s.a.createElement("div",{className:"timer-task-container"},s.a.createElement($.a,{className:"timer-task-badge mr-2",color:"info",onClick:this.toggleList},this.props.task.hoursLog.length),s.a.createElement("div",{className:"timer-task-taskname mr-2"},this.props.task.taskName),s.a.createElement("div",{className:"timer-task-totaltime mr-2"},this.state.totalTime?this.state.totalTime:""),s.a.createElement(X,{taskName:this.props.task.taskName,tags:this.props.task.tags,startTime:G()(this.props.task.lastUpdated),createNewTag:this.props.createParentHoursLogTag,deleteHoursLogTag:this.props.deleteParentHoursLogTag})),this.state.isHidden?"":s.a.createElement("ul",{className:"timer-task-ul"},this.hoursLogSortedDescending().map(function(e,a){return s.a.createElement(nt,{key:e.startTime,log:e,index:a,retrieveComponentTime:t.retrieveComponentTime,timeEditable:t.state.componentTime===G()(e.startTime).format("lll")||t.state.componentTime===G()(e.stopTime).format("lll"),convertMillisecondsToDigitalClock:t.convertMillisecondsToDigitalClock,task:t.props.task,modifyHoursLog:t.props.modifyHoursLog,createChildHoursLogTag:t.props.createChildHoursLogTag,deleteHoursLog:t.props.deleteHoursLog,deleteHoursLogTag:t.props.deleteHoursLogTag})}))))}}]),e}(s.a.Component),ot=function(t){function e(t){var a;return Object(i.a)(this,e),(a=Object(u.a)(this,Object(c.a)(e).call(this,t))).totalTimeMilliseconds=function(t){var e=t.hoursLog;if(e.length>0){return e.map(function(t){return G()(t.stopTime).valueOf()-G()(t.startTime).valueOf()}).reduce(function(t,e){return t+e})}},a.sortedTaskList=function(){return a.props.taskList.sort(function(t,e){return e.hoursLog.length-t.hoursLog.length})},a.state={},a}return Object(d.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){var t=this;return s.a.createElement(s.a.Fragment,null,this.sortedTaskList().map(function(e){return s.a.createElement("div",{className:"parent-timer-list-container",key:"timer-list-"+e.taskName},s.a.createElement(rt,{key:e.taskName+"-"+t.totalTimeMilliseconds(e),task:e,deleteHoursLog:t.props.deleteHoursLog,createChildHoursLogTag:t.props.createChildHoursLogTag,deleteHoursLogTag:t.props.deleteHoursLogTag,createParentHoursLogTag:t.props.createParentHoursLogTag,deleteParentHoursLogTag:t.props.deleteParentHoursLogTag,modifyHoursLog:t.props.modifyHoursLog}))}))}}]),e}(s.a.Component),it=(a(194),function(t){return s.a.createElement(s.a.Fragment,null,s.a.createElement("input",{className:"timer-nav-input mr-3",id:"working-on-input",onChange:t.updateInput,value:t.workingOnInput,placeholder:"What are you working on?"}),s.a.createElement("div",{className:"timer-nav-optional-tag mr-3"},s.a.createElement(X,{taskName:"tbd",tags:t.optionalTagArray,startTime:G()(1552537388945),createNewTag:t.createNewTag,deleteHoursLogTag:t.deleteHoursLogTag})),s.a.createElement("div",{className:"timer-nav-current-timer mr-3"},t.currentTimer.format("HH:mm:ss")),t.timeStarted?s.a.createElement(et.a,{className:"stop-timer-btn",size:"sm",onClick:t.stopTime,color:"danger"},"Stop"):s.a.createElement(et.a,{className:"start-timer-btn",size:"sm",onClick:t.startTime,color:"success"},"Start"))}),lt=a(512),ut=a(513),ct=a(514),dt=function(t){function e(t){var a;return Object(i.a)(this,e),(a=Object(u.a)(this,Object(c.a)(e).call(this,t))).componentDidMount=function(){var t=st.retrieveTasksFromLocalStorage("timer-data");if(t){var e=!!t.timeStarted&&t.timeStarted,n=t.workingOnInput,s=t.optionalTagArray,r=t.startTime,o=t.stopTime,i=t.currentTimer;a.setState({timeStarted:e,workingOnInput:n,optionalTagArray:s,startTime:r,stopTime:o,currentTimer:i?a.calculateCurrentTimer(G()(r)):G()().startOf("day")},function(){a.state.timeStarted&&(a.interval=window.setInterval(function(){a.setTimer()},1e3))})}},a.componentDidUpdate=function(){st.updateLocalStorage("timer-data",a.state)},a.calculateCurrentTimer=function(t){var e=(G()().valueOf()-t.valueOf())/1e3;return G()().startOf("day").add(e,"second")},a.createOptionalTags=function(t,e){a.setState(function(t){var a=t.optionalTagArray;if(!a.includes(e))return a.push(e),{optionalTagArray:a}})},a.deleteOptionalTagArray=function(t,e){a.setState(function(t){return{optionalTagArray:t.optionalTagArray.filter(function(t){return t!==e})}})},a.updateInput=function(t){var e=t.target.value;a.setState({workingOnInput:e})},a.toggleTimer=function(){a.setState(function(t){return{timeStarted:!t.timeStarted}})},a.setTimer=function(){a.setState(function(t){return{currentTimer:t.currentTimer.add(1,"second")}})},a.startTime=function(){a.state.workingOnInput?(a.toggleTimer(),a.setState({startTime:G()()}),a.interval=window.setInterval(function(){a.setTimer()},1e3)):alert("please enter task you are currently working on")},a.stopTime=function(){a.toggleTimer(),a.setState({stopTime:G()()},function(){a.props.addHoursLog(a.createTaskTimeObject())(),a.setState({},function(){window.clearInterval(a.interval),a.state.optionalTagArray.length>0&&a.pushTagsFromOptionalTagsArray(),a.setState({workingOnInput:"",optionalTagArray:[]})})})},a.pushTagsFromOptionalTagsArray=function(){var t=a.state.workingOnInput.trim(),e=a.props.taskList.find(function(e){return e.taskName===t}).hoursLog.length-1;a.state.optionalTagArray.map(function(n){return a.props.createChildHoursLogTag(t,n,e)})},a.createTaskTimeObject=function(){var t={taskName:a.state.workingOnInput.trim(),startTime:a.state.startTime,stopTime:a.state.stopTime};return a.setState({taskName:"",startTime:"",stopTime:"",currentTimer:G()().startOf("day")}),t},a.state={workingOnInput:"",optionalTagArray:[],timeStarted:"",startTime:"",stopTime:"",currentTimer:G()().startOf("day"),timer:""},a}return Object(d.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){return s.a.createElement(lt.a,{key:"timer1",className:"timer-grid",fluid:!0},s.a.createElement(ut.a,null,s.a.createElement(ct.a,{sm:12,className:"timer-nav_container"},s.a.createElement(it,{workingOnInput:this.state.workingOnInput,optionalTagArray:this.state.optionalTagArray,currentTimer:this.state.currentTimer,timeStarted:this.state.timeStarted,createNewTag:this.createOptionalTags,updateInput:this.updateInput,deleteHoursLogTag:this.deleteOptionalTagArray,startTime:this.startTime,stopTime:this.stopTime})),s.a.createElement(ct.a,{sm:12,className:"timer-time_container"},s.a.createElement(ot,{taskList:this.props.taskList,deleteHoursLog:this.props.deleteHoursLog,createChildHoursLogTag:this.props.createChildHoursLogTag,deleteHoursLogTag:this.props.deleteHoursLogTag,createParentHoursLogTag:this.props.createParentHoursLogTag,deleteParentHoursLogTag:this.props.deleteParentHoursLogTag,modifyHoursLog:this.props.modifyHoursLog}))))}}]),e}(s.a.Component),pt=(a(476),a(135)),mt=a.n(pt),gt=a(176),kt=function(t){function e(t){var a;return Object(i.a)(this,e),(a=Object(u.a)(this,Object(c.a)(e).call(this,t))).componentDidMount=function(){mt.a.get("/getfile").then(function(t){var e=t.data;a.setState({taskListIndex:0,taskList:e||[]})}).catch(function(t){console.log(t)})},a.componentDidUpdate=function(){mt.a.post("/updatefile",a.state.taskList).catch(function(t){console.log(t)})},a.toggleMainSection=function(t){t.preventDefault(),a.setState(function(t){return{toggleMainSection:!t.toggleMainSection}})},a.sortTaskList=function(t){a.setState(function(e){return{taskList:e.taskList.sort(function(e,a){var n=G()(e.lastUpdated).valueOf(),s=G()(a.lastUpdated).valueOf();return"ascending"===t?n-s:"descending"===t?s-n:n-s})}})},a.updateNewTaskInput=function(t){var e=t.target.value;a.setState({inputNewTask:e})},a.updateInputTaskFilter=function(t){var e=t.target.value;a.setState({inputTaskFilter:e})},a.createNewTask=function(t,e){a.setState(function(a){return{inputNewTask:"",taskList:a.taskList.concat([{taskName:t,taskId:gt(),tags:[],percentComplete:25,tasks:[],lastUpdated:st.dateNow(),hours:0,hoursLog:e?[e]:[],notes:[],textEditorContent:"Go ahead, write some notes"}])}})},a.handleCreateNewTask=function(t){t.preventDefault();var e=a.state.inputNewTask.trim();""!==e&&a.createNewTask(e)},a.updateTaskTitle=function(t){var e=t.target.value;a.setState(function(t){var a=t.taskListIndex,n=t.taskList;return n[a].taskName=e,{tasks:n}})},a.updateSubTaskInput=function(t){t.preventDefault();var e=t.target.value;a.setState({subTaskInput:e})},a.updateAddNoteInput=function(t){t.preventDefault();var e=t.target.value;a.setState({addNoteInput:e})},a.updateTaskInput=function(t){var e=t.target.closest("li").id,n=t.target.value;a.setState(function(t){var a=t.taskListIndex,s=t.taskList[a].tasks,r=s.map(function(t){return t.id}).indexOf(e);return s[r].text=n,{tasks:s}})},a.updateTagInput=function(t){var e=t.target.value;a.setState({tagInput:e})},a.updateHoursInput=function(t){var e=t.target.value;a.setState({hoursInput:e})},a.handleCreateSubTask=function(t){t.preventDefault();var e=a.state.subTaskInput.trim();if(""!==e){var n=a.state.taskListIndex,s=a.state.taskList,r=s[n].tasks.concat([{text:e,active:!0,id:gt()}]);s[n].tasks=r,a.setState({subTaskInput:"",taskList:s})}},a.handleAddNote=function(t){return function(t){t.preventDefault(),console.log("handleAddnote");var e=a.state.addNoteInput.trim();if(""!==e){var n={text:e,updated:st.dateNow()},s=a.state.taskListIndex,r=a.state.taskList,o=r[s].notes.concat([n]);r[s].notes=o,a.setState({addNoteInput:"",taskList:r})}}},a.findHoursLog=function(t,e,a){return t.find(function(t){return t.taskName===e}).hoursLog[a]},a.createChildHoursLogTag=function(t,e,n){a.setState(function(s){var r=a.findHoursLog(s.taskList,t,n);if("undefined"===typeof r.tags&&(r.tags=[]),!r.tags.includes(e))return r.tags.push(e),{tagInput:"",taskList:s.taskList}})},a.modifyHoursLog=function(t,e,n){var s=e.startTime,r=e.stopTime;a.setState(function(e){var o=a.findHoursLog(e.taskList,t,n);return o.startTime=s,o.stopTime=r,{tagInput:"",taskList:e.taskList}})},a.deleteHoursLogTag=function(t,e,n){a.setState(function(a){var s=a.taskList,r=s.find(function(e){return e.taskName===t}).hoursLog[n],o=r.tags.filter(function(t){return t!==e});return r.tags=o,{taskList:s}})},a.createParentHoursLogTag=function(t,e){a.setState(function(a){var n=a.taskList.find(function(e){return e.taskName===t});if("undefined"===typeof n.tags&&(n.tags=[]),!n.tags.includes(e))return n.tags.push(e),{tagInput:"",taskList:a.taskList}})},a.deleteParentHoursLogTag=function(t,e){a.setState(function(a){var n=a.taskList,s=n.find(function(e){return e.taskName===t}),r=s.tags.filter(function(t){return t!==e});return s.tags=r,{taskList:n}})},a.handleCreateNewTag=function(t){return function(e){e.preventDefault();var n=a.state.tagInput.trim();""!==n&&a.setState(function(e){var a=e.taskList,s=a.find(function(e){return e.taskName===t}),r=a.map(function(t){return t.taskName}).indexOf(s.taskName);return e.taskList[r].tags.push(n),{tagInput:"",taskList:e.taskList}})}},a.handleUpdateTextEditor=function(t,e){console.log("taskName",t),console.log("textEditorContent",e),a.setState(function(a){var n=a.taskList,s=n.find(function(e){return e.taskName===t}),r=n.map(function(t){return t.taskName}).indexOf(s.taskName);return a.taskList[r].textEditorContent=e,{tagInput:"",taskList:a.taskList}})},a.deleteHoursLog=function(t,e){a.setState(function(a){var n=a.taskList,s=n.filter(function(e){return e.taskName===t})[0].hoursLog.filter(function(t){return t.startTime!==e}),r=n.map(function(t){return t.taskName}).indexOf(t);return n[r].hoursLog=s,{taskList:n}})},a.addHoursLog=function(t){return function(e){var n=t.taskName,s=t.startTime,r=t.stopTime,o={taskName:n,tags:[],startTime:s,stopTime:r};a.state.taskList.find(function(t){return t.taskName===n})?a.setState(function(t){var e=t.taskList,a=e.find(function(t){return t.taskName===n}),s=e.map(function(t){return t.taskName}).indexOf(a.taskName),r=t.taskList[s].hoursLog;return r?r.push(o):t.taskList[s].hoursLog=[o],{hoursInput:"",taskList:t.taskList}}):a.createNewTask(n,o)}},a.handleAddHours=function(t){return function(e){e.preventDefault();var n=parseFloat(parseFloat(a.state.hoursInput.trim()).toFixed(2)),s=/^[+]?([0-9]+(?:[.][0-9]*)?|\.[0-9]+)$/.test(n);""!==n&&s?a.setState(function(e){var a=e.taskList,s=a.find(function(e){return e.taskName===t}),r=a.map(function(t){return t.taskName}).indexOf(s.taskName);e.taskList[r].hours+=n;var o={hours:n,updated:st.dateNow()},i=e.taskList[r].hoursLog;return i?i.push(o):e.taskList[r].hoursLog=[o],{hoursInput:"",taskList:e.taskList}}):alert("must input numbers only")}},a.handleDeleteTaskApp=function(t){a.setState(function(e){return{taskList:e.taskList.filter(function(e){return e.taskName!==t}),taskListIndex:0}})},a.handleToggleAll=function(){var t=a.state.taskList[a.state.taskListIndex].tasks,e=function(){var e=0;return t.forEach(function(t){t.active||e++}),e}();a.setState(function(a){var n=a.taskList,s=a.taskListIndex,r=a.taskList[s].tasks;return r.forEach(function(a){a.active=e===t.length}),n[s].tasks=r,{taskList:n}})},a.handleToggleTask=function(t){a.setState(function(e){var a=e.taskList,n=e.taskListIndex,s=e.taskList[e.taskListIndex].tasks.map(function(t){return t.id}).indexOf(t),r=a[n].tasks[s];return r.active=!r.active,{taskList:a}})},a.handleDeleteSubTask=function(t){a.setState(function(e){var a=e.taskList,n=[e.taskListIndex],s=e.taskList[e.taskListIndex].tasks;return a[n].tasks=s.filter(function(e){return e.text!==t}),{taskList:a}})},a.handleDeleteAllTasks=function(){a.setState(function(t){var e=t.taskList,a=[t.taskListIndex],n=t.taskList[t.taskListIndex].tasks;return e[a].tasks=n.filter(function(t){return!0===t.active}),{taskList:e}})},a.handleFocusTask=function(t){var e=t.target.closest("li").id;a.setState(function(t){return{focusedTask:t.taskList[a.state.taskListIndex].tasks.find(function(t){return t.id===e})}})},a.sidePanelFocus=function(t){var e=t.target.closest(".task-item").getAttribute("data-sidepanelid"),n=a.state.taskList.map(function(t){return t.taskName}).indexOf(e);a.setState(function(t){return{taskListIndex:-1===n?0:n,sidePanelFocus:t.taskList.find(function(t){return t.taskName===e})}})},a.filterByTaskName=function(t,e){return e?t.filter(function(t){return t.taskName===e}):t},a.runMoment=function(t){},a.state={toggleMainSection:!1,inputNewTask:"",inputTaskFilter:"",subTaskInput:"",addNoteInput:"",tagInput:"",hoursInput:"",focusedTask:{},sidePanelFocus:"",taskListIndex:0,textEditorContentTest:"testing testing",taskList:[]},a}return Object(d.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){var t=this;return s.a.createElement(lt.a,{className:"main-grid",fluid:!0},s.a.createElement(f,null),s.a.createElement(dt,{addHoursLog:this.addHoursLog,taskList:this.state.taskList,modifyHoursLog:this.modifyHoursLog,deleteHoursLog:this.deleteHoursLog,createChildHoursLogTag:this.createChildHoursLogTag,deleteHoursLogTag:this.deleteHoursLogTag,createParentHoursLogTag:this.createParentHoursLogTag,deleteParentHoursLogTag:this.deleteParentHoursLogTag}),this.state.toggleMainSection?s.a.createElement(ut.a,{className:"show-grid main-display"},s.a.createElement(ct.a,{xs:12,sm:3,md:3,className:"sidenav"},s.a.createElement(x,{sortFilter:this.sortTaskList}),s.a.createElement("div",{className:"side-panel"},s.a.createElement("form",{onSubmit:this.handleCreateNewTask},s.a.createElement("input",{onChange:this.updateNewTaskInput,id:"task-text",value:this.state.inputNewTask,placeholder:"create new task"}),s.a.createElement("input",{type:"submit",value:"submit"})),s.a.createElement("input",{onChange:this.updateInputTaskFilter,id:"task-filter",value:this.state.inputTaskFilter,placeholder:"filter by task name"}),s.a.createElement("h4",null,"Activities & Tasks"),this.filterByTaskName(this.state.taskList,this.state.inputTaskFilter).map(function(e,a){return s.a.createElement("div",{key:gt()},s.a.createElement(y,{className:t.state.taskListIndex===a?"side-panel-active":"",task:e,sidePanelFocus:t.sidePanelFocus,onHandleDeleteTask:function(){return t.handleDeleteTaskApp(e.taskName)}}))}))),s.a.createElement(ct.a,{xs:12,sm:9,md:9,className:"task-center"},"undefined"!==typeof this.state.taskList[0]?s.a.createElement(q,{taskInfo:""!==this.state.taskListIndex?this.state.taskList[this.state.taskListIndex]:this.state.taskList[0],appState:this.state,tasks:this.state.taskList[this.state.taskListIndex].tasks,updateTaskTitle:this.updateTaskTitle,textEditorContent:this.state.taskList[this.state.taskListIndex].textEditorContent,subTaskInput:this.state.subTaskInput,updateSubTaskInput:this.updateSubTaskInput,handleCreateSubTask:this.handleCreateSubTask,handleDeleteSubTask:this.handleDeleteSubTask,tagInput:this.state.tagInput,updateTagInput:this.updateTagInput,handleCreateNewTag:this.handleCreateNewTag,hoursInput:this.state.hoursInput,updateHoursInput:this.updateHoursInput,handleAddHours:this.handleAddHours,updateAddNoteInput:this.updateAddNoteInput,handleAddNote:this.handleAddNote,handleToggleAll:this.handleToggleAll,handleDeleteAllTasks:this.handleDeleteAllTasks,handleDeleteTaskApp:function(){return t.handleDeleteTaskApp(t.state.sidePanelFocus.taskName)},handleToggleTask:this.handleToggleTask,handleFocusTask:this.handleFocusTask,handleUpdateTextEditor:this.handleUpdateTextEditor,focusedTask:this.state.focusedTask,updateTaskInput:this.updateTaskInput,taskListIndex:this.state.taskListIndex}):s.a.createElement("h1",null,"Add a task and click on task in the left panel"))):null)}}]),e}(s.a.Component),ht=a(515),ft=a(517),Tt=function(t){function e(){return Object(i.a)(this,e),Object(u.a)(this,Object(c.a)(e).apply(this,arguments))}return Object(d.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){return s.a.createElement(ht.a,null,s.a.createElement("div",null,s.a.createElement(ft.a,{path:"/new-react-task-app/",component:kt})))}}]),e}(n.Component);o.a.render(s.a.createElement(Tt,null),document.getElementById("root"))}},[[209,2,1]]]);
//# sourceMappingURL=main.82c3c7da.chunk.js.map