import React from 'react'
import { Button, Popover, PopoverHeader, PopoverBody, Badge } from 'reactstrap'

export default class TagMenu extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      popoverOpen: false,
      tagInput: ''
    }
  }

  handleCreateNewHoursLogTag = (e) => {
    e.preventDefault()
    const tagValue = this.state.tagInput
    this.props.createNewHoursLogTag(this.props.taskName, tagValue, this.props.index)
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
            {this.props.hoursLog.tags !== undefined ?
              this.props.hoursLog.tags.map((tag,i) => {
                return (
                  <div key={'tag-badge-'+i}>
                    <Badge color='success'>{tag}</Badge>
                  </div>
                )
              }) :
              ''}
          </PopoverBody>
        </Popover>
      </div>


    )
  }

}
