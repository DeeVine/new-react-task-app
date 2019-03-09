import React from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

export default class TimerTaskDropdown extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      dropdownOpen: false
    }
}

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  handleDeleteHoursLog = () => {
    this.props.deleteHoursLog(this.props.taskName, this.props.startTime)
    // if(window.confirm('please confirm you want to delete, deletion is irreversible')){
    //   console.log('you confirmed deletion')
    //   this.props.deleteHoursLog(this.props.taskName, this.props.startTime)
    // } else { console.log('you backed out just in time')}
  }

  render () {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} size='sm' toggle={this.toggle}>
        <DropdownToggle caret>
          Options
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem
            onClick={this.handleDeleteHoursLog}
          >Delete Time</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
  }

}
