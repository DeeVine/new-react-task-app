import React from 'react'
import moment from 'moment'
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
const util = {
  dateNow: () => new Date().toISOString(),
  updateLocalStorage: (namespace, storedData) => {
    localStorage.setItem(namespace, JSON.stringify(storedData))
  },
  retrieveTasksFromLocalStorage: (namespace) => JSON.parse(localStorage.getItem(namespace))
}

export default class Timer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      workingOnInput: '',
      timeStarted: '',
      startTime: '',
      stopTime: '',
      currentTime: moment().startOf("day"),
      timer: '',
    }
}

  componentDidMount = () => {
    const savedState = util.retrieveTasksFromLocalStorage('timer-data')
    const timeStarted = savedState.timeStarted ? savedState.timeStarted : false
    const currentTime = savedState.currentTime
    this.setState({
      timeStarted: timeStarted,
      startTime: savedState.startTime,
      stopTime: savedState.stopTime,
      currentTime: currentTime ? moment(currentTime) : moment().startOf("day")
    }, () => {
      //callback after set set to set interval if timer has been started
      if(this.state.timeStarted) {
        this.interval = window.setInterval(() => {this.setTimer()}, 1000)
      }
    })
  }

  componentDidUpdate = () => {
    util.updateLocalStorage('timer-data', this.state)
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
      currentTime: prevState.currentTime.add(1, 'second'),
    }))
  }

  startTime = () => {
    this.toggleTimer()
    this.setState({
      startTime: moment()
    })
    this.interval = window.setInterval(() => {this.setTimer()}, 1000)
  }

  // combinedStopFunctions = () => {
  //   const that = this
  //   const stopTimePromise = () => {
  //     return new Promise(function(resolve, reject) {
  //       resolve(that.stopTime())
  //     })
  //   }
  //   stopTimePromise().then(function(result) {
  //     console.log('did we make it here?', result)
  //     console.log('this.state', that.state)
  //   })
  // }

  stopTime = () => {
    console.log('stopTime')
    this.toggleTimer()
    this.setState({
      // workingOnInput: '',
      stopTime: moment(),
      // currentTime: moment().startOf("day"),
    }, () => {
      console.log('callback after', this.createTaskTimeObject())
      return this.createTaskTimeObject()
    })
    window.clearInterval(this.interval);
  }

  createTaskTimeObject = () => {
    const taskTimeObject = {
      taskName: this.state.workingOnInput,
      startTime: this.state.startTime,
      stopTime: this.state.stopTime,
    }
    return taskTimeObject
  }

  render () {
    return (
      <Container className='timer-grid' fluid={true}>
        <Row>
          <Col sm={12} className='timer-nav' >
            <input id='working-on-input' onChange={this.updateInput} value={this.state.workingOnInput} placeholder={'What are you working on?'}/>
            <span>{this.state.currentTime.format('HH:mm:ss')}</span>
            {!this.state.timeStarted
              ? <Button onClick={this.startTime} color="success">Start</Button>
              : <Button onClick={this.stopTime} color="danger">Stop</Button>
            }
            <Button onClick={this.props.addHoursLog(this.createTaskTimeObject())} color="info">AddHoursLog</Button>
          </Col>
          <Col sm={12} className='timer-time'>
            Timed activities/tasks
          </Col>
        </Row>
      </Container>
    )
  }
}
