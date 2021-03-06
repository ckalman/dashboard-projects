import React, { Component } from 'react';
import { Panel, Col, Table, FormControl, Button } from 'react-bootstrap';
import ProjectsTables from './Projects/ProjectsTables';
import Statistics from './Projects/Statistics';
import ProjectFilter from './Filters/ProjectFilter';

/**
 * Home page component to show the projects list, its filters and its stats
 */
class HomeComponent extends Component {

  constructor() {
    super();
  }
  render() {
    return (
      <div>
      <Col xs={12} md={12}>
        <ProjectFilter />
      </Col>
        <Col xs={12} md={7}>
          <ProjectsTables />
        </Col>
        <Col xs={12} md={5}>
          <Panel header="Stats">
            <Statistics />
          </Panel>
        </Col>
      </div>
    );
  }
}

export default HomeComponent;
