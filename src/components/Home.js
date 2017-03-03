import React, { Component } from 'react';
import { Panel, Col, Table, FormControl, Button } from 'react-bootstrap';

class HomeComponent extends Component {

  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <Col xs={12} md={7}>
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
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td colSpan="2">Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>

          </Panel>
        </Col>
        <Col xs={12} md={5}>
          <Panel header="Stats">
          </Panel>
        </Col>
      </div>
    );
  }
}

export default HomeComponent;
