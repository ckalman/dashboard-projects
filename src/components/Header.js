import React, { Component } from 'react';
import { Nav, Navbar, NavItem, Header, Brand, FormControl, FormGroup, Button } from 'react-bootstrap';
import UserActions from '../actions/UserActions';

class HeaderComponent extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.state = {
      authenticated: false,
      username: '',
      password: ''
    }

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
  }

  login() {
    UserActions.auth(this.state.username, this.state.password);
    if (localStorage.getItem('token') != '') this.setState({authenticated: true});
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
                  <FormControl type="text" placeholder="Password..." onChange={this.changePassword} />
                  <Button onClick={this.login}>Login</Button></div>
              ) :
              <Button onClick={this.logout}>Logout</Button>
            }
          </Navbar.Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default HeaderComponent;
