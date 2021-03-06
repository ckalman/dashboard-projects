import React, { Component } from 'react';
import ProjectStore from '../../stores/ProjectStore';
import ProjectActions from '../../actions/ProjectActions';
import moment from 'moment'
import { Panel, Col, Table, FormControl, Button } from 'react-bootstrap';

/**
 * Display a list of projects
 *
 * @class ProjectsComponent
 * @extends {Component}
 */
class ProjectsComponent extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    constructor() {
        super();
        this.state = {
            projects: [],
            search: '',
            filterType: 'title'
        }
        this.onChange = this.onChange.bind(this);
        this.handleFilterUserInputChange = this.handleFilterUserInputChange.bind(this);
        this.handleFilterComboBoxChange = this.handleFilterComboBoxChange.bind(this);
        ProjectActions.all();
    }

    componentWillMount() {
        ProjectStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        ProjectStore.removeListener(this.onChange);
    }

    onChange() {
        this.setState({
            projects: ProjectStore.getProjects()
        });
    }

    handleFilterUserInputChange(e) {
        this.setState({ search: e.target.value });
    }

    handleFilterComboBoxChange(e) {
        this.setState({ filterType: e.target.value });
    }

    /**
     * Action when the user click on search
     *
     *
     * @memberOf ProjectsComponent
     */
    handleClickSearch() {
        if (this.state.filterType != '') {
            ProjectActions.search(this.state.filterType, this.state.search);
        } else {
            ProjectActions.all();
        }
    }

    render() {
        const { projects } = this.state;

        var projectsTable = (
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Project manager</th>
                        <th>Deadline</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.projects.map(function (project, index) {
                        return (
                            <tr key={index} onClick={() => { window.location = "/project/" + project.id } }>
                                <td>{project.title}</td>
                                <td>{project.projectManager.firstname} {project.projectManager.lastname}</td>
                                <td>{moment(project.deadline).format('DD-MM-YYYY')}</td>
                                <td>{project.status}</td>
                            </tr>
                        );
                    }.bind(this))}
                </tbody>
            </Table>
        );

        var noProject = (
            <p className="no-project">No project to display</p>
        )

        return (
            <div>
                <Panel header={`Projects - ${projects.length}`}>
                    <div className="projects-filters">
                        <span>Filters</span>
                        <FormControl type="text" placeholder="Search" onChange={this.handleFilterUserInputChange} />
                        <FormControl componentClass="select" placeholder="select" onChange={this.handleFilterComboBoxChange}>
                            <option value="title">title</option>
                            <option value="description">description</option>
                            <option value="tags">tags</option>
                        </FormControl>
                        <Button onClick={() => this.handleClickSearch()}>
                            Search
                        </Button>
                    </div>

                    {projects.length > 0 ? projectsTable : noProject}

                    <Col sd={2} md={12} className="center">
                        <Button onClick={() => { window.location = '/project/create' } } >
                            Create new project
                        </Button>
                    </Col>
                </Panel>
            </div>
        );
    }
}

export default ProjectsComponent;
