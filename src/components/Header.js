import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../actions'

import {
  Collapse,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledButtonDropdown,
  UncontrolledDropdown
} from 'reactstrap'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {
  faCertificate,
  faClosedCaptioning,
  faHistory,
  faList,
  faStepForward,
  faUser,
  faClock,
  faCalendarAlt
} from '@fortawesome/fontawesome-free-solid'

import SearchInput from './SearchInput'
import Options from './Options'

import './Header.css'

import icon from '../assets/ninja-blue.png'

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: false
    }
  }

  render () {
    const { collapsed } = this.state
    const { dispatch, Auth } = this.props
    return (
      <Navbar color='dark' expand='md' dark className='mb-4' sticky='top' style={
        // a little polyfill to make the top be under the navigation bar on ios etc.
        window.navigator.standalone
          ? {paddingTop: '15pt'}
          : {}
      }>
        <Container>
          <NavbarBrand tag={Link} to='/'>
            <img src={icon} alt='nani?!' className='navbar-image' />
            {' '}
            nani?!
          </NavbarBrand>
          <NavbarToggler onClick={() => this.setState({ collapsed: !collapsed })} />
          <Collapse isOpen={collapsed} navbar>
            <Nav className='mr-auto' navbar>
              <NavItem>
                <NavLink tag={Link} to='/queue'>
                  <FontAwesomeIcon icon={faList} className='responsive-hidden' />
                  {' '}
                  Queue
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to='/history'>
                  <FontAwesomeIcon icon={faHistory} className='responsive-hidden' />
                  {' '}
                  History
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to='/recent'>
                  <FontAwesomeIcon icon={faClock} className='responsive-hidden' />
                  {' '}
                  Recent
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  <FontAwesomeIcon icon={faStepForward} className='responsive-hidden' />
                  {' '}
                  Series List
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem tag={Link} to='/list/simulcast'>
                    <FontAwesomeIcon icon={faClosedCaptioning} />
                    {' '}
                    Simulcasts
                  </DropdownItem>
                  <DropdownItem tag={Link} to='/list/popular'>
                    <FontAwesomeIcon icon={faCertificate} />
                    {' '}
                    Popular Anime
                  </DropdownItem>
                  <DropdownItem tag={Link} to='/list/newest'>
                    <FontAwesomeIcon icon={faCalendarAlt} />
                    {' '}
                    Newest Anime
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <Nav className='ml-auto' navbar>
              <NavItem className='dropdown'>
                <SearchInput />
              </NavItem>
              <UncontrolledButtonDropdown inNavbar>
                <DropdownToggle caret className='ml-md-2 mr-md-2 w-100'>
                  <FontAwesomeIcon icon={faUser} />
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem header>{Auth.username}</DropdownItem>
                  <DropdownItem onClick={() => dispatch(logout())}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
              <NavItem>
                <Options />
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    )
  }
}

export default connect((store) => {
  return {
    Auth: store.Auth
  }
})(Header)
