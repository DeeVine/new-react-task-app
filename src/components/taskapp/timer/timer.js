import React from 'react'
import { Container, Row, Col, Button } from 'reactstrap'

//TODO:
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
      timeStarted: true,
      timer: ''
    }
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

  render () {
    return (
      <Container className='timer-grid' fluid={true}>
        <Row>
          <Col className='timer-nav' sm={12}>
            <input onChange={this.updateInput} value={this.state.workingOnInput} placeholder={'What are you working on?'}/>
            {this.state.timeStarted
              ? <Button onClick={this.toggleTimer} color="primary">Start</Button>
              : <Button onClick={this.toggleTimer} color="success">Finish</Button>
            }
            {/* <Button onClick={this.toggleTimer} color="primary">Start</Button>
            <Button onClick={this.toggleTimer} color="success">Finish</Button> */}
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
