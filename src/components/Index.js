import React, { Component } from 'react';

class IndexComponent extends Component {

  constructor() {
    super();
    this.state = {
      authenticated: false
    }
  }
  render() {
    return (
      <div>
        dashboard
      </div>
    );
  }
}

export default IndexComponent;
