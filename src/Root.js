// Root.js

import React, { Component } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import Home from './components/Home';

import App from './components/App';

class Root extends Component {

  // We need to provide a list of routes
  // for our app, and in this case we are
  // doing so from a Root component
  render() {
    return (
      <Router history={this.props.history}>
        <Route path='/' component={App}>
          <IndexRoute component={Home}/>
          <Route path='/contact/:id' component={Home} />
          {/*<Route path='/contact/:id' component={ContactDetail} />*/}
        </Route>
      </Router>
    );
  }
}

export default Root;
