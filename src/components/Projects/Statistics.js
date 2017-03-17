import React, { Component } from 'react';
import moment from 'moment'
import { Panel, Col, Table, FormControl, Button } from 'react-bootstrap';

class Statistics extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    constructor() {
        super();
        this.state = {
            context: 'title'
        }
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
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
