import React, { Component } from 'react';
import ProjectStore from '../../stores/ProjectStore';
import ProjectActions from '../../actions/ProjectActions';
import Stats from '../../utils/StatsManager';
import { Pie } from 'react-pathjs-chart';
import { FormControl } from 'react-bootstrap';

/**
 * Statistics component to show pie charts of the projects data on the right of the list.
 */
class Statistics extends Component {

  constructor() {
    super();
    this.state = {
      stat:'',
      data : [],
      option :{
        margin: {top: 15, left: 25, right: 15, bottom: 15},
        width: 400,
        height: 400,
        color: '#2980B9',
        r: 100,
        R: 200,
        legendPosition: 'topLeft',
        label:{
          fontFamily:'Arial',
          fontSize:14,
          fontWeight:true,
          color:'#ECF0F1'
        }
      }
    };

    // Bind functions
    this.onChange = this.onChange.bind(this);
    this.chargeData = this.chargeData.bind(this);
    this.chargeTags = this.chargeTags.bind(this);
    this.chargeStatus = this.chargeStatus.bind(this);
    this.chargeManager = this.chargeManager.bind(this);
  }

    componentWillMount() {
      // Charge all projects
      ProjectStore.addChangeListener(this.onChange);
      ProjectActions.all();
    }


    componentWillUnmount() {
      ProjectStore.removeListener(this.onChange);
    }

    onChange() {
      // Charge the chart if the projects list is changed by search or filters
      this.chargeData(this.state.stat);
    }

  /**
   * Charge the correct graph depending of the drop down list above
   * @param chartType
   */
  chargeData(chartType){
      this.setState({stat:chartType});

      switch (chartType) {
        case "tags":
          this.chargeTags();
          break;
        case "status":
          this.chargeStatus();
          break;
        case "Project manager":
          this.chargeManager();
          break;
        default:
          this.setState({data:[]});
      }
    }

  /**
   * Charge a chart with the project managers
   */
  chargeManager(){
      var chartData= [];
      Stats.projectManagerStats(ProjectStore.getProjects()).forEach(function(value, key, map){
        if (value != 0){chartData.push({name: key, number: value});}
      });
      this.setState({data:chartData});
    }

  /**
   * Charge a chart with the tags
   */
  chargeTags(){
      var chartData= [];
      Stats.tagsStats(ProjectStore.getProjects()).forEach(function(value, key, map){
        if (value != 0){chartData.push({name: key, number: value});}
      });
      this.setState({data:chartData});
    }

  /**
   * Charge a chart with the status
   */
  chargeStatus(){
      var chartData= [];
      Stats.statusStats(ProjectStore.getProjects()).forEach(function(value, key, map){
        if (value != 0){chartData.push({name: key, number: value});}
      });
      console.log(chartData);
      this.setState({data:chartData});
    }

  render() {
      return (
        <div>
          <FormControl componentClass="select" placeholder="Chose the user role" onChange={(e) => { this.chargeData(e.target.value)}}>
            <option value="">Pick your stat option</option>
            <option value="tags">Tags</option>
            <option value="status">Status</option>
            <option value="Project manager">Project manager</option>
          </FormControl>
          <Pie data={this.state.data} options={this.state.option} accessorKey="number" />
        </div>
      );
    }
}

export default Statistics;
