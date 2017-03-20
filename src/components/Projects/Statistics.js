import React, { Component } from 'react';
import ProjectStore from '../../stores/ProjectStore';
import ProjectActions from '../../actions/ProjectActions';
import TagActions from '../../actions/TagActions';
import TagStore from '../../stores/TagStore';
import Stats from '../../utils/StatsManager';
import {Pie,Bar, SmoothLine,StockLine,Scatterplot,Tree,Radar} from 'react-pathjs-chart';
import { FormControl } from 'react-bootstrap';

class Statistics extends Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

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

    this.onChange = this.onChange.bind(this);
    this.chargeData = this.chargeData.bind(this);
    this.chargeTags = this.chargeTags.bind(this);
    this.chargeStatus = this.chargeStatus.bind(this);
  }

    componentWillMount() {
      ProjectStore.addChangeListener(this.onChange);
      TagStore.addChangeListener(this.onChange);

      TagActions.all();
      ProjectActions.all();
    }


    componentWillUnmount() {
      ProjectStore.removeListener(this.onChange);
      TagStore.removeListener(this.onChange);
    }

    onChange() {
    }

    chargeData(e){
      if (e == "tags"){
        this.chargeTags()
      } else if (e == "status") {
        this.chargeStatus()
      } else {
        this.setState({data:[]});
      }
    }


    chargeTags(){
      var chartData= [];
      Stats.tagsStats(ProjectStore.getProjects()).forEach(function(value, key, map){
        if (value != 0){chartData.push({name: key, number: value});}
      });
      this.setState({data:chartData});
    }

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
          </FormControl>
          <Pie data={this.state.data} options={this.state.option} accessorKey="number" />
        </div>
      );
    }
}

export default Statistics;
