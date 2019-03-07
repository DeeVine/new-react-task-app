import React from 'react'
import util from '../util.js'
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap'

export default class TagMenu extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      popoverOpen: false,
      tagInput: ''
    }
  }

  // componentDidMount = () => {
  //   console.log('componentDidMount tagMenu')
  //   const savedState = util.retrieveTasksFromLocalStorage('tag-menu-'+this.props.taskName)
  //   if (savedState) {
  //     // console.log('savedState in tagMenu')
  //     const popoverOpen = savedState.popoverOpen ? true : false
  //     this.setState({
  //       popoverOpen,
  //       tagInput: savedState.tagInput
  //     })
  //   }
  // }
  //
  // componentDidUpdate = () => {
  //   console.log('componenetDidUpdate tagMenu')
  //   util.updateLocalStorage('tag-menu-'+this.props.taskName, this.state)
  // }

  handleCreateNewHoursLogTag = (e) => {
    e.preventDefault()
    const tagValue = this.state.tagInput
    // console.log('tagValue', tagValue)
    this.props.createNewHoursLogTag(this.props.taskName, tagValue)
    // console.log('beforeSetState in createNewHoursLogTag')
    this.setState({ tagInput: ''})
  }

  updateTagInput = (e) => {
    const value = e.target.value;
    this.setState({
      tagInput: value
    })
  }

  toggle = () => {
    this.setState(prevState => ({
      popoverOpen: !prevState.popoverOpen
    }));
  }

  checkStartTime = (startTime) => {
    console.log('startTime', startTime)
  }

  createNewHoursLogTag = (e) => {
    e.preventDefault()
    console.log('this should create a new tag')

  }

  generatePopoverId = (taskName, index) => {
    const splitTaskName = taskName.split(' ')
    const joinTaskName = splitTaskName.join('-')
    const popoverId =  "Popover-" + joinTaskName + '-' + index
    return popoverId
  }

  render () {
    return (
      <div>
        <Button id={this.generatePopoverId(this.props.taskName, this.props.index)} type="button">
          Add Tag
        </Button>
        <Popover placement="bottom" isOpen={this.state.popoverOpen} target={this.generatePopoverId(this.props.taskName, this.props.index)} toggle={this.toggle}>
          <PopoverHeader>Popover Title</PopoverHeader>
          <PopoverBody>
            <form onSubmit={this.handleCreateNewHoursLogTag}>
              <input onChange={this.updateTagInput} placeholder='add/filter tags' value={this.state.tagInput} />
              <input type='submit' value='submit'/>
            </form>
          </PopoverBody>
        </Popover>
      </div>


    )
  }

}
