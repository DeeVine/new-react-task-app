import React from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';


export default class MainNav extends React.Component {
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
    const number = e.target.value
    this.setState({
      number
    })
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
                    <ul>
                      <li onClick={this.clickable} value={1}>1</li>
                      <li onClick={this.clickable} value={2}>2</li>
                      <li onClick={this.clickable} value={3}>3</li>
                      <li onClick={this.clickable} value={4}>4</li>
                      <li onClick={this.clickable} value={5}>5</li>
                    </ul>
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
