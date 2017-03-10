import React, { Component } from 'react';
import ProjectStore from '../../stores/ProjectStore';
import ProjectActions from '../../actions/ProjectActions';
import moment from 'moment';
import { Panel, Col, Table, Form, FormControl, FormGroup, ControlLabel, Checkbox, Button } from 'react-bootstrap';

class ProjectComponent extends Component {

    constructor() {
        super();
        this.state = {
            project: {},
        }
        this.onChange = this.onChange.bind(this);
        ProjectActions.all();
    }

    componentWillMount() {
        var id = this.props.params.id
        ProjectStore.addChangeListener(this.onChange);
        ProjectActions.first(id);
    }

    componentWillUnmount() {
        ProjectStore.removeListener(this.onChange);
    }

    onChange() {
        this.setState({
            project: ProjectStore.getProject()
        });
        console.log(this.state.project);
    }

    save(){
        console.log("prout");
    }

    handleFilterUserInputChange(e) {
        this.setState({ search: e.target.value });
    }

    handleFilterComboBoxChange(e) {
        this.setState({ filterType: e.target.value });
    }
    render() {
        var project = this.state.project;
        return (
            <div>
                {this.state.project.title != undefined ? (
                    <Panel header={`Project : ${this.state.project.title}`}>
                        <Form horizontal>
                            <FormGroup controlId="formTitle">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Title
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text" placeholder="Project title" value={project.title} onChange={(e) => {this.setState({project: Object.assign({}, project, {title: e.target.value})})}}/>
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formDeadline">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Deadline
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="date" value={project.deadline} />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formTags">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Tags
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text" placeholder="Password" />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formDescription">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Description
                                </Col>
                                <Col sm={10}>
                                    <FormControl componentClass="textarea" placeholder="textarea" />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Button onClick={this.save}>
                                        Sign in
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>

                    </Panel>
                ) : (
                        <div></div>
                    )}

            </div>
        );
    }
}

export default ProjectComponent;
