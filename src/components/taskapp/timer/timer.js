import React from 'react'
import moment from 'moment'
import { Container, Row, Col, Button } from 'reactstrap'

//TODO:

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
//timer vs manual mode

export default class Timer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      workingOnInput: '',
      timeStarted: false,
      currentTime: moment().startOf("day"),
      timer: '',
    }
}

  updateInput = (e) => {
    const text = e.target.value
    this.setState({
      workingOnInput: text
    })
  }

  startTime = () => {
    this.toggleTimer()
    const setTimer = () => {
      this.setState(prevState => ({
        currentTime: prevState.currentTime.add(1, 'second'),
      }))
    }
    this.interval = window.setInterval(() => {setTimer()}, 1000)
  }

  stopTime = () => {
    this.toggleTimer()
    window.clearInterval(this.interval);
  }

  toggleTimer = () => {
    this.setState(prevState => ({
      timeStarted: !prevState.timeStarted
    }));
  }

  render () {
    return (
      <Container className='timer-grid' fluid={true}>
        <Row>
          <Col className='timer-nav' sm={12}>
            <input onChange={this.updateInput} value={this.state.workingOnInput} placeholder={'What are you working on?'}/>
            <span>{this.state.currentTime.format('HH:mm:ss')}</span>
            {!this.state.timeStarted
              ? <Button onClick={this.startTime} color="success">Start</Button>
              : <Button onClick={this.stopTime} color="danger">Stop</Button>
            }
          </Col>
          <Col className='timer-time'>
            Timer Section
          </Col>
          <Col className='timer-time'>
            Timed activities/tasks
          </Col>
        </Row>
      </Container>
    )
  }
}
