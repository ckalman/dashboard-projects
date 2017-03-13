import React, { Component } from 'react';
import ProjectStore from '../../stores/ProjectStore';
import ProjectActions from '../../actions/ProjectActions';
import TagStore from '../../stores/TagStore';
import TagActions from '../../actions/TagActions';
import moment from 'moment';
import CheckBoxModel from '../../models/Checkbox';
import { Panel, Col, Table, Form, FormControl, FormGroup, ControlLabel, Checkbox, Button } from 'react-bootstrap';

class ProjectComponent extends Component {

    constructor() {
        super();
        this.state = {
            project: {},
            tags: null,
            tagsCheckBox: [],
        }
        this.onChange = this.onChange.bind(this);
        ProjectActions.all();
        TagActions.all();
    }

    componentWillMount() {
        var id = this.props.params.id
        ProjectStore.addChangeListener(this.onChange);
        TagStore.addChangeListener(this.onChange);
        ProjectActions.first(id);
    }

    componentWillUnmount() {
        ProjectStore.removeListener(this.onChange);
        TagStore.removeListener(this.onChange);
    }

    onChange() {
        this.setState({
            project: ProjectStore.getProject(),
            tags: TagStore.getTags()
        });
        if (this.state.project.tags != null && this.state.tags != null) {
            this.setState({ tagsCheckBox: this.loadCheckbox(this.state.project, this.state.tags) })
        }
    }

    save() {
        console.log("prout");
    }

    handleFilterUserInputChange(e) {
        this.setState({ search: e.target.value });
    }

    handleFilterComboBoxChange(e) {
        this.setState({ filterType: e.target.value });
    }

    toggleCheckbox(index) {
        var checkbox = this.state.tagsCheckBox[index];
        this.state.tagsCheckBox[index].checked = !checkbox.isChecked()
        this.setState({
            tagsCheckBox: this.state.tagsCheckBox
        });
    }

    // TODO: refactor
    loadCheckbox(project, tags) {
        var temp = [];
        tags.map((tag) => {
            var checked = false;
            project.tags.forEach((t) => {
                if (t == tag) checked = true;
            });
            temp.push(new CheckBoxModel({
                name: tag,
                value: tag,
                checked: checked
            }));
        });
        return temp;
    }

    renderCheckBoxes() {
        return this.state.tagsCheckBox.map((checkbox, index) =>
            <div key={index}>
                <label>
                    <input
                        type="checkbox"
                        checked={checkbox.isChecked()}
                        onChange={this.toggleCheckbox.bind(this, index)}
                        />
                    {checkbox.name}
                </label>
            </div>
        );
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
                                    <FormControl type="text" placeholder="Project title" value={project.title} onChange={(e) => { this.setState({ project: Object.assign({}, project, { title: e.target.value }) }) } } />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formDeadline">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Deadline {moment(project.deadline).format('YYYY-MM-DD')} {project.deadline}
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="date" value={moment(project.deadline).format('YYYY-MM-DD')} onChange={(e) => { this.setState({ project: Object.assign({}, project, { deadline: e.target.value }) }) } } />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formTags">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Tags
                                </Col>
                                <Col sm={10}>
                                    {this.renderCheckBoxes()}
                                    <FormControl type="text" placeholder="Tags" />
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
