import React, { Component } from 'react';
import ProjectStore from '../../stores/ProjectStore';
import ProjectActions from '../../actions/ProjectActions';
import FormProject from '../Projects/FormProject';

class ProjectComponent extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor() {
        super();
        this.state = {
            create: false,
            project: {},
        }
        this.onChange = this.onChange.bind(this);
    }
    componentWillMount() {
        var id = this.props.params.id;
        
        ProjectStore.addChangeListener(this.onChange);     
        ProjectActions.first(id);
                
        if (!id) {
            this.setState({ create: true });
        }
    }

    onChange() {
        this.setState({
            project: ProjectStore.getProject(),
        });
    }


    render() {
        var { edit, project, create} = this.state;
        return (
            <div>
                <FormProject create={create} project={project} />
            </div>
        );
    }
}

export default ProjectComponent;
