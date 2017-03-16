import React, { Component } from 'react';
import UserStore from '../../stores/UserStore';
import UserActions from '../../actions/UserActions';
import ProjectStore from '../../stores/ProjectStore';
import ProjectActions from '../../actions/ProjectActions';
import TagStore from '../../stores/TagStore';
import TagActions from '../../actions/TagActions';
import moment from 'moment';
import _ from 'lodash';
import CheckBoxModel from '../../models/Checkbox';
import { Panel, Col, Table, Form, FormControl, FormGroup, ControlLabel, Checkbox, Button } from 'react-bootstrap';

class ProjectComponent extends Component {

    static contextTypes = {
      router: React.PropTypes.object.isRequired
    };

    constructor() {
        super();
        this.tagsLoaded = false;
        this.state = {
            project: {},
            tags: [],
            tagsCheckBox: [],
        }
        this.onChange = this.onChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        TagActions.all();
        UserActions.all();
    }

    componentWillMount() {
        var id = this.props.params.id;
        ProjectActions.first(id);
        ProjectStore.addChangeListener(this.onChange);
        TagStore.addChangeListener(this.onChange);
        UserStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        ProjectStore.removeListener(this.onChange);
        TagStore.removeListener(this.onChange);
        UserStore.removeListener(this.onChange);
    }

    onChange() {
        this.setState({
            project: ProjectStore.getProject(),
            users: UserStore.getUsers(),
            tags: TagStore.getTags(),
        });

        var project = ProjectStore.getProject();
        var tags = TagStore.getTags();
        if (project.title != undefined && tags != null && !this.tagsLoaded) {
            this.tagsLoaded = true;
            var checkBox = this.loadCheckbox(project, tags);
            this.setState({ tagsCheckBox: checkBox });
        }
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
        var all = _.union(project, tags);
        all.map((tag) => {
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
        return _.sortBy(temp, 'value');
    }

    addTag() {
        var tag = this.state.addTag;
        var tagCheckBox = new CheckBoxModel({
            name: tag,
            value: tag,
            checked: true,
        });
        this.state.tagsCheckBox.push(tagCheckBox);
        this.setState({ tagsCheckBox: _.uniqBy(this.state.tagsCheckBox, 'value') });
    }

    renderCheckBoxes(checkboxes) {
        return checkboxes.map((checkbox, index) =>
            <Col sm={3} key={index}>
                <label>
                    <input
                        type="checkbox"
                        checked={checkbox.isChecked()}
                        onChange={this.toggleCheckbox.bind(this, index)}
                    />
                    {checkbox.name}
                </label>
            </Col>
        );
    }

    handleSubmit(e) {
        e.preventDefault();
        this.state.project.tags = this.getTagsFromCheckBox(this.state.tagsCheckBox);
        ProjectActions.update(this.state.project);
    }

    handleDelete() {
        ProjectActions.remove(this.state.project.id);
        window.location = '/';
    }

    getTagsFromCheckBox(checkbox) {
        var temp = [];
        checkbox.forEach((c) => {
            if (c.isChecked()) {
                temp.push(c.name);
            }
        });
        return temp;
    }

    renderDropDownList() {
        return this.state.users.map((user, index) =>
            <option key={index} selected={user.id == this.state.project.projectManager.id} value={index}>{user.firstname} {user.lastname}</option>
        );
    }

    render() {
        var project = this.state.project;
        return (
            <div>
                {this.state.project.title != undefined ? (
                    <Panel header={`Project : ${this.state.project.title}`}>
                        <Form onSubmit={(e) => { this.handleSubmit(e); }} horizontal>
                            <FormGroup controlId="formTitle">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Title
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text" placeholder="Project title" value={project.title} onChange={(e) => { this.setState({ project: Object.assign({}, project, { title: e.target.value }) }) }} />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formDeadline">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Deadline
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="date" value={moment(project.deadline).format('YYYY-MM-DD')} onChange={(e) => { this.setState({ project: Object.assign({}, project, { deadline: e.target.value }) }) }} />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formControlsSelect">
                                <Col componentClass={ControlLabel} sm={2}>
                                    <ControlLabel>Project Manager</ControlLabel>
                                </Col>
                                <Col sm={10}>
                                    <FormControl componentClass="select" placeholder="select" onChange={(e) => { this.setState({ project: Object.assign({}, project, { projectManager: this.state.users[e.target.value] }) }) }}>
                                        {this.renderDropDownList()}
                                    </FormControl>
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formTags">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Tags
                                </Col>

                                <Col sm={10}>
                                    {this.renderCheckBoxes(this.state.tagsCheckBox)}
                                    <Col sm={12}>
                                        <Col sm={10}><FormControl type="text" placeholder="Tags" onChange={(e) => { this.setState({ addTag: e.target.value }) }} /></Col>
                                        <Col sm={2}><Button onClick={() => { this.addTag(); }}>+</Button></Col>
                                    </Col>
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formDescription">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Description
                                </Col>
                                <Col sm={10}>
                                    <FormControl componentClass="textarea" placeholder="textarea" value={project.description} onChange={(e) => { this.setState({ project: Object.assign({}, project, { description: e.target.value }) }) }} />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Button type="submit">
                                        Save
                                    </Button>
                                    <Button onClick={this.handleDelete}>
                                        Delete
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
