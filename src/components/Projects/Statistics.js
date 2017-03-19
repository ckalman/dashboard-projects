import React, { Component } from 'react';
import ProjectStore from '../../stores/ProjectStore';
import ProjectActions from '../../actions/ProjectActions';
import TagActions from '../../actions/TagActions';
import Stats from '../../utils/StatsManager'

class Statistics extends Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.state = {
      tags:null
    }
    this.onChange = this.onChange.bind(this);
  }

    componentWillMount() {
      TagActions.all();
      ProjectActions.all();
      this.setState({tags : Stats.tagsStats(ProjectStore.getProjects())});
    }

    componentWillUnmount() {

    }

    onChange() {

    }


    render() {
      return (
        <div>
        </div>
      );
    }
}

export default Statistics;
