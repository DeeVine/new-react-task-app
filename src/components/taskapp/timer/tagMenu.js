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

  componentDidMount = () => {
    console.log('componentDidMount')
    console.log('this.props', this.props)
    console.log('logs.tags.lengt', this.props.taskName, this.props.log.tags.length)
  }

  componentDidUpdate = () => {
    console.log('componentDidUpdate')
    console.log('this.props', this.props)
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
        <i className={(this.props.log.tags.length > 0 ? 'fas fa-tags tags-active' : 'fas fa-tag tags-inactive')}
          id={this.generatePopoverId()}
        />
        <Popover placement="bottom" isOpen={this.state.popoverOpen} target={this.generatePopoverId()} toggle={this.toggle}>
          <PopoverHeader>Tags</PopoverHeader>
          <PopoverBody>
            <form onSubmit={this.handleCreateNewHoursLogTag}>
              <input onChange={this.updateTagInput} placeholder='add/filter tags' value={this.state.tagInput} />
              <input type='submit' value='submit'/>
            </form>
            {typeof this.props.log.tags !== 'undefined' ?
              this.props.log.tags.map((tag) => {
                return (
                  <div key={'tag-badge-'+tag}>
                    <Badge color='success'>{tag}</Badge>
                  </div>
                )
              }) : null
            }
          </PopoverBody>
        </Popover>
      </div>


    )
  }

}
