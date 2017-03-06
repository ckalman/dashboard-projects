import React, { Component } from 'react';
import { Nav, Navbar, NavItem, Header, Brand, FormControl, FormGroup } from 'react-bootstrap';
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
        </Navbar.Header>
        <Nav>
        </Nav>
      </Navbar>
    );
  }
}

export default HeaderComponent;
