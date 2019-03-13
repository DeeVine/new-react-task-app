import React from 'react'
import moment from 'moment'
import { Popover, PopoverHeader, PopoverBody, Badge } from 'reactstrap'
import PropTypes from 'prop-types'

export default class TagMenu extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      popoverOpen: false,
      tagInput: ''
    }
  }

  componentDidMount = () => {

  }

  componentDidUpdate = () => {

  }

  // handleCreateNewHoursLogTag = (e) => {
  //   e.preventDefault()
  //   const tagValue = this.state.tagInput
  //   this.props.createNewHoursLogTag(this.props.taskName, tagValue, this.props.index)
  //   this.setState({ tagInput: ''})
  // }
  handleCreate = (taskName, tagValue, index) => (e) => {
    e.preventDefault()
    this.props.createNewTag(taskName, tagValue, index)
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

  //requires taskName and startTime in miliseconds
  generatePopoverId = () => {
    const splitTaskName = this.props.taskName.split(' ')
    const joinTaskName = splitTaskName.join('-')
    const startTime = moment(this.props.startTime).valueOf()
    const popoverId =  "Popover-" + joinTaskName + '-' + startTime
    return popoverId
  }

  render () {
    return (
      <>
        <i className={(this.props.tags.length > 0 ? 'fas fa-tags tags-active mr-2' : 'fas fa-tag tags-inactive mr-2')}
          id={this.generatePopoverId()}
        />
        <Popover placement="bottom" isOpen={this.state.popoverOpen} target={this.generatePopoverId()} toggle={this.toggle}>
          <PopoverHeader>Tags</PopoverHeader>
          <PopoverBody>
            <form onSubmit={this.handleCreate(this.props.taskName, this.state.tagInput, this.props.index)}>
              <input onChange={this.updateTagInput} placeholder='add/filter tags' value={this.state.tagInput} />
              <input type='submit' value='submit'/>
            </form>
            {typeof this.props.tags !== 'undefined' ?
              this.props.tags.map((tag) => {
                return (
                  <div key={'tag-badge-'+tag}>
                    <Badge color='success'>{tag}</Badge>
                  </div>
                )
              }) : null
            }
          </PopoverBody>
        </Popover>
      </>
    )
  }

}

TagMenu.propTypes = {
  taskName: PropTypes.string,
  tags: PropTypes.array,
  startTime: PropTypes.object, //moment object
  index: PropTypes.number,
  createNewHoursLogTag: PropTypes.func //requires (taskName, tagValue, index)
}
