import React, { Component } from 'react';
import { Nav, Navbar, NavItem, Header, Brand, FormControl, Label, Button } from 'react-bootstrap';
import AuthActions from '../actions/AuthActions';
import AuthStore from '../stores/AuthStore';

class HeaderComponent extends Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.state = {
      user: AuthStore.getUser(),
      authenticated: AuthStore.isAuthenticated(),
      username: '',
      password: ''
    };


    this.onChange = this.onChange.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  changeUsername(e){
    this.setState({ username: e.target.value });
  }

  changePassword(e){
    this.setState({ password: e.target.value });
  }

  componentWillMount() {
    AuthStore.addChangeListener(this.onChange)
  }

  componentWillUnmount() {
    AuthStore.removeListener(this.onChange);
  }

  onChange() {
    this.setState({authenticated: AuthStore.isAuthenticated(), user: AuthStore.getUser()});
  }

  login() {
    AuthActions.authenticate(this.state.username, this.state.password);
  }

  logout() {
    AuthActions.deauthenticate();
    this.context.router.push('/');
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Projects dashboard</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Nav>
        </Nav>
        <Navbar.Collapse>
          <Navbar.Form pullLeft>
            <Nav>
              <NavItem eventKey={1} href="#">Home</NavItem>
            </Nav>
          </Navbar.Form>
          <Navbar.Form pullRight>
            {!this.state.authenticated ? (
                <div>
                  <FormControl type="text" placeholder="Username..." onChange={this.changeUsername} />
                  <FormControl type="password" placeholder="Password..." onChange={this.changePassword} />
                  <Button onClick={this.login}>Login</Button>
                </div>
              ) :
              <div>
                Welcome {this.state.user.username}&nbsp;
                <Button onClick={this.logout}>Logout</Button>
              </div>
            }
          </Navbar.Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default HeaderComponent;
