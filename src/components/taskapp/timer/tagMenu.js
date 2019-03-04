import React from 'react'
import { Button, Popover, PopoverHeader, PopoverBody, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

export default class TagMenu extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      popoverOpen: false,
    }
}

  toggle = () => {
    this.setState(prevState => ({
      popoverOpen: !prevState.popoverOpen
    }));
  }

  checkStartTime = (startTime) => {
    console.log('startTime', startTime)
  }

  createNewTag = (e) => {
    e.preventDefault()
    console.log('this should create a new tag')
  }

  render () {
    return (

      <div>
        <Button id={"Popover"+this.props.taskName + '-' + this.props.index} type="button">
          Add Tag
        </Button>
        <Popover placement="bottom" isOpen={this.state.popoverOpen} target={"Popover"+this.props.taskName + '-' + this.props.index} toggle={this.toggle}>
          <PopoverHeader>Popover Title</PopoverHeader>
          <PopoverBody>
            <form onSubmit={this.createNewTag}>
              <input placeholder='add/filter tags' />
              <input type='submit' value='submit'/>
            </form>
          </PopoverBody>
        </Popover>
      </div>


    )
  }

}
