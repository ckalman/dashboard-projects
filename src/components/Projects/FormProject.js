import React, { Component } from 'react';
import UserStore from '../../stores/UserStore';
import UserActions from '../../actions/UserActions';
import ProjectStore from '../../stores/ProjectStore';
import ProjectActions from '../../actions/ProjectActions';
import TagStore from '../../stores/TagStore';
import TagActions from '../../actions/TagActions';
import Status from '../../constants/StatusConstants';
import renderDropDownList from '../bootstrap/DropDownList';
import moment from 'moment';
import _ from 'lodash';
import CheckBoxModel from '../../models/Checkbox';
import { Panel, Col, Table, Form, FormControl, FormGroup, ControlLabel, Checkbox, Button } from 'react-bootstrap';

class FormProjectComponent extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor() {
        super();
        this.state = {
            project: {},
            tags: [],
            tagsCheckBox: [],
            edit: false,
        }
        this.tagsLoaded = false;
        this.onChange = this.onChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentWillMount() {
        this.setState({ edit: !this.props.edit });
        ProjectStore.addChangeListener(this.onChange);
        TagStore.addChangeListener(this.onChange);
        UserStore.addChangeListener(this.onChange);
        TagActions.all();
        UserActions.all();
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

        if (!this.tagsLoaded && TagStore.getTags().length > 0) {
            this.tagsLoaded = true;
            this.setState({tagsCheckBox: this.loadCheckbox(ProjectStore.getProject(), TagStore.getTags())});
        }
    }

    handleCheckBoxChange(index) {
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
        const { edit } = this.state
        return checkboxes.map((checkbox, index) =>
            <Col sm={3} key={index}>
                <label>
                    <input
                        type="checkbox"
                        checked={checkbox.isChecked()}
                        onChange={this.handleCheckBoxChange.bind(this, index)}
                        disabled={edit}
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



    render() {
        const { project, users, tags, tagsCheckBox, edit} = this.state;
        console.log(tagsCheckBox);
        return (
            <div>
                {project.title != undefined ? (
                    <Panel header={`Project : ${project.title}`}>
                        <Form onSubmit={(e) => { this.handleSubmit(e); } } horizontal>
                            <FormGroup controlId="formTitle">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Title
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text" placeholder="Project title" value={project.title} disabled={edit} onChange={(e) => { this.setState({ project: Object.assign({}, project, { title: e.target.value }) }) } } />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formTitle">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Status
                                </Col>
                                <Col sm={10}>
                                    <FormControl componentClass="select" placeholder="status" disabled={edit} onChange={(e) => { this.setState({ project: Object.assign({}, project, { status: Status.status[e.target.value] }) }) } }>
                                        {renderDropDownList(Status.status, (status) => { return `${status}` }, (status, index) => { return status == project.status })}
                                    </FormControl>
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formDeadline">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Deadline
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="date" value={moment(project.deadline).format('YYYY-MM-DD')} disabled={edit} onChange={(e) => { this.setState({ project: Object.assign({}, project, { deadline: e.target.value }) }) } } />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formControlsSelect">
                                <Col componentClass={ControlLabel} sm={2}>
                                    <ControlLabel>Project Manager</ControlLabel>
                                </Col>
                                <Col sm={10}>
                                    <FormControl componentClass="select" placeholder="select" disabled={edit} onChange={(e) => { this.setState({ project: Object.assign({}, project, { projectManager: users[e.target.value] }) }) } }>
                                        {renderDropDownList(users, (user) => { return `${user.firstname} ${user.lastname}` }, (user, index) => { return user.id == project.projectManager.id })}
                                    </FormControl>
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formTags">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Tags
                                </Col>

                                <Col sm={10} disabled={edit}>
                                    {this.renderCheckBoxes(tagsCheckBox)}
                                    <Col sm={12}>
                                        <Col sm={10}><FormControl type="text" placeholder="Tags" disabled={edit} onChange={(e) => { this.setState({ addTag: e.target.value }) } } /></Col>
                                        <Col sm={2}><Button disabled={edit} onClick={() => { this.addTag(); } }>+</Button></Col>
                                    </Col>
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formDescription">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Description
                                </Col>
                                <Col sm={10}>
                                    <FormControl componentClass="textarea" placeholder="textarea" disabled={edit} value={project.description} onChange={(e) => { this.setState({ project: Object.assign({}, project, { description: e.target.value }) }) } } />
                                </Col>
                            </FormGroup>
                            {!edit &&

                                <FormGroup>
                                    <Col smOffset={2} sm={10}>
                                        <Button type="submit" disabled={edit}>
                                            Save
                                    </Button>
                                        <Button onClick={this.handleDelete} disabled={edit}>
                                            Delete
                                    </Button>
                                    </Col>
                                </FormGroup>
                            }
                        </Form>
                    </Panel>
                ) : (
                        <div></div>
                    )}
            </div>
        );
    }
}

export default FormProjectComponent;
