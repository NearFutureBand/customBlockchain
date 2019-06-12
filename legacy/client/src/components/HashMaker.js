import React, { Component } from 'react';
import { Form, Grid, TextArea, Button } from 'semantic-ui-react';
import { SHA256 } from 'crypto-js';

export default class HashMaker extends Component {
  constructor() {
    super();

    this.state = {
      value: ''
    }
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  render() {
    const { value } = this.state;

    return (
      <div className="hash-maker">
        <div className="textarea-wrapper">
          <textarea rows="4" label='Data' value={value} onChange={this.handleChange}/>
        </div>
        <div className="hash-wrapper">
          <div className="hash">{ SHA256(value).toString() }</div>
        </div>
      </div>
    )
  }
}