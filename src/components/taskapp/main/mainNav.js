import React from 'react'
import PropTypes from 'prop-types'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';


export default class MainNav extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      dropdownOpen: false
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar color="faded" light expand='md'>
          <NavbarBrand href="/" className="mr-auto">TrackerApp</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav className='ml-auto' navbar>
              <NavItem>
                <Dropdown isOpen={this.state.dropdownOpen} size='sm' toggle={this.toggle}>
                  <DropdownToggle
                    // tag="span"
                    // onClick={this.toggle}
                    // data-toggle="dropdown"
                    // aria-expanded={this.state.dropdownOpen}
                    caret >
                    Dropdown
                  </DropdownToggle>
                  <DropdownMenu>
                    <div onClick={this.toggle}>Custom item</div>
                  </DropdownMenu>
                </Dropdown>
              </NavItem>
              <NavItem>
                <NavLink href="/">link1</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}
