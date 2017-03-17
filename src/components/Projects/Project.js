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
            edit: false,
            project: {},
        }
        this.onChange = this.onChange.bind(this);
    }
    componentWillMount() {
        var id = this.props.params.id;
        ProjectStore.addChangeListener(this.onChange);
        ProjectActions.first(id);
        this.setState({edit: true});
    }

    onChange() {
        this.setState({
            project: ProjectStore.getProject(),
        });
    }


    render() {
        var { edit, project} = this.state;
        return (
            <div>
                {project.title != undefined ? (
                    <FormProject edit={edit} project={project} />
                ) : (
                        <div></div>
                    )}

            </div>
        );
    }
}

export default ProjectComponent;
