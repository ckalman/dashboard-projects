import React, { Component } from 'react';
import ProjectStore from '../../stores/ProjectStore';
import ProjectActions from '../../actions/ProjectActions';
import { Panel, Col, Table, FormControl, Button } from 'react-bootstrap';

class ProjectsComponent extends Component {

    constructor() {
        super();
        this.state = {
            projects: []
        }
        this.onChange = this.onChange.bind(this);
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

    render() {
        return (
            <div>
                <Panel header="Projects">
                    <div className="projects-filters">
                        <span>Filters</span>
                        <FormControl type="text" placeholder="Search" />
                        <FormControl componentClass="select" placeholder="select">
                            <option value="select">select</option>
                            <option value="other">...</option>
                        </FormControl>
                        <Button type="submit">
                            Search
                        </Button>
                    </div>

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
                                    <tr key={index}>
                                        <td>{project.title}</td>
                                        <td>{project.projectManager.firstname} {project.projectManager.lastname}</td>
                                        <td>{project.deadline}</td>
                                        <td>{project.status}</td>
                                    </tr>
                                );
                            }.bind(this))}
                        </tbody>
                    </Table>

                </Panel>
            </div>
        );
    }
}

export default ProjectsComponent;
