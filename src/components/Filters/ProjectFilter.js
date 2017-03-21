import React, { Component } from 'react';
import ProjectStore from '../../stores/ProjectStore';
import ProjectActions from '../../actions/ProjectActions';
import TagStore from '../../stores/TagStore';
import TagActions from '../../actions/TagActions';
import moment from 'moment';
import renderDropDownList from '../bootstrap/DropDownList';
import Status from '../../constants/StatusConstants';
import { Panel, Col, Table, FormControl,Form,FormGroup,ControlLabel , Button } from 'react-bootstrap';

class ProjectFiltersComponent extends Component {


    constructor() {
        super();
        this.state = {
            search: {}
        }
        this.onChange = this.onChange.bind(this);
        this.handleSearch = this.onChange.bind(this);
    }

    componentWillMount() {
        ProjectStore.addChangeListener(this.onChange);
        TagStore.addChangeListener(this.onChange);
        TagActions.all();
    }

    componentWillUnmount() {
        ProjectStore.removeListener(this.onChange);
        TagStore.removeChangeListener(this.onChange);
    }

    onChange() {
        this.setState({
            tags: TagStore.getTags(),
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        ProjectActions.filter(this.state.search);
    }

    render() {
        var { search, tags } = this.state;
        var status = [''].concat(Status.status);
        tags = [''].concat(tags);
        var statusDropDownList = renderDropDownList(status, (status) => { return `${status}` }, (status, index) => { return status == search.status });
        var tagsDropDownList = renderDropDownList(tags, (tag) => { return `${tag}` }, (tag, index) => { return tag == search.tag });
        // {renderDropDownList(Status.status, (status) => { return `${status}` }, (status, index) => { return status == project.status })}
        return (
            <div>
                <Panel header="Filter">
                    <Form onSubmit={(e) => { this.handleSubmit(e); } } horizontal>

                        <FormGroup controlId="type">
                            <Col componentClass={ControlLabel} sm={2}>
                                Status :
                            </Col>
                            <Col sm={2}>
                                <FormControl componentClass="select" placeholder="status" onChange={(e) => { this.setState({ search: Object.assign({}, search, { status: status[e.target.value] }) }) } }>
                                    {statusDropDownList}
                                </FormControl>
                            </Col>
                            <Col componentClass={ControlLabel} sm={2}>
                                Tags :
                                </Col>
                            <Col sm={2}>
                            <FormControl componentClass="select" placeholder="status" onChange={(e) => { this.setState({ search: Object.assign({}, search, { tag: tags[e.target.value] }) }) } }>
                                    {tagsDropDownList}
                                </FormControl>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="date">
                            <Col componentClass={ControlLabel} sm={2}>
                                Date de début :
                            </Col>
                            <Col sm={2}>
                                <FormControl type="date" onChange={(e) => { this.setState({ search: Object.assign({}, search, { start_at: e.target.value }) }) } } />
                            </Col>
                            <Col componentClass={ControlLabel} sm={2}>
                                Date de fin :
                            </Col>
                            <Col sm={2}>
                                <FormControl type="date" onChange={(e) => { this.setState({ search: Object.assign({}, search, { end_at: e.target.value }) }) } } />
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <Button type="submit">
                                    Rechercher
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                    <Button onClick={() => ProjectActions.resetfilter()}>Reset</Button>
                </Panel>
            </div >
        );
    }
}

export default ProjectFiltersComponent;
