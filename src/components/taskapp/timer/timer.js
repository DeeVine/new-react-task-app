import React from 'react'
import moment from 'moment'
import TimerList from './timerList'
import util from '../util.js'
import './timer.css'
import { Container, Row, Col, Button } from 'reactstrap'

//LeftOff --> figuring out way to utilize callback/promise to createTaskTimeObject after stopTime setsState

//TODO:
// reset input and time state after stopTime function is complete
//start time, end time
  //timer for clock utilizing moment add 'moment().add(1, 'second')'
    //calculate difference from start time and current time in seconds
      //rerender clock

//save timer state to local localStorage
//measure time with set interval or calculate difference in start and end times
  //simulate timer
//make input field span majority of width
//add tag icon with dropwdown
//convert buttons to play and stop icons
// [ ] timer vs manual mode
//  [ ] calculate hours in manual mode from start and end time

export default class Timer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      workingOnInput: '',
      timeStarted: '',
      startTime: '',
      stopTime: '',
      currentTimer: moment().startOf("day"),
      timer: '',
    }
}

  componentDidMount = () => {
    const savedState = util.retrieveTasksFromLocalStorage('timer-data')
    if (savedState) {
      const timeStarted = savedState.timeStarted ? savedState.timeStarted : false
      const {  workingOnInput, startTime, stopTime, currentTimer } = savedState
      this.setState({
        timeStarted: timeStarted,
        workingOnInput,
        startTime,
        stopTime,
        //should set currentTimer to moment().startOf("day")Timer, 'second')
        currentTimer: currentTimer ? this.calculateCurrentTimer(moment(startTime)) : moment().startOf("day")
      }, () => {
        //callback set interval if timer has been started
        if(this.state.timeStarted) {
          this.interval = window.setInterval(() => {this.setTimer()}, 1000)
        }
      })
    }
  }

  componentDidUpdate = () => {
    util.updateLocalStorage('timer-data', this.state)
  }

  calculateCurrentTimer = (startTime) => {
    const differenceInMiliseconds = moment().valueOf()-startTime.valueOf()
    const timeInSeconds = differenceInMiliseconds / 1000
    const currentTimer = moment().startOf("day").add(timeInSeconds, 'second')
    return currentTimer
  }

  updateInput = (e) => {
    const text = e.target.value
    this.setState({
      workingOnInput: text
    })
  }

  toggleTimer = () => {
    this.setState(prevState => ({
      timeStarted: !prevState.timeStarted
    }));
  }

  setTimer = () => {
    this.setState(prevState => ({
      currentTimer: prevState.currentTimer.add(1, 'second'),
    }))
  }

  startTime = () => {
    if(!this.state.workingOnInput) {
      alert('please enter task you are currently working on')
    } else {
      this.toggleTimer()
      this.setState({
        startTime: moment()
      })
      this.interval = window.setInterval(() => {this.setTimer()}, 1000)
    }

  }

  stopTime = () => {
    this.toggleTimer()
    this.setState({
      stopTime: moment(),
    }, () => {
      this.props.addHoursLog(this.createTaskTimeObject())()
    })
    window.clearInterval(this.interval);
  }

  createTaskTimeObject = () => {
    const taskTimeObject = {
      taskName: this.state.workingOnInput,
      startTime: this.state.startTime,
      stopTime: this.state.stopTime,
    }
    this.setState({
      taskName: '',
      startTime: '',
      stopTime: '',
      currentTimer: moment().startOf("day")
    })
    return taskTimeObject
  }

  render () {
    return (
      <Container key='timer1' className='timer-grid' fluid={true}>
        <Row>
          <Col sm={12} className='timer-nav' >
            <input id='working-on-input' onChange={this.updateInput} value={this.state.workingOnInput} placeholder={'What are you working on?'}/>
            <span>{this.state.currentTimer.format('HH:mm:ss')}</span>
            {!this.state.timeStarted
              ? <Button onClick={this.startTime} color="success">Start</Button>
              : <Button onClick={this.stopTime} color="danger">Stop</Button>
            }
            {/* <Button onClick={this.props.addHoursLog(this.createTaskTimeObject())} color="info">AddHoursLog</Button> */}
          </Col>
          <Col sm={12} className='timer-time'>
            <TimerList
              taskList = {this.props.taskList}
              deleteHoursLog = {this.props.deleteHoursLog}
              createNewHoursLogTag = {this.props.createNewHoursLogTag}
              createParentHoursLogTag = {this.props.createParentHoursLogTag}
            />
          </Col>
        </Row>
      </Container>
    )
  }
}
