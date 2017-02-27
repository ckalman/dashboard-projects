import React, { Component } from 'react';
import { Nav, Navbar, NavItem, Header, Brand } from 'react-bootstrap';

class HeaderComponent extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.state = {
      authenticated: false
    }
  }

  componentWillMount() {
  }

  login() {
  }

  logout() {
    this.setState({ authenticated: false });
    this.context.router.push('/');
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Projects dashboard</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          {!this.state.authenticated ? (
            <NavItem onClick={this.login}>Login</NavItem>
          ) : (
              <NavItem onClick={this.logout}>Logout</NavItem>
            )}
        </Nav>
      </Navbar>
    );
  }
}

export default HeaderComponent;
