import React from 'react'
import moment from 'moment'
import { UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap'
import PropTypes from 'prop-types'
import TagRatings from './tagRatings/tagRatings'

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

  handleCreate = (taskName, tagValue, index) => (e) => {
    e.preventDefault()
    if (tagValue !== '') {
      this.props.createNewTag(taskName, tagValue, index)
      this.setState({ tagInput: ''})
    } else {
      alert('please input a tag')
    }
  }

  handleDelete = (taskName, tagValue, index) => (e) => {
    e.preventDefault()
    this.props.deleteHoursLogTag(taskName, tagValue, index)
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
        <UncontrolledPopover trigger="legacy" placement="left" target={this.generatePopoverId()}>
          <PopoverHeader>Tags</PopoverHeader>
          <PopoverBody className='tags-popover-body'>
            <form onSubmit={this.handleCreate(this.props.taskName, this.state.tagInput, this.props.index)}>
              <input onChange={this.updateTagInput} placeholder='add/filter tags' value={this.state.tagInput} />
              <input type='submit' value='submit'/>
            </form>
            {typeof this.props.tags !== 'undefined' ?
              this.props.tags.map((tag) => {
                return (
                  <div className='tag-menu-badge' key={'tag-badge-'+tag}>
                    <TagRatings
                      dropdownName={tag}
                    />
                    {/* <Badge color='success'>{tag}</Badge> */}
                    <i className="fas fa-times ml-1"
                      onClick={this.handleDelete(this.props.taskName, tag, this.props.index)}
                    />
                  </div>
                )
              }) : null
            }
          </PopoverBody>
        </UncontrolledPopover>
      </>
    )
  }
}

TagMenu.propTypes = {
  taskName: PropTypes.string,
  tags: PropTypes.array,
  startTime: PropTypes.object, //moment object
  index: PropTypes.number,
  createNewTag: PropTypes.func //requires (taskName, tagValue, index)
}
