import React from 'react'
import PropTypes from 'prop-types'
import './tagRatings.css'
import {
  Badge,
  Dropdown,
  DropdownToggle,
  DropdownMenu
} from 'reactstrap';


export default class TagRatings extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      dropdownOpen: false,
      number: '',
    }
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  clickable = (e) => {
    console.log('e.target.value', e.target.value)
    const number = e.target.value
    this.setState({
      number,
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  render() {
    return (
      <div>
        <Dropdown  isOpen={this.state.dropdownOpen} size='sm' toggle={this.toggle}>
          <DropdownToggle
            tag="span"
            onClick={this.toggle}
            data-toggle="dropdown"
            aria-expanded={this.state.dropdownOpen}
          >
            <Badge color='success'>{this.props.dropdownName}</Badge>
          </DropdownToggle>
          <DropdownMenu>
            <ul className='tag-ratings-dropdown'>
              <li onClick={this.clickable} value={1}>1</li>
              <li onClick={this.clickable} value={2}>2</li>
              <li onClick={this.clickable} value={3}>3</li>
              <li onClick={this.clickable} value={4}>4</li>
              <li onClick={this.clickable} value={5}>5</li>
            </ul>
          </DropdownMenu>
        </Dropdown>
      </div>
    )
  }
}

TagRatings.propTypes = {
  dropdownName: PropTypes.string,
}
