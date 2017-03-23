import React, { Component } from 'react';
import { Panel, Col, Form, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import UserActions from '../../actions/UserActions'
import ProjectActions from '../../actions/ProjectActions'


class AdminComponent extends Component {

  constructor() {
    super();
    this.state = {
      user:{},
      firstname:'',
      lastname:'',
      username:'',
      email:'',
      password:'',
      role:'',
      confirmPassword:''
    }
    this.onChange = this.onChange.bind(this);
    this.passwordValidation = this.passwordValidation.bind(this);
    this.createUser = this.createUser.bind(this);
    this.deleteAllProjects = this.deleteAllProjects.bind(this);
  }


   componentWillMount() {

  }


  componentWillUnmount() {

  }

  onChange() {

  }

  /**
   * Delete all projects of the database after a confirmation of the admin
   */
  deleteAllProjects() {
    if(confirm("Are you sure you want to delete all project ?")){
      ProjectActions.remove_all();
    }
  }

  /**
   * Create the user if there is no error
   */
  createUser() {
    if (this.passwordValidation() == 'error'){
      alert('Please correct the form')
    } else {
      UserActions.create(this.state.user);
    }
  }

  /**
   * Validation to check if the password matches the confirmed password
   * @returns {*}
   */
  passwordValidation(){
    if (this.state.user.password == this.state.confirmPassword) return 'success';
    else return 'error';
  }

  render() {
    var user = this.state.user;
    return (
      <div>
        <Panel header="Create a new user">
          <Form horizontal>
            <FormGroup controlId="name">
              <Col componentClass={ControlLabel} sm={2}>
                First name :
              </Col>
              <Col sm={2}>
                <FormControl type="text" onChange={(e) => {this.setState({user: Object.assign({}, user, {firstname: e.target.value})})}}/>
              </Col>
              <Col componentClass={ControlLabel} sm={2}>
                Last name :
              </Col>
              <Col sm={2}>
                <FormControl type="text" onChange={(e) => {this.setState({user: Object.assign({}, user, {lastname: e.target.value})})}} />
              </Col>
            </FormGroup>

            <FormGroup controlId="userInfo">
              <Col componentClass={ControlLabel} sm={2}>
                Username :
              </Col>
              <Col sm={2}>
                <FormControl type="text" onChange={(e) => {this.setState({user: Object.assign({}, user, {username: e.target.value})})}} />
              </Col>
              <Col componentClass={ControlLabel} sm={2}>
                Email :
              </Col>
              <Col sm={2}>
                <FormControl type="text" onChange={(e) => {this.setState({user: Object.assign({}, user, {email: e.target.value})})}} />
              </Col>
            </FormGroup>

            <FormGroup controlId="password" validationState={this.passwordValidation()}>
              <Col componentClass={ControlLabel} sm={2}>
                Password :
              </Col>
              <Col sm={2}>
                <FormControl type="password" onChange={(e) => {this.setState({user: Object.assign({}, user, {password: e.target.value})})}} />
              </Col>
              <Col componentClass={ControlLabel} sm={2}>
                Confirm password :
              </Col>
              <Col sm={2}>
                <FormControl type="password" onChange={(e) => {this.setState({confirmPassword: e.target.value})}} />
              </Col>
            </FormGroup>

            <FormGroup controlId="role">
              <Col componentClass={ControlLabel} sm={2}>
                Role :
              </Col>
              <Col sm={2}>
                <FormControl componentClass="select" placeholder="Chose the user role" onChange={(e) => {this.setState({user: Object.assign({}, user, {role: e.target.value})})}}>
                  <option value="select">Project Manager</option>
                  <option value="other">Administrator</option>
                </FormControl>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button onClick={this.createUser}>
                  Create
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Panel>

        <Panel header="Admin utils">
          <Button onClick={this.deleteAllProjects}>
            Delete all projects
          </Button>
        </Panel>
      </div>
    );
  }
}

export default AdminComponent;
