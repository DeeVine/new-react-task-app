import React from 'react'
import moment from 'moment'
import { Popover, PopoverHeader, PopoverBody, Badge } from 'reactstrap'

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

  generatePopoverId = () => {
    const splitTaskName = this.props.taskName.split(' ')
    const joinTaskName = splitTaskName.join('-')
    const startTime = moment(this.props.log.startTime).valueOf()
    const popoverId =  "Popover-" + joinTaskName + '-' + startTime
    return popoverId
  }

  render () {
    return (
      <div>
        {/* <Button id={this.generatePopoverId(this.props.taskName, this.props.index)} type="button" size='sm'>
          Add Tag
        </Button> */}
        <i className="fas fa-tag" style={{color: '#009823'}} id={this.generatePopoverId()} ></i>
        <Popover placement="bottom" isOpen={this.state.popoverOpen} target={this.generatePopoverId()} toggle={this.toggle}>
          <PopoverHeader>Popover Title</PopoverHeader>
          <PopoverBody>
            <form onSubmit={this.handleCreateNewHoursLogTag}>
              <input onChange={this.updateTagInput} placeholder='add/filter tags' value={this.state.tagInput} />
              <input type='submit' value='submit'/>
            </form>
            {this.props.log.tags !== undefined ?
              this.props.log.tags.map((tag) => {
                return (
                  <div key={'tag-badge-'+tag}>
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
